#!/usr/bin/env node
/**
 * CLI: exporta todas as lições → jsons/<disciplina>/<disciplina>__NN__<slug>.json
 * Uso: node .github/scripts/export-lessons-json.mjs [--lesson content/python/aula-01-....md]
 */
import { exportAllLessonsJson, exportLessonJsonFromFile } from "./lesson-json-export.mjs";
import { join } from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const lessonIdx = args.indexOf("--lesson");

async function main() {
  if (lessonIdx >= 0 && args[lessonIdx + 1]) {
    const rel = args[lessonIdx + 1].replace(/^content\//, "");
    const mdPath = join(ROOT, "content", rel);
    const { outPath } = await exportLessonJsonFromFile(ROOT, mdPath);
    console.log(`Exportado: ${outPath.replace(ROOT + "/", "")}`);
    return;
  }
  await exportAllLessonsJson(ROOT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
