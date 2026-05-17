/**
 * Contexto downloads/documents + conversão Office→PDF (uso no GHA).
 */
import { readFile, readdir, stat, access, unlink } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";

const VTT_LESSON_RE = /Aula_(\d+)_-_(\d{8})/i;
const AULA_DIR_RE = /^aula-(\d+)/i;
const TEXT_EXT = new Set([".txt", ".md", ".csv", ".json", ".sql", ".py", ".html", ".xml"]);
const OFFICE_TO_PDF_EXT = new Set([".ppt", ".pptx"]);
const SKIP_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".zip",
  ".xlsx", ".xls", ".doc", ".docx",
]);

function normalizeKey(name) {
  return name.toLowerCase().replace(/[–—\-_\s\[\]]/g, "");
}

export async function loadDocumentsConfig(root) {
  const raw = await readFile(join(root, "config/documents-context.json"), "utf8");
  return JSON.parse(raw);
}

export async function resolveDocumentsDisciplineDirAsync(downloadsDiscipline, documentsRoot, config) {
  const entry = config.disciplines?.[downloadsDiscipline] ?? {};
  const mode = entry.mode ?? config.default_mode ?? "discipline_all";
  if (entry.documents_dir) {
    const candidate = join(documentsRoot, entry.documents_dir);
    try {
      const s = await stat(candidate);
      if (s.isDirectory()) return { dir: candidate, mode };
    } catch { /* */ }
  }
  const target = normalizeKey(downloadsDiscipline);
  let best = null;
  let bestLen = 0;
  let entries;
  try {
    entries = await readdir(documentsRoot, { withFileTypes: true });
  } catch {
    return { dir: null, mode };
  }
  const prefix = target.slice(0, Math.min(target.length, 20));
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const key = normalizeKey(e.name);
    if (target.length && (key.includes(target) || target.includes(key) || key.startsWith(prefix))) {
      if (key.length > bestLen) {
        best = join(documentsRoot, e.name);
        bestLen = key.length;
      }
    }
  }
  return { dir: best, mode };
}

function parseVttLesson(vttPath) {
  const base = vttPath.split(/[/\\]/).pop() ?? "";
  const m = base.match(VTT_LESSON_RE);
  if (!m) return null;
  return { lesson: parseInt(m[1], 10), ddmmyyyy: m[2] };
}

function dateVariants(ddmmyyyy) {
  const dd = ddmmyyyy.slice(0, 2);
  const mm = ddmmyyyy.slice(2, 4);
  const yyyy = ddmmyyyy.slice(4, 8);
  const yy = yyyy.slice(2, 4);
  return new Set([dd, mm, yyyy, yy, String(parseInt(dd, 10)), String(parseInt(mm, 10))]);
}

export async function matchLessonFolder(disciplineDir, lesson, ddmmyyyy) {
  let entries;
  try {
    entries = await readdir(disciplineDir, { withFileTypes: true });
  } catch {
    return null;
  }
  const dateVals = dateVariants(ddmmyyyy);
  const intDates = new Set([...dateVals].map((x) => parseInt(x, 10)).filter((n) => !Number.isNaN(n)));
  const candidates = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const name = e.name.toLowerCase();
    const m = name.match(AULA_DIR_RE);
    if (!m || parseInt(m[1], 10) !== lesson) continue;
    const tail = name.slice(m[0].length).replace(/^-/, "");
    const tailNums = tail.match(/\d+/g) ?? [];
    let score = 0;
    for (const n of tailNums) {
      if (dateVals.has(n) || intDates.has(parseInt(n, 10))) score++;
    }
    if (score >= 2) candidates.push({ score, path: join(disciplineDir, e.name) });
  }
  if (!candidates.length) return null;
  candidates.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
  return candidates[0].path;
}

async function collectFiles(base, recursive) {
  const files = [];
  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory() && recursive) await walk(full);
      else if (e.isFile()) files.push(full);
    }
  }
  if (recursive) await walk(base);
  else {
    let entries;
    try {
      entries = await readdir(base, { withFileTypes: true });
    } catch {
      return files;
    }
    for (const e of entries) {
      if (e.isFile()) files.push(join(base, e.name));
    }
  }
  return files.sort();
}

function officeConvertConfig(config) {
  const cfg = config?.office_to_pdf ?? {};
  return {
    enabled: cfg.enabled !== false,
    replaceSource: Boolean(cfg.replace_source),
    extensions: new Set(
      (cfg.extensions ?? [".ppt", ".pptx"]).map((e) => e.toLowerCase()),
    ),
    commands: cfg.commands ?? ["libreoffice", "soffice"],
    timeoutMs: (cfg.timeout_seconds ?? 180) * 1000,
  };
}

async function removeOfficeSource(sourcePath, replaceSource) {
  if (!replaceSource) return;
  try {
    await unlink(sourcePath);
  } catch { /* já removido */ }
}

function findOfficeCommand(commands) {
  for (const name of commands) {
    const r = spawnSync("which", [name], { encoding: "utf8" });
    if (r.status === 0 && r.stdout?.trim()) return r.stdout.trim();
  }
  return null;
}

async function ensurePdfFromOffice(sourcePath, config) {
  const oc = officeConvertConfig(config);
  if (!oc.enabled) return { pdf: null, error: "conversão Office→PDF desativada na config" };
  const ext = sourcePath.slice(sourcePath.lastIndexOf(".")).toLowerCase();
  if (!oc.extensions.has(ext)) return { pdf: null, error: "extensão não suportada" };

  const pdfPath = sourcePath.replace(/\.[^.]+$/, ".pdf");
  try {
    const pdfSt = await stat(pdfPath);
    try {
      const srcSt = await stat(sourcePath);
      if (pdfSt.mtimeMs >= srcSt.mtimeMs) {
        await removeOfficeSource(sourcePath, oc.replaceSource);
        return { pdf: pdfPath, error: "" };
      }
    } catch {
      return { pdf: pdfPath, error: "" };
    }
  } catch { /* gerar */ }

  const officeCmd = findOfficeCommand(oc.commands);
  if (!officeCmd) {
    return { pdf: null, error: "LibreOffice não encontrado (libreoffice-impress)" };
  }

  const outDir = dirname(sourcePath);
  const r = spawnSync(
    officeCmd,
    [
      "--headless",
      "--nologo",
      "--nofirststartwizard",
      "--convert-to",
      "pdf",
      "--outdir",
      outDir,
      sourcePath,
    ],
    { encoding: "utf8", timeout: oc.timeoutMs },
  );

  let resolved = pdfPath;
  try {
    await access(pdfPath);
  } catch {
    const stem = sourcePath.split(/[/\\]/).pop().replace(/\.[^.]+$/, "");
    const entries = await readdir(outDir);
    const match = entries.find((n) => n.startsWith(stem) && n.endsWith(".pdf"));
    if (match) resolved = join(outDir, match);
    else {
      const err = (r.stderr || r.stdout || "").trim();
      const detail = err.split("\n").pop() || `código ${r.status}`;
      return { pdf: null, error: `conversão falhou: ${detail}` };
    }
  }
  await removeOfficeSource(sourcePath, oc.replaceSource);
  return { pdf: resolved, error: "" };
}

function extractPdfText(path, maxChars) {
  const r = spawnSync("pdftotext", ["-layout", path, "-"], {
    encoding: "utf8",
    timeout: 120000,
  });
  if (r.status !== 0) return `[PDF não legível: código ${r.status}]`;
  let text = (r.stdout || "").trim();
  if (!text) return "[PDF sem texto extraível.]";
  if (text.length > maxChars) text = text.slice(0, maxChars) + `\n\n[PDF truncado em ${maxChars} caracteres.]`;
  return text;
}

async function readFileExcerpt(filePath, maxChars, config) {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  if (SKIP_EXT.has(ext)) {
    return {
      content: `[Ficheiro binário/formato não inlined: ${filePath.split(/[/\\]/).pop()}]`,
      note: "",
    };
  }
  if (OFFICE_TO_PDF_EXT.has(ext)) {
    const { pdf, error } = await ensurePdfFromOffice(filePath, config);
    if (!pdf) {
      return {
        content: `[${ext.slice(1).toUpperCase()} não convertido para PDF: ${error}]`,
        note: "",
      };
    }
    return {
      content: extractPdfText(pdf, maxChars),
      note: `${ext.slice(1)}→pdf`,
    };
  }
  if (ext === ".pdf") return { content: extractPdfText(filePath, maxChars), note: "pdf" };
  try {
    let raw = await readFile(filePath, "utf8");
    if (raw.length > maxChars) raw = raw.slice(0, maxChars) + `\n\n[Truncado em ${maxChars} caracteres.]`;
    return { content: raw, note: "" };
  } catch (e) {
    return { content: `[Erro ao ler: ${e?.message || e}]`, note: "" };
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function logDocumentContextIndex(vttRel, result) {
  const border = "─".repeat(62);
  console.log(border);
  console.log(`[contexto] VTT: ${vttRel}`);
  if (!result?.ctx) {
    console.log("[contexto] ⊘ Nenhum documento anexado");
    if (result?.missReason) console.log(`[contexto]   Motivo: ${result.missReason}`);
    console.log(border);
    return;
  }
  const ctx = result.ctx;
  const docsRel = ctx.documentsDir.replace(/^.*downloads\/documents\//, "documents/") || ctx.documentsDir;
  console.log(`[contexto] Modo: ${ctx.mode}`);
  console.log(`[contexto] Disciplina (downloads): ${ctx.disciplineKey}`);
  console.log(`[contexto] Pasta documents: ${docsRel}`);
  if (ctx.lessonDir) {
    console.log(`[contexto] Pasta da aula: ${ctx.lessonDir.split(/[/\\]/).pop()}`);
  } else if (ctx.mode === "per_lesson") {
    console.log("[contexto] Pasta da aula: (não encontrada — fallback na raiz da disciplina)");
  }
  const included = ctx.index.filter((e) => e.status === "included");
  const omitted = ctx.index.filter((e) => e.status !== "included");
  console.log(
    `[contexto] Indexação: ${included.length} incluídos, ${omitted.length} omitidos, ` +
      `${ctx.promptChars.toLocaleString()} chars no prompt (docs)`,
  );
  const marks = {
    included: "✓",
    omitted_budget: "⊘ budget/ficheiro",
    omitted_total_cap: "⊘ limite total",
    skipped_binary: "◇ binário",
  };
  console.log("[contexto] Ficheiros:");
  for (const entry of ctx.index) {
    const mark = marks[entry.status] ?? "?";
    const size = formatBytes(entry.sizeBytes);
    const chars = entry.charsInPrompt ? `${entry.charsInPrompt.toLocaleString()} chars` : "—";
    const note = entry.note ? ` — ${entry.note}` : "";
    console.log(`[contexto]   ${mark} ${entry.rel} (${size}, ${chars})${note}`);
  }
  if (!ctx.index.length) console.log("[contexto]   (nenhum ficheiro na pasta resolvida)");
  console.log(border);
}

async function buildPromptSection({
  mode,
  disciplineKey,
  documentsDir,
  lessonDir,
  files,
  vttRel,
  maxTotalChars,
  maxFileChars,
  config,
}) {
  const index = [];
  if (!files.length) return { promptSection: "", index, promptChars: 0 };
  const lines = [
    "# Documentos complementares (`downloads/documents`)",
    "",
    `- **Disciplina (downloads):** \`${disciplineKey}\``,
    `- **Pasta em documents:** \`${documentsDir.split(/[/\\]/).pop()}\``,
    `- **Modo:** \`${mode}\``,
  ];
  if (lessonDir) lines.push(`- **Aula (pasta):** \`${lessonDir.split(/[/\\]/).pop()}\``);
  lines.push(`- **VTT de referência:** \`${vttRel}\``, "");
  if (mode.startsWith("discipline")) {
    lines.push(
      "> **Instrução:** Segue anexado o inventário **completo** da disciplina. Usa **apenas** ficheiros relevantes para **esta** aula (número e data no VTT). Ignora materiais de outras etapas/aulas.",
      "",
    );
  }
  const bodyParts = [];
  let used = 0;
  let hitTotalCap = false;
  for (const filePath of files) {
    const rel = filePath.replace(documentsDir + "/", "").replace(/\\/g, "/");
    let sizeBytes = 0;
    try {
      sizeBytes = (await stat(filePath)).size;
    } catch { /* */ }
    const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
    if (SKIP_EXT.has(ext)) {
      index.push({
        rel,
        status: "skipped_binary",
        charsInPrompt: 0,
        sizeBytes,
        note: ext.replace(".", "") || "binário",
      });
      continue;
    }
    const header = `## Ficheiro: \`${rel}\`\n\n`;
    const budget = Math.min(maxFileChars, maxTotalChars - used - header.length - 50);
    if (budget < 200) {
      index.push({
        rel,
        status: "omitted_budget",
        charsInPrompt: 0,
        sizeBytes,
        note: `budget restante ${budget}`,
      });
      lines.push(`- _(omitido por limite)_ \`${rel}\``);
      continue;
    }
    const { content, note: readNote } = await readFileExcerpt(filePath, budget, config);
    const chunk = header + content + "\n";
    bodyParts.push(chunk);
    used += chunk.length;
    index.push({
      rel,
      status: "included",
      charsInPrompt: content.length,
      sizeBytes,
      note: readNote || (ext === ".pdf" ? "pdf" : ""),
    });
    if (used >= maxTotalChars) {
      lines.push("\n> _(Mais ficheiros omitidos por limite DOCUMENT_CONTEXT_MAX_CHARS.)_");
      hitTotalCap = true;
      break;
    }
  }
  if (hitTotalCap) {
    const indexed = new Set(index.map((e) => e.rel));
    for (const filePath of files) {
      const rel = filePath.replace(documentsDir + "/", "").replace(/\\/g, "/");
      if (indexed.has(rel)) continue;
      let sizeBytes = 0;
      try {
        sizeBytes = (await stat(filePath)).size;
      } catch { /* */ }
      const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
      index.push({
        rel,
        status: SKIP_EXT.has(ext) ? "skipped_binary" : "omitted_total_cap",
        charsInPrompt: 0,
        sizeBytes,
        note: SKIP_EXT.has(ext) ? "" : "DOCUMENT_CONTEXT_MAX_CHARS",
      });
    }
  }
  const promptSection = lines.join("\n") + bodyParts.join("");
  return { promptSection, index, promptChars: promptSection.length };
}

export async function resolveDocumentContext(vttPath, root, options = {}) {
  const maxTotalChars = options.maxTotalChars ?? 80_000;
  const maxFileChars = options.maxFileChars ?? 25_000;
  const config = await loadDocumentsConfig(root);
  const documentsRoot = join(root, config.documents_root ?? "downloads/documents");
  const rel = vttPath.replace(root + "/", "").replace(/\\/g, "/");
  const m = rel.match(/^downloads\/([^/]+)\/.+\.vtt$/i);
  if (!m) return { ctx: null, missReason: "VTT fora de downloads/" };
  const disciplineKey = m[1];
  const vttRel = rel.replace(/^downloads\//, "");

  const { dir: disciplineDir, mode: cfgMode } = await resolveDocumentsDisciplineDirAsync(
    disciplineKey,
    documentsRoot,
    config,
  );
  if (!disciplineDir) {
    return {
      ctx: null,
      missReason: `sem pasta em documents/ para disciplina '${disciplineKey}'`,
    };
  }

  let mode = cfgMode;
  let lessonDir = null;
  let files = [];
  let matchNote = "";
  const parsed = parseVttLesson(vttPath);

  if (cfgMode === "per_lesson") {
    if (parsed) {
      lessonDir = await matchLessonFolder(disciplineDir, parsed.lesson, parsed.ddmmyyyy);
      if (!lessonDir) matchNote = `aula ${parsed.lesson} data ${parsed.ddmmyyyy} — pasta aula-* não encontrada`;
    } else {
      matchNote = "nome VTT sem padrão Aula_NN_-_DDMMYYYY";
    }
    if (lessonDir) files = await collectFiles(lessonDir, true);
    else {
      mode = "discipline_all_fallback";
      files = await collectFiles(disciplineDir, false);
    }
  } else {
    files = await collectFiles(disciplineDir, false);
  }

  if (!files.length) {
    let reason = `0 ficheiros em ${disciplineDir.split(/[/\\]/).pop()}`;
    if (matchNote) reason += `; ${matchNote}`;
    return { ctx: null, missReason: reason };
  }

  const { promptSection, index, promptChars } = await buildPromptSection({
    mode,
    disciplineKey,
    documentsDir: disciplineDir,
    lessonDir,
    files,
    vttRel,
    maxTotalChars,
    maxFileChars,
    config,
  });
  if (!promptSection.trim()) {
    return { ctx: null, missReason: "ficheiros encontrados mas nenhum conteúdo legível para o prompt" };
  }

  if (matchNote && mode === "discipline_all_fallback") {
    index.unshift({
      rel: "(resolução)",
      status: "included",
      charsInPrompt: 0,
      sizeBytes: 0,
      note: matchNote,
    });
  }

  return {
    ctx: {
      mode,
      disciplineKey,
      documentsDir: disciplineDir,
      lessonDir,
      files,
      promptSection,
      index,
      promptChars,
    },
    missReason: null,
  };
}

/** @returns {{ source: string, pdf: string|null, error: string }[]} */
export async function convertAllOfficeDocuments(root, { dryRun = false } = {}) {
  const config = await loadDocumentsConfig(root);
  const oc = officeConvertConfig(config);
  if (!oc.enabled) return [];
  const documentsRoot = join(root, config.documents_root ?? "downloads/documents");
  const allFiles = await collectFiles(documentsRoot, true);
  const results = [];
  for (const path of allFiles) {
    const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
    if (!oc.extensions.has(ext)) continue;
    if (dryRun) {
      results.push({ source: path, pdf: null, error: "dry-run" });
      continue;
    }
    const { pdf, error } = await ensurePdfFromOffice(path, config);
    results.push({ source: path, pdf, error });
  }
  return results;
}

export async function contextPathsForMtime(ctx) {
  if (!ctx?.files?.length) return [];
  const paths = [...ctx.files];
  for (const filePath of ctx.files) {
    const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
    if (!OFFICE_TO_PDF_EXT.has(ext)) continue;
    const pdf = filePath.replace(/\.[^.]+$/, ".pdf");
    try {
      await access(pdf);
      if (!paths.includes(pdf)) paths.push(pdf);
    } catch { /* */ }
  }
  return paths;
}

/** @deprecated use result.ctx — helper for callers */
export function unwrapDocumentContext(result) {
  return result?.ctx ?? null;
}
