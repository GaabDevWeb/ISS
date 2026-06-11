/**
 * Pipeline VTT → lições ISS (GitHub Actions).
 * Lê .vtt em downloads/, Cursor SDK, publica em content/ + lessons.json + search-index.json.
 */
import { Agent, CursorAgentError } from "@cursor/sdk";
import { mkdtemp, readFile, readdir, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  contextPathsForMtime,
  logDocumentContextIndex,
  resolveDocumentContext,
} from "./document-context.mjs";
import {
  disciplineDisplayTitle,
  lessonNotifyDescription,
  lessonPublishState,
  loadDisciplines,
  loadLessons,
  loadVttContentConfig,
  lessonsPath,
  mapDownloadsFolder,
  parseVttLesson,
  publishLessonMarkdown,
} from "./iss-content.mjs";

const ROOT = process.cwd();
const DOWNLOADS = join(ROOT, "downloads");
const PROMPTS_DIR = process.env.ISS_PROMPTS_DIR
  ? join(ROOT, process.env.ISS_PROMPTS_DIR)
  : join(ROOT, "agents");
const ISS_AGENT = join(PROMPTS_DIR, "content-summary-agent.md");
const ISS_STYLE = join(PROMPTS_DIR, "content-summary-style-guide.md");
const ISS_BUNDLE_PATHS = [ISS_AGENT, ISS_STYLE];

const _mf = parseInt(process.env.TRANSCRIPT_SUMMARY_MAX_FILES ?? "5", 10);
const MAX_FILES = Number.isFinite(_mf) && _mf >= 0 ? _mf : 5;
const MAX_CHARS = parseInt(process.env.TRANSCRIPT_SUMMARY_MAX_CHARS || "100000", 10);
const MAX_ATTEMPTS = parseInt(process.env.TRANSCRIPT_SUMMARY_MAX_ATTEMPTS || "3", 10);
const DOC_MAX_CHARS = parseInt(process.env.DOCUMENT_CONTEXT_MAX_CHARS || "80000", 10);
const DOC_FILE_CHARS = parseInt(process.env.DOCUMENT_CONTEXT_MAX_FILE_CHARS || "25000", 10);
const FORCE = process.env.TRANSCRIPT_SUMMARY_FORCE === "1" || process.env.TRANSCRIPT_SUMMARY_FORCE === "true";

const META_PATTERNS =
  /(?:^|\n)##\s*(?:Entrega|Estado do entregável)\b|Segue o resumo|Se quiseres (?:o |alinh)|foi gravad[oa] (?:aqui|em)|neste chat|apenas a conversa|O ficheiro completo ISS foi gravado/is;

const OUTPUT_CONTRACT = `
## Contrato de saída (OBRIGATÓRIO — violação invalida o job)

1. A tua **resposta final** deve ser **somente** o Markdown integral da lição ISS (começa com \`---\` do frontmatter YAML).
2. **Proibido** na resposta: resumos em bullets, meta-comentários (“Segue…”, “O ficheiro foi gravado…”, “## Entrega”, perguntas ao utilizador).
3. **Proibido** usar ferramentas de escrita/edição de ficheiros — o pipeline publica em \`content/\`; tu **só** devolves texto na mensagem final.
4. **Obrigatório** no corpo: frontmatter YAML, secções ISS, ≥1 bloco \`\`\`mermaid, \`## Laboratório de Prática\`, blocos comentados \`CONCEPT_EXTRACTION\` e \`EXERCISES_JSON\`, e \`LESSONS_JSON_HINT\` no fim.
5. Não é um “resumo de aula”: é **material de ensino completo** conforme os documentos ISS abaixo.
`;

const STRICT_RETRY = `
## CORREÇÃO (tentativa anterior rejeitada)

A resposta anterior foi **meta-texto** ou **resumo parcial**, não a lição ISS completa.
Reemite **apenas** o arquivo \`.md\` integral: primeira linha \`---\`, últimos blocos \`CONCEPT_EXTRACTION\` / \`EXERCISES_JSON\`. Sem comentários sobre o que fizeste.
`;

function vttToPlain(vtt) {
  const lines = vtt.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || t === "WEBVTT") continue;
    if (/^\d+$/.test(t)) continue;
    if (/-->/.test(t)) continue;
    if (/^NOTE\b/i.test(t)) continue;
    out.push(line.trimEnd());
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function extractLessonMarkdown(text) {
  const stripped = text.trim();
  const fence = stripped.match(/```(?:markdown|md)\s*\n([\s\S]*?)```/i);
  if (fence && fence[1].trim().length > stripped.length * 0.5) {
    return fence[1].trim();
  }
  return stripped;
}

function isValidIssLesson(text) {
  const body = extractLessonMarkdown(text);
  if (body.length < 2000) return false;
  if (META_PATTERNS.test(body)) return false;
  if (!body.trimStart().slice(0, 800).startsWith("---")) return false;
  if (!body.includes("CONCEPT_EXTRACTION")) return false;
  if (!body.includes("EXERCISES_JSON") && !body.includes("Laboratório de Prática")) return false;
  if (!body.toLowerCase().includes("```mermaid")) return false;
  return true;
}

async function* walkVtt(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walkVtt(full);
    else if (e.isFile() && e.name.endsWith(".vtt")) yield full;
  }
}

async function loadIssBundle() {
  try {
    const [agent, style] = await Promise.all([
      readFile(ISS_AGENT, "utf8"),
      readFile(ISS_STYLE, "utf8"),
    ]);
    return { agent, style };
  } catch (e) {
    throw new Error(
      `Falha ao ler prompts ISS em "${PROMPTS_DIR}" (content-summary-agent.md + content-summary-style-guide.md): ${e?.message || e}`,
    );
  }
}

async function needsRun(vttPath, outPath, bundlePaths) {
  if (FORCE) return true;
  try {
    const vs = await stat(vttPath);
    const os = await stat(outPath);
    let newestInput = vs.mtimeMs;
    for (const p of bundlePaths) {
      try {
        newestInput = Math.max(newestInput, (await stat(p)).mtimeMs);
      } catch {
        /* ignorar */
      }
    }
    return os.mtimeMs < newestInput;
  } catch {
    return true;
  }
}

function buildMessage(plain, sourceLabel, bundle, { strictRetry = false, documentsSection = "" } = {}) {
  const body =
    plain.length > MAX_CHARS
      ? `${plain.slice(0, MAX_CHARS)}\n\n[Texto truncado para ${MAX_CHARS} caracteres — origem longa.]`
      : plain;

  const bridge = `# Contexto de execução (pipeline automático — saída só por texto)

- **Fonte bruta:** texto extraído de transcrição WebVTT (aula em vídeo).
- **Destino:** lição ISS publicada pelo pipeline em \`content/<disciplina>/\` e \`content/lessons.json\` (tu não escreves ficheiros).
- **Cumpre integralmente** os dois documentos ISS abaixo (agente + guia de estilo).
- **Obrigatório:** bloco \`LESSONS_JSON_HINT\` (JSON) no final com \`discipline\`, \`slug\`, \`title\`, \`order\`, \`file\`.
- **Caminho da fonte (disciplina/título/slug):** \`${sourceLabel}\`

${OUTPUT_CONTRACT}
${strictRetry ? STRICT_RETRY : ""}`;

  const docsBlock = documentsSection.trim()
    ? `\n---\n\n${documentsSection.trim()}\n\n---\n`
    : "";

  return `${bridge}

---

# Documento 1 — content-summary-agent.md

${bundle.agent}

---

# Documento 2 — content-summary-style-guide.md

${bundle.style}
${docsBlock}
# Transcrição (WebVTT → texto)

${body}`;
}

async function callAgent(message, workCwd) {
  try {
    const result = await Agent.prompt(message, {
      apiKey: process.env.CURSOR_API_KEY,
      model: { id: process.env.CURSOR_MODEL_ID || "composer-2" },
      local: { cwd: workCwd, settingSources: [] },
    });
    if (result.status !== "finished") {
      throw new Error(`Run terminou com status=${result.status} id=${result.id}`);
    }
    if (!result.result?.trim()) {
      throw new Error("Resposta vazia do agente.");
    }
    return extractLessonMarkdown(result.result);
  } catch (err) {
    if (err instanceof CursorAgentError) {
      throw new Error(`CursorAgentError: ${err.message} (retryable=${err.isRetryable})`);
    }
    throw err;
  }
}

async function summarizePlainText(plain, sourceLabel, bundle, documentsSection = "") {
  const workCwd = await mkdtemp(join(tmpdir(), "cursor-iss-"));
  const attempts = Number.isFinite(MAX_ATTEMPTS) && MAX_ATTEMPTS > 0 ? MAX_ATTEMPTS : 3;
  let lastText = "";

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const message = buildMessage(plain, sourceLabel, bundle, {
      strictRetry: attempt > 1,
      documentsSection,
    });
    lastText = await callAgent(message, workCwd);
    if (isValidIssLesson(lastText)) {
      return lastText;
    }
    console.warn(
      `  AVISO: resposta inválida (tentativa ${attempt}/${attempts}) — meta-texto ou lição incompleta (${lastText.length} chars)`,
    );
  }

  throw new Error(
    `Após ${attempts} tentativas, o agente não devolveu lição ISS válida. ` +
      `Últimos chars: ${JSON.stringify(lastText.slice(0, 200))}…`,
  );
}

async function classifyVtt(vttPath, { vttCfg, lessons, allCataloged, lessonsFile }) {
  const rel = vttPath.slice(ROOT.length + 1).replace(/\\/g, "/");
  const folder = vttPath.split(/[/\\]/).slice(-2, -1)[0];
  const mapping = mapDownloadsFolder(folder, vttCfg);
  if (!mapping) {
    return { rel, skip: "unmap", mapping: null, parsed: null, pubState: null, contentOut: null };
  }
  const parsed = parseVttLesson(vttPath);
  if (!parsed) {
    return { rel, skip: "badname", mapping, parsed: null, pubState: null, contentOut: null };
  }
  const { discipline, contentDir } = mapping;
  const [pubState, , contentOut] = await lessonPublishState(
    ROOT,
    lessons,
    discipline,
    parsed.lesson,
    { contentDir },
  );

  if (!allCataloged) {
    if (pubState === "published" && !FORCE) {
      return { rel, skip: "published", mapping, parsed, pubState, contentOut };
    }
    return { rel, skip: null, mapping, parsed, pubState, contentOut };
  }

  if (pubState === "published" && !FORCE) {
    const docResult = await resolveDocumentContext(vttPath, ROOT, {
      maxTotalChars: DOC_MAX_CHARS,
      maxFileChars: DOC_FILE_CHARS,
    });
    const docCtx = docResult.ctx;
    const checkPaths = [
      ...ISS_BUNDLE_PATHS,
      ...(await contextPathsForMtime(docCtx)),
      lessonsFile,
    ];
    if (contentOut && !(await needsRun(vttPath, contentOut, checkPaths))) {
      return { rel, skip: "uptodate", mapping, parsed, pubState, contentOut };
    }
  }
  return { rel, skip: null, mapping, parsed, pubState, contentOut };
}

async function buildProcessingQueue(vtts, ctx) {
  const pending = [];
  let skippedCatalog = 0;
  let skippedUnmap = 0;

  for (const vttPath of vtts) {
    const info = await classifyVtt(vttPath, ctx);
    if (info.skip === "unmap") {
      console.log(`[vtt] Ignorar (sem mapeamento ISS): ${info.rel}`);
      skippedUnmap++;
      continue;
    }
    if (info.skip === "badname") {
      console.log(`[vtt] Ignorar (nome sem Aula_NN_-_DDMMYYYY): ${info.rel}`);
      skippedUnmap++;
      continue;
    }
    if (info.skip === "published") {
      console.log(
        `[vtt] Ignorar (já publicado): ${info.rel} → ${info.mapping.discipline} order=${info.parsed.lesson}`,
      );
      skippedCatalog++;
      continue;
    }
    if (info.skip === "uptodate") {
      console.log(`[vtt] Ignorar (conteúdo atualizado): ${info.rel}`);
      skippedCatalog++;
      continue;
    }
    if (info.pubState === "orphan") {
      const missing = info.contentOut
        ? info.contentOut.slice(ROOT.length + 1).replace(/\\/g, "/")
        : "?";
      console.log(`[vtt] A regenerar (ficheiro em falta): ${info.rel} → ${missing}`);
    }
    pending.push({ vttPath, ...info });
  }

  const slice = MAX_FILES === 0 ? pending : pending.slice(0, MAX_FILES);
  return { queue: slice, pendingCount: pending.length, skippedCatalog, skippedUnmap };
}

async function main() {
  if (!process.env.CURSOR_API_KEY?.trim()) {
    console.error("CURSOR_API_KEY em falta.");
    process.exit(1);
  }

  const bundle = await loadIssBundle();
  console.log(
    `Prompts ISS carregados: ${ISS_BUNDLE_PATHS.map((p) => p.replace(ROOT + "/", "").replace(/\\/g, "/")).join(", ")}`,
  );

  const vttCfg = await loadVttContentConfig(ROOT);
  const disciplines = await loadDisciplines(ROOT);
  const lessonsFile = lessonsPath(ROOT, vttCfg);
  let lessons = await loadLessons(lessonsFile);
  const allCataloged =
    process.env.TRANSCRIPT_SUMMARY_ALL_CATALOGED === "1" ||
    process.env.TRANSCRIPT_SUMMARY_ALL_CATALOGED === "true";
  console.log(
    `Catálogo ISS: ${lessonsFile.replace(ROOT + "/", "")} (${lessons.length} aulas)`,
  );

  const vtts = [];
  for await (const p of walkVtt(DOWNLOADS)) vtts.push(p);
  vtts.sort();

  if (vtts.length === 0) {
    console.warn(
      "[vtt] AVISO: nenhum .vtt em downloads/ — confirme que a pasta existe no repositório " +
        "(git ls-files 'downloads/**/*.vtt') e não está só em cópia local.",
    );
  }

  const { queue, pendingCount, skippedCatalog, skippedUnmap } = await buildProcessingQueue(
    vtts,
    { vttCfg, lessons, allCataloged, lessonsFile },
  );
  console.log(
    `VTT encontrados: ${vtts.length}; pendentes: ${pendingCount}; a processar: ${queue.length} ` +
      `(TRANSCRIPT_SUMMARY_MAX_FILES=${MAX_FILES === 0 ? "0=todos pendentes" : MAX_FILES})`,
  );

  let ok = 0;
  const failures = [];
  for (const item of queue) {
    const { vttPath, rel, mapping } = item;

    try {
      const docResult = await resolveDocumentContext(vttPath, ROOT, {
        maxTotalChars: DOC_MAX_CHARS,
        maxFileChars: DOC_FILE_CHARS,
      });
      logDocumentContextIndex(rel, docResult);
      const docCtx = docResult.ctx;
      const raw = await readFile(vttPath, "utf8");
      const plain = vttToPlain(raw);
      const docIncluded = docCtx?.index?.filter((e) => e.status === "included").length ?? 0;
      console.log(
        `[vtt] A gerar: ${rel} | transcrição ${plain.length.toLocaleString()} chars | docs no prompt: ${docIncluded}`,
      );
      const md = await summarizePlainText(plain, rel, bundle, docCtx?.promptSection ?? "");
      const {
        outPath,
        entry,
        lessonsChanged,
        searchChanged,
        lessons: nextLessons,
      } = await publishLessonMarkdown(ROOT, vttPath, md, vttCfg);
      lessons = nextLessons;
      const meta = [];
      if (lessonsChanged) meta.push("lessons.json");
      if (searchChanged) meta.push("search-index.json");
      const metaNote = meta.length ? ` | ${meta.join(", ")} atualizado(s)` : "";
      console.log(
        `Publicado: ${outPath.slice(ROOT.length + 1).replace(/\\/g, "/")} | ` +
          `${entry.discipline}/${entry.slug} order=${entry.order}${metaNote}`,
      );
      const discTitle = disciplineDisplayTitle(disciplines, entry.discipline);
      const notifyDesc = lessonNotifyDescription(md);
      console.log(`NotifyDiscord: ${discTitle}\t${entry.title}\t${notifyDesc}`);
      ok++;
    } catch (err) {
      const msg = err?.message || String(err);
      console.error(`[vtt] ERRO: ${rel}: ${msg}`);
      failures.push({ rel, error: msg });
    }
  }

  console.log(
    `Concluído. Publicados: ${ok} | falhas: ${failures.length} | ` +
      `ignorados (catálogo): ${skippedCatalog} | ignorados (sem mapa): ${skippedUnmap}`,
  );
  if (failures.length) {
    console.error("\n=== FALHAS ===");
    for (const f of failures) console.error(`  ${f.rel}: ${f.error}`);
  }
  if (failures.length && ok === 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
