/**
 * Substitui .ppt/.pptx por PDF em downloads/documents (GHA).
 * Uso: node .github/scripts/convert-office-documents.mjs [--dry-run]
 */
import { convertAllOfficeDocuments } from "./document-context.mjs";

const ROOT = process.cwd();
const dryRun = process.argv.includes("--dry-run");

const results = await convertAllOfficeDocuments(ROOT, { dryRun });
if (!results.length) {
  console.log("Nenhum .ppt/.pptx em downloads/documents.");
  process.exit(0);
}

let ok = 0;
let fail = 0;
for (const { source, pdf, error } of results) {
  const rel = source.slice(ROOT.length + 1).replace(/\\/g, "/");
  if (dryRun) {
    console.log(`[dry-run] ${rel}`);
    continue;
  }
  if (pdf && !error) {
    const pdfRel = pdf.slice(ROOT.length + 1).replace(/\\/g, "/");
    console.log(`OK: ${rel} → ${pdfRel}`);
    ok++;
  } else {
    console.error(`ERRO: ${rel}: ${error || "sem PDF"}`);
    fail++;
  }
}

if (fail) process.exit(1);
console.log(`Concluído: ${ok} convertido(s).`);
