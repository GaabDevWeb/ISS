#!/usr/bin/env node
/**
 * Valida content/lessons.json, content/search-index.json e coerência entre ambos.
 * Alinha chaves com KernelBot normalize_lesson_key (strip, lower, _ → -).
 */
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const REPORT_DIR = join(ROOT, ".github/reports");
const REPORT_PATH = join(REPORT_DIR, "validate-report.json");

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_LESSON_FIELDS = ["discipline", "slug", "title", "order", "file"];

/** @param {string} value */
function normalizePart(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-");
}

/** @param {string} discipline @param {string} slug */
export function normalizeLessonKey(discipline, slug) {
  return `${normalizePart(discipline)}:${normalizePart(slug)}`;
}

/** @param {unknown} entry */
function isPlaceholderIndexEntry(entry) {
  return /exemplo/i.test(String(entry?.discipline ?? ""));
}

function loadJson(path, label) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    throw new Error(`${label}: não foi possível ler ${path} — ${err.message}`);
  }
}

function main() {
  const errors = [];
  const warnings = [];
  const validatedKeys = [];

  const lessonsPath = join(ROOT, "content/lessons.json");
  const indexPath = join(ROOT, "content/search-index.json");
  const disciplinesPath = join(ROOT, "content/disciplines.json");

  let lessons;
  let searchIndex;
  let disciplines;

  try {
    lessons = loadJson(lessonsPath, "lessons.json");
    searchIndex = loadJson(indexPath, "search-index.json");
    disciplines = loadJson(disciplinesPath, "disciplines.json");
  } catch (err) {
    errors.push(err.message);
    writeReport({ errors, warnings, validatedKeys, lessonCount: 0 });
    process.exit(1);
  }

  if (!Array.isArray(lessons)) {
    errors.push("lessons.json deve ser um array");
    lessons = [];
  }
  if (!Array.isArray(searchIndex)) {
    errors.push("search-index.json deve ser um array");
    searchIndex = [];
  }
  if (!Array.isArray(disciplines)) {
    errors.push("disciplines.json deve ser um array");
    disciplines = [];
  }

  const disciplineSlugs = new Set(
    disciplines.map((d) => String(d?.slug ?? "").trim()).filter(Boolean),
  );

  const lessonKeys = new Set();
  const lessonKeysSeen = new Map();

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const prefix = `lessons[${i}]`;

    if (!lesson || typeof lesson !== "object") {
      errors.push(`${prefix}: entrada inválida`);
      continue;
    }

    for (const field of REQUIRED_LESSON_FIELDS) {
      const val = lesson[field];
      if (val === undefined || val === null || val === "") {
        errors.push(`${prefix}: campo obrigatório ausente ou vazio: ${field}`);
      }
    }

    const discipline = String(lesson.discipline ?? "").trim();
    const slug = String(lesson.slug ?? "").trim();

    if (discipline && !disciplineSlugs.has(discipline)) {
      errors.push(`${prefix}: discipline "${discipline}" não existe em disciplines.json`);
    }

    if (slug && !SLUG_RE.test(slug)) {
      errors.push(`${prefix}: slug inválido "${slug}" (esperado kebab-case ASCII)`);
    }

    if (discipline && slug) {
      const key = normalizeLessonKey(discipline, slug);
      if (lessonKeysSeen.has(key)) {
        errors.push(
          `${prefix}: chave duplicada ${key} (já em lessons[${lessonKeysSeen.get(key)}])`,
        );
      } else {
        lessonKeysSeen.set(key, i);
        lessonKeys.add(key);
        validatedKeys.push(key);
      }
    }

    const fileRel = String(lesson.file ?? "").replace(/\\/g, "/").trim();
    if (fileRel) {
      const abs = join(ROOT, "content", fileRel);
      try {
        const st = statSync(abs);
        if (!st.isFile()) {
          errors.push(`${prefix}: file não é arquivo: content/${fileRel}`);
        } else if (st.size === 0) {
          errors.push(`${prefix}: arquivo vazio: content/${fileRel}`);
        }
      } catch {
        errors.push(`${prefix}: arquivo não encontrado: content/${fileRel}`);
      }
    }
  }

  const indexKeys = new Set();
  const indexKeysSeen = new Map();

  for (let i = 0; i < searchIndex.length; i++) {
    const entry = searchIndex[i];
    const prefix = `search-index[${i}]`;

    if (!entry || typeof entry !== "object") {
      errors.push(`${prefix}: entrada inválida`);
      continue;
    }

    if (isPlaceholderIndexEntry(entry)) {
      warnings.push(
        `${prefix}: entrada placeholder ignorada (discipline contém "Exemplo")`,
      );
      continue;
    }

    const discipline = String(entry.discipline ?? "").trim();
    const slug = String(entry.slug ?? "").trim();

    if (!discipline || !slug) {
      errors.push(`${prefix}: discipline e slug são obrigatórios`);
      continue;
    }

    const key = normalizeLessonKey(discipline, slug);

    if (indexKeysSeen.has(key)) {
      errors.push(
        `${prefix}: chave duplicada no índice ${key} (já em search-index[${indexKeysSeen.get(key)}])`,
      );
    } else {
      indexKeysSeen.set(key, i);
      indexKeys.add(key);
    }

    if (!lessonKeys.has(key)) {
      errors.push(`${prefix}: entrada órfã no índice (sem aula em lessons.json): ${key}`);
    }
  }

  for (const key of lessonKeys) {
    if (!indexKeys.has(key)) {
      warnings.push(`lessons.json sem entrada correspondente em search-index.json: ${key}`);
    }
  }

  validatedKeys.sort();

  const success = errors.length === 0;
  writeReport({
    errors,
    warnings,
    validatedKeys,
    lessonCount: lessons.length,
    success,
  });

  if (errors.length > 0) {
    console.error(`Validação falhou: ${errors.length} erro(s), ${warnings.length} aviso(s).`);
    for (const e of errors) console.error(`  ERROR: ${e}`);
    for (const w of warnings) console.warn(`  WARN: ${w}`);
    process.exit(1);
  }

  console.log(
    `Validação OK: ${lessons.length} lição(ões), ${validatedKeys.length} chave(s), ${warnings.length} aviso(s).`,
  );
  for (const w of warnings) console.warn(`  WARN: ${w}`);
}

function writeReport({ errors, warnings, validatedKeys, lessonCount, success }) {
  mkdirSync(REPORT_DIR, { recursive: true });
  const report = {
    timestamp: new Date().toISOString(),
    success: success ?? errors.length === 0,
    lesson_count: lessonCount,
    validated_keys: validatedKeys,
    errors,
    warnings,
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(`Relatório: ${REPORT_PATH}`);
}

main();
