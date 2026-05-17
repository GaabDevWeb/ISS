/**
 * Exporta lições ISS (Markdown) → jsons/<disciplina>/<disciplina>__NN__<slug>.json (uma aula por ficheiro).
 */
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import {
  extractConceptsFromMarkdown,
  loadLessons,
  lessonsPath,
  loadVttContentConfig,
  stripPublishArtifacts,
} from "./iss-content.mjs";

const EXPORT_ROOT = "jsons";
const MARK_INLINE_RE =
  /<mark[^>]*>`([^`]+)`[^<]*<\/mark>|<mark[^>]*>([^<]+)<\/mark>/gi;
const CONCEPT_EXTRACTION_RE = /<!--\s*CONCEPT_EXTRACTION\s*\n([\s\S]*?)-->/i;

function extractFrontmatterBlock(md) {
  const text = md.trimStart();
  if (!text.startsWith("---")) return { fm: "", body: md };
  const end = text.indexOf("\n---", 3);
  if (end < 0) return { fm: "", body: md };
  return {
    fm: text.slice(3, end).trim(),
    body: text.slice(end + 4).trimStart(),
  };
}

function parseYamlScalar(line, key) {
  const re = new RegExp(`^${key}:\\s*(.*)$`);
  const m = line.match(re);
  if (!m) return undefined;
  return m[1].trim().replace(/^["']|["']$/g, "");
}

function parseYamlListFromFm(fmText, key) {
  const items = [];
  let inSection = false;
  for (const line of fmText.split("\n")) {
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

function parseQuotedValue(line) {
  const i = line.indexOf(":");
  if (i < 0) return "";
  return line
    .slice(i + 1)
    .trim()
    .replace(/^["']|["']$/g, "");
}

function parseExercisesFromFm(fmText) {
  const exercises = [];
  let current = null;
  let inSection = false;
  for (const line of fmText.split("\n")) {
    if (/^exercises:\s*$/.test(line.trim())) {
      inSection = true;
      continue;
    }
    if (!inSection) continue;
    if (/^[^\s]/.test(line) && !line.startsWith("exercises")) break;
    if (/^\s*-\s+question:/.test(line)) {
      if (current) exercises.push(current);
      current = { question: parseQuotedValue(line) };
      continue;
    }
    if (!current) continue;
    if (/^\s+answer:/.test(line)) {
      current.answer = parseQuotedValue(line);
      continue;
    }
    if (/^\s+hint:/.test(line)) {
      current.hint = parseQuotedValue(line);
    }
  }
  if (current) exercises.push(current);
  return exercises;
}

function parseFrontmatterFields(fmText) {
  const data = {};
  for (const line of fmText.split("\n")) {
    if (!line.trim() || line.trim().startsWith("-")) continue;
    const scalar = ["title", "slug", "discipline", "description"].find((k) =>
      line.startsWith(`${k}:`),
    );
    if (scalar) data[scalar] = parseYamlScalar(line, scalar);
    if (line.startsWith("order:")) {
      data.order = parseInt(parseYamlScalar(line, "order"), 10);
    }
  }
  data.concepts = parseYamlListFromFm(fmText, "concepts");
  data.learning_objectives = parseYamlListFromFm(fmText, "learning_objectives");
  data.exercises = parseExercisesFromFm(fmText);
  return data;
}

function extractHeadings(md) {
  const out = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^#{2,3}\s+(.+)/);
    if (!m) continue;
    out.push(m[1].replace(/\*\*/g, "").trim());
  }
  return out;
}

function normalizeContentBody(md) {
  let body = stripPublishArtifacts(md);
  body = body.replace(CONCEPT_EXTRACTION_RE, "").trim();
  body = body.replace(MARK_INLINE_RE, (_, g1, g2) => `\`${g1 ?? g2}\``);
  return body.trim() + "\n";
}

function uniqueKeywords(concepts, headings, max = 40) {
  const seen = new Set();
  const out = [];
  for (const item of [...concepts, ...headings]) {
    const k = item.trim();
    if (!k) continue;
    const key = k.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(k);
    if (out.length >= max) break;
  }
  return out;
}

function buildExportDescription(description, concepts, objectives) {
  let d = String(description ?? "").trim();
  if (concepts.length) {
    d += `${d ? " " : ""}Tópicos abordados: ${concepts.slice(0, 12).join(", ")}.`;
  }
  if (objectives.length) {
    d += ` Objetivos: ${objectives.map((o) => `• ${o}`).join(" ")}`;
  }
  if (d.length > 600) d = `${d.slice(0, 597).trimEnd()}...`;
  return d;
}

function lessonJsonFilename(discipline, order, slug) {
  const ord = String(order).padStart(2, "0");
  return `${discipline}__${ord}__${slug}.json`;
}

function sourceHash(text) {
  return createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16);
}

export function buildLessonJsonRecord(root, md, { discipline, slug, order, title, fileRel }) {
  const { fm: fmText, body: rawBody } = extractFrontmatterBlock(md);
  const fm = parseFrontmatterFields(fmText);
  const disc = discipline ?? fm.discipline;
  const lessonSlug = slug ?? fm.slug;
  const lessonOrder = Number(order ?? fm.order ?? 0);
  const name = title ?? fm.title ?? `Aula ${String(lessonOrder).padStart(2, "0")}`;
  const concepts = extractConceptsFromMarkdown(md);
  const objectives = fm.learning_objectives ?? [];
  const exercises = fm.exercises ?? [];
  const headings = extractHeadings(rawBody);
  const keywords = uniqueKeywords(concepts, headings);
  const content = normalizeContentBody(md);
  const source_path = fileRel.replace(/\\/g, "/");
  const normalizedForHash = content.replace(/\r\n/g, "\n");

  return {
    id: `${disc}:${lessonSlug}`,
    slug: lessonSlug,
    discipline: disc,
    order: lessonOrder,
    name,
    description: buildExportDescription(fm.description, concepts, objectives),
    keywords,
    concepts,
    learning_objectives: objectives,
    exercises,
    content,
    source_path,
    source_hash: sourceHash(normalizedForHash),
  };
}

export async function writeLessonJson(root, record) {
  const dir = join(root, EXPORT_ROOT, record.discipline);
  await mkdir(dir, { recursive: true });
  const filename = lessonJsonFilename(record.discipline, record.order, record.slug);
  const outPath = join(dir, filename);
  await writeFile(outPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
  return outPath;
}

export async function exportLessonJsonFromFile(root, mdPath, entry = null) {
  const md = await readFile(mdPath, "utf8");
  const fileRel =
    entry?.file ??
    relative(join(root, "content"), mdPath).replace(/\\/g, "/");
  const record = buildLessonJsonRecord(root, md, {
    discipline: entry?.discipline,
    slug: entry?.slug,
    order: entry?.order,
    title: entry?.title,
    fileRel: `content/${fileRel.replace(/^content\//, "")}`,
  });
  const outPath = await writeLessonJson(root, record);
  return { outPath, record };
}

export async function rebuildLessonsJsonIndex(root) {
  const base = join(root, EXPORT_ROOT);
  const index = [];
  let disciplines;
  try {
    disciplines = await readdir(base, { withFileTypes: true });
  } catch {
    return { indexPath: join(base, "index.json"), count: 0 };
  }
  for (const d of disciplines) {
    if (!d.isDirectory()) continue;
    const dir = join(base, d.name);
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      const raw = await readFile(join(dir, f), "utf8");
      const row = JSON.parse(raw);
      index.push({
        id: row.id,
        name: row.name,
        discipline: row.discipline,
        order: row.order,
        source_path: row.source_path,
      });
    }
  }
  index.sort((a, b) => {
    if (a.discipline !== b.discipline) return a.discipline.localeCompare(b.discipline);
    return a.order - b.order;
  });
  const indexPath = join(base, "index.json");
  await mkdir(base, { recursive: true });
  await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  return { indexPath, count: index.length };
}

export async function exportAllLessonsJson(root) {
  const config = await loadVttContentConfig(root);
  const lessons = await loadLessons(lessonsPath(root, config));
  let written = 0;
  for (const entry of lessons) {
    const mdPath = join(root, "content", entry.file.replace(/\\/g, "/"));
    try {
      await exportLessonJsonFromFile(root, mdPath, entry);
      written++;
    } catch (e) {
      console.warn(`[json-export] Ignorar ${entry.file}: ${e.message}`);
    }
  }
  const { indexPath, count } = await rebuildLessonsJsonIndex(root);
  console.log(`[json-export] ${written} ficheiro(s); índice: ${indexPath} (${count} entradas)`);
  return { written, indexCount: count };
}
