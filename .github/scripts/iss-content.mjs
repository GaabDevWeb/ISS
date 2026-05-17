/**
 * Publicação VTT → content/ + lessons.json + search-index.json (GHA).
 */
import { readFile, writeFile, mkdir, stat, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const VTT_LESSON_RE = /Aula_(\d+)_-_(\d{8})/i;
const HINT_JSON_RE = /<!--\s*LESSONS_JSON_HINT\s*\n(\{[\s\S]*?\})\s*\n-->/i;
const HINT_YAML_RE = /<!--\s*lessons\.json[^>]*\n([\s\S]*?)-->/i;
const PIPELINE_HEADER_RE =
  /^<!--\s*gerado automaticamente[\s\S]*?(?:<!--.*?-->\n)*\n*/i;
const CONCEPT_EXTRACTION_RE = /<!--\s*CONCEPT_EXTRACTION\s*\n([\s\S]*?)-->/i;
const HTML_TAG_RE = /<[^>]+>/g;

export async function loadVttContentConfig(root) {
  const raw = await readFile(join(root, "config/vtt-to-content.json"), "utf8");
  return JSON.parse(raw);
}

export function lessonsPath(root, config) {
  return join(root, config.lessons_path ?? "content/lessons.json");
}

export function searchIndexPath(root, config) {
  return join(root, config.search_index_path ?? "content/search-index.json");
}

export async function loadDisciplines(root) {
  const raw = await readFile(join(root, "content/disciplines.json"), "utf8");
  return JSON.parse(raw);
}

export function disciplineDisplayTitle(disciplines, slug) {
  const row = disciplines.find((d) => d.slug === slug);
  return row?.title ?? slug;
}

export function mapDownloadsFolder(folderName, config) {
  const entry = config.disciplines?.[folderName];
  if (!entry?.discipline) return null;
  return {
    discipline: entry.discipline,
    contentDir: entry.content_dir ?? entry.discipline,
  };
}

export function parseVttLesson(vttPath) {
  const base = vttPath.split(/[/\\]/).pop() ?? "";
  const m = base.match(VTT_LESSON_RE);
  if (!m) return null;
  return { lesson: parseInt(m[1], 10), ddmmyyyy: m[2] };
}

export async function loadLessons(lessonsFile) {
  try {
    return JSON.parse(await readFile(lessonsFile, "utf8"));
  } catch {
    return [];
  }
}

export async function saveLessons(lessonsFile, lessons) {
  await mkdir(join(lessonsFile, ".."), { recursive: true });
  await writeFile(lessonsFile, JSON.stringify(lessons, null, 2) + "\n", "utf8");
}

export async function loadSearchIndex(indexFile) {
  try {
    return JSON.parse(await readFile(indexFile, "utf8"));
  } catch {
    return [];
  }
}

export async function saveSearchIndex(indexFile, index) {
  await mkdir(join(indexFile, ".."), { recursive: true });
  await writeFile(indexFile, JSON.stringify(index, null, 2) + "\n", "utf8");
}

function parseYamlListBlock(block, key) {
  const items = [];
  let inSection = false;
  for (const line of block.split("\n")) {
    const stripped = line.trim();
    if (stripped.startsWith(`${key}:`)) {
      inSection = true;
      continue;
    }
    if (inSection) {
      if (stripped && !stripped.startsWith("-") && stripped.includes(":")) break;
      if (stripped.startsWith("- ")) {
        items.push(stripped.slice(2).trim().replace(/^["']|["']$/g, ""));
      }
    }
  }
  return items;
}

export function extractConceptsFromMarkdown(md) {
  const concepts = [];
  const text = md.trimStart();
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end >= 0) concepts.push(...parseYamlListBlock(text.slice(3, end), "concepts"));
  }
  const m = md.match(CONCEPT_EXTRACTION_RE);
  if (m) concepts.push(...parseYamlListBlock(m[1], "concepts"));
  const seen = new Set();
  return concepts.filter((c) => {
    const k = c.toLowerCase();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function plainTextSnippet(md, maxChars) {
  let text = md.replace(CONCEPT_EXTRACTION_RE, "").replace(/<!--[\s\S]*?-->/g, "");
  if (text.trimStart().startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end >= 0) text = text.slice(end + 4);
  }
  text = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/#{1,6}\s*/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(HTML_TAG_RE, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxChars) return text;
  let cut = text.slice(0, maxChars);
  const sp = cut.lastIndexOf(" ");
  if (sp > 40) cut = cut.slice(0, sp);
  return cut.trimEnd() + "…";
}

export function buildSearchExcerpt(md, entry, maxChars = 600) {
  const fm = parseFrontmatter(md);
  const description = String(
    fm.description ?? fm.title ?? entry.title ?? "",
  ).trim();
  const concepts = extractConceptsFromMarkdown(md);
  const parts = [];
  if (description) parts.push(description.replace(/\.$/, ""));
  if (concepts.length) {
    parts.push(`Conceitos: ${concepts.slice(0, 12).join(", ")}.`);
  }
  let excerpt = parts.join(" ").trim();
  if (excerpt.length < 80) {
    const snippet = plainTextSnippet(md, maxChars);
    excerpt = excerpt ? `${excerpt} ${snippet}`.trim() : snippet;
  }
  if (excerpt.length > maxChars) {
    excerpt = excerpt.slice(0, maxChars - 1).trimEnd() + "…";
  }
  return excerpt;
}

export function upsertSearchIndex(index, { discipline, slug, excerpt }) {
  const row = { discipline, slug, excerpt };
  for (let i = 0; i < index.length; i++) {
    const e = index[i];
    if (e.discipline === discipline && e.slug === slug) {
      if (JSON.stringify(e) === JSON.stringify(row)) return false;
      index[i] = row;
      return true;
    }
  }
  index.push(row);
  return true;
}

export function lessonOrdersByDiscipline(lessons) {
  const out = {};
  for (const L of lessons) {
    if (L.discipline == null || L.order == null) continue;
    (out[L.discipline] ??= new Set()).add(Number(L.order));
  }
  return out;
}

export function isLessonInCatalog(lessons, discipline, lessonOrder) {
  const orders = lessonOrdersByDiscipline(lessons);
  return (orders[discipline] ?? new Set()).has(lessonOrder);
}

export function contentDirFromFile(fileRel) {
  return String(fileRel).replace(/\\/g, "/").split("/")[0];
}

export async function findLessonMarkdownOnDisk(root, contentDir, lessonOrder) {
  const folder = join(root, "content", contentDir);
  let names;
  try {
    names = await readdir(folder);
  } catch {
    return null;
  }
  const prefix = `aula-${String(lessonOrder).padStart(2, "0")}-`;
  const match = names.filter((n) => n.startsWith(prefix) && n.endsWith(".md")).sort()[0];
  return match ? join(folder, match) : null;
}

/** @returns {"missing"|"orphan"|"published", entry|null, contentPath|null} */
export async function lessonPublishState(
  root,
  lessons,
  discipline,
  lessonOrder,
  { contentDir = null } = {},
) {
  const dirKey = contentDir ?? discipline;
  const entry = findLessonByOrder(lessons, discipline, lessonOrder, { contentDir: dirKey });
  if (entry) {
    const contentPath = contentPathForLesson(root, entry);
    try {
      await stat(contentPath);
      return ["published", entry, contentPath];
    } catch { /* catálogo aponta para path em falta */ }
  }
  const disk = await findLessonMarkdownOnDisk(root, dirKey, lessonOrder);
  if (disk) return ["published", entry, disk];
  if (entry) return ["orphan", entry, contentPathForLesson(root, entry)];
  return ["missing", null, null];
}

export function findLessonByOrder(lessons, discipline, lessonOrder, { contentDir = null } = {}) {
  const dirKey = contentDir ?? discipline;
  for (const L of lessons) {
    if (Number(L.order) !== lessonOrder) continue;
    const fileRel = String(L.file ?? "");
    if (fileRel && contentDirFromFile(fileRel) === dirKey) return L;
    if (L.discipline === discipline) return L;
  }
  return null;
}

export function contentPathForLesson(root, entry) {
  return join(root, "content", entry.file.replace(/\\/g, "/"));
}

function parseFrontmatter(md) {
  const text = md.trimStart();
  if (!text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 3);
  if (end < 0) return {};
  const data = {};
  for (const line of text.slice(3, end).trim().split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "order") val = parseInt(val, 10);
    data[key] = val;
  }
  return data;
}

function parseHintYaml(block) {
  const data = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "order") val = parseInt(val, 10);
    if (key === "file") val = val.replace(/\\/g, "/");
    data[key] = val;
  }
  return data;
}

export function extractLessonsHint(md) {
  const jm = md.match(HINT_JSON_RE);
  if (jm) {
    try {
      const parsed = JSON.parse(jm[1]);
      if (parsed && typeof parsed === "object") return parsed;
    } catch { /* */ }
  }
  const ym = md.match(HINT_YAML_RE);
  if (ym) return parseHintYaml(ym[1]);
  return {};
}

export function stripPublishArtifacts(md) {
  let body = md.trimStart().replace(PIPELINE_HEADER_RE, "");
  body = body.replace(HINT_JSON_RE, "").replace(HINT_YAML_RE, "");
  return body.trim() + "\n";
}

export function buildLessonEntry(md, { discipline, contentDir, lessonOrder, vttRel }) {
  const hint = extractLessonsHint(md);
  const fm = parseFrontmatter(md);
  const disc = discipline;
  const order = Number(hint.order ?? fm.order ?? lessonOrder);
  const slug = String(hint.slug ?? fm.slug ?? `aula-${String(order).padStart(2, "0")}`);
  const title = String(hint.title ?? fm.title ?? `Aula ${String(order).padStart(2, "0")}`);
  let fileRel = String(hint.file ?? "").replace(/\\/g, "/");
  if (!fileRel) {
    fileRel = `${contentDir}/aula-${String(order).padStart(2, "0")}-${slug}.md`;
  } else if (!fileRel.startsWith(`${contentDir}/`)) {
    fileRel = `${contentDir}/${fileRel.split(/[/\\]/).pop()}`;
  }
  return { discipline: disc, slug, title, order, file: fileRel, _vttOrigin: vttRel };
}

export function upsertLesson(lessons, entry) {
  const clean = Object.fromEntries(
    Object.entries(entry).filter(([k]) => !k.startsWith("_")),
  );
  const keySlug = `${clean.discipline}\0${clean.slug}`;
  const entryDir = contentDirFromFile(String(clean.file ?? ""));
  const entryOrder = Number(clean.order);
  for (let i = 0; i < lessons.length; i++) {
    const L = lessons[i];
    const exSlug = `${L.discipline}\0${L.slug}`;
    const exDir = contentDirFromFile(String(L.file ?? ""));
    const sameSlot = exDir === entryDir && Number(L.order) === entryOrder;
    if (exSlug === keySlug || sameSlot) {
      if (JSON.stringify(L) === JSON.stringify(clean)) return false;
      lessons[i] = clean;
      return true;
    }
  }
  lessons.push(clean);
  return true;
}

export function downloadsFolderFromVtt(vttPath) {
  const parts = vttPath.replace(/\\/g, "/").split("/");
  return parts[parts.length - 2] ?? "";
}

export async function publishLessonMarkdown(root, vttPath, markdown, config) {
  const folder = downloadsFolderFromVtt(vttPath);
  const mapping = mapDownloadsFolder(folder, config);
  if (!mapping) {
    throw new Error(`Pasta downloads sem mapeamento: ${folder}`);
  }
  const parsed = parseVttLesson(vttPath);
  if (!parsed) {
    throw new Error(`VTT sem padrão Aula_NN_-_DDMMYYYY: ${vttPath}`);
  }
  const vttRel = vttPath.replace(root + "/", "").replace(/\\/g, "/");
  const entry = buildLessonEntry(markdown, {
    discipline: mapping.discipline,
    contentDir: mapping.contentDir,
    lessonOrder: parsed.lesson,
    vttRel,
  });
  const body = stripPublishArtifacts(markdown);
  const lpath = lessonsPath(root, config);
  const lessons = await loadLessons(lpath);
  const existingDisk = await findLessonMarkdownOnDisk(root, mapping.contentDir, parsed.lesson);
  let outPath;
  if (existingDisk) {
    outPath = existingDisk;
    entry.file = relative(join(root, "content"), outPath).replace(/\\/g, "/");
  } else {
    outPath = join(root, "content", entry.file);
  }
  await mkdir(join(outPath, ".."), { recursive: true });
  await writeFile(outPath, body, "utf8");
  const lessonsChanged = upsertLesson(lessons, entry);
  if (lessonsChanged) await saveLessons(lpath, lessons);

  const maxExcerpt = Number(config.search_excerpt_max_chars) || 600;
  const excerpt = buildSearchExcerpt(markdown, entry, maxExcerpt);
  const ipath = searchIndexPath(root, config);
  const searchIndex = await loadSearchIndex(ipath);
  const searchChanged = upsertSearchIndex(searchIndex, {
    discipline: entry.discipline,
    slug: entry.slug,
    excerpt,
  });
  if (searchChanged) await saveSearchIndex(ipath, searchIndex);

  return {
    outPath,
    entry,
    lessonsChanged,
    searchChanged,
    lessons,
    lessonsFile: lpath,
  };
}
