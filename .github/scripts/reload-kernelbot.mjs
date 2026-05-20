#!/usr/bin/env node
/**
 * Dispara POST /chat com message "/reload" no KernelBot (SSE) após ingest CI.
 * Falha se o stream indicar que as chaves de catálogo não foram atualizadas.
 *
 * SSE: corpo via fetch ReadableStream — res.body.getReader() + TextDecoder.
 * Não usar response.setEncoding (inexistente na API fetch do Node).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const REPORT_DIR = join(ROOT, ".github/reports");
const REPORT_PATH = join(REPORT_DIR, "reload-report.json");

const BACKOFF_MS = [5_000, 15_000, 45_000];
const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 120_000;

const CHUNK_COUNT_RE = /Índice reconstruído:\s*(\d+)\s*chunk/i;
const KEYS_FAIL_PATTERNS = [
  "chaves de catálogo não atualizadas",
  "NÃO foram atualizadas",
];

/** @param {string} url @param {string} token @param {string} sessionId @param {AbortSignal} signal */
async function consumeReloadStream(url, token, sessionId, signal) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "/reload",
      session_id: sessionId,
    }),
    signal,
  });

  const httpStatus = res.status;
  if (!res.ok) {
    let detail = `HTTP ${httpStatus}`;
    try {
      const err = await res.json();
      if (typeof err.detail === "string") detail = err.detail;
      else if (Array.isArray(err.detail))
        detail = err.detail.map((d) => d.msg || String(d)).join("; ");
    } catch {
      try {
        detail = (await res.text()).slice(0, 500) || detail;
      } catch {
        /* ignore */
      }
    }
    return {
      ok: false,
      httpStatus,
      error: detail,
      doneReceived: false,
      keysRefreshFailed: false,
      chunkCountParsed: null,
      rawStatusLine: null,
    };
  }

  if (!res.body) {
    return {
      ok: false,
      httpStatus,
      error: "Resposta sem corpo (ReadableStream ausente)",
      doneReceived: false,
      keysRefreshFailed: false,
      chunkCountParsed: null,
      rawStatusLine: null,
    };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";
  let doneReceived = false;
  let rawStatusLine = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6);

      if (payload === "[DONE]") {
        doneReceived = true;
        break;
      }

      if (payload.startsWith("[ERROR]")) {
        return {
          ok: false,
          httpStatus,
          error: payload.slice(8).trim() || "Stream [ERROR]",
          doneReceived,
          keysRefreshFailed: false,
          chunkCountParsed: null,
          rawStatusLine,
        };
      }

      fullText += payload.replace(/\\n/g, "\n");
      if (!rawStatusLine && payload.includes("Índice reconstruído")) {
        rawStatusLine = payload.replace(/\\n/g, "\n");
      }
    }

    if (doneReceived) break;
  }

  buffer += decoder.decode(undefined, { stream: false });
  for (const line of buffer.split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const payload = line.slice(6);
    if (payload === "[DONE]") doneReceived = true;
    else if (!payload.startsWith("[ERROR]")) fullText += payload.replace(/\\n/g, "\n");
  }

  const keysRefreshFailed = KEYS_FAIL_PATTERNS.some((p) => fullText.includes(p));
  const chunkMatch = fullText.match(CHUNK_COUNT_RE);
  const chunkCountParsed = chunkMatch ? Number.parseInt(chunkMatch[1], 10) : null;

  if (keysRefreshFailed) {
    return {
      ok: false,
      httpStatus,
      error: "Chaves de catálogo não atualizadas (detectado no stream)",
      doneReceived,
      keysRefreshFailed: true,
      chunkCountParsed,
      rawStatusLine: rawStatusLine ?? (fullText.slice(0, 500) || null),
    };
  }

  if (!doneReceived) {
    return {
      ok: false,
      httpStatus,
      error: "Stream encerrado sem [DONE]",
      doneReceived: false,
      keysRefreshFailed: false,
      chunkCountParsed,
      rawStatusLine,
    };
  }

  return {
    ok: true,
    httpStatus,
    error: null,
    doneReceived: true,
    keysRefreshFailed: false,
    chunkCountParsed,
    rawStatusLine,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function writeReport(report) {
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(`Relatório: ${REPORT_PATH}`);
}

async function main() {
  const url = (process.env.KERNELBOT_CHAT_URL || "").trim();
  const token = (process.env.KERNELBOT_RELOAD_TOKEN || "").trim();
  const runId = (process.env.GITHUB_RUN_ID || "local").trim();
  const sessionId = `ci-sync-${runId}`;

  const errors = [];
  let success = false;
  let httpStatus = null;
  let attempts = 0;
  let doneReceived = false;
  let chunkCountParsed = null;
  let keysRefreshFailed = false;
  let rawStatusLine = null;

  if (!url) {
    errors.push("KERNELBOT_CHAT_URL ausente");
    writeReport({
      timestamp: new Date().toISOString(),
      success: false,
      http_status: null,
      attempts: 0,
      done_received: false,
      chunk_count_parsed: null,
      keys_refresh_failed: false,
      raw_status_line: null,
      errors,
    });
    process.exit(1);
  }

  if (!token) {
    errors.push("KERNELBOT_RELOAD_TOKEN ausente");
    writeReport({
      timestamp: new Date().toISOString(),
      success: false,
      http_status: null,
      attempts: 0,
      done_received: false,
      chunk_count_parsed: null,
      keys_refresh_failed: false,
      raw_status_line: null,
      errors,
    });
    process.exit(1);
  }

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    attempts = i + 1;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      console.log(`Tentativa ${attempts}/${MAX_ATTEMPTS} — POST ${url} (session ${sessionId})`);
      const result = await consumeReloadStream(url, token, sessionId, controller.signal);
      httpStatus = result.httpStatus;
      doneReceived = result.doneReceived;
      chunkCountParsed = result.chunkCountParsed;
      keysRefreshFailed = result.keysRefreshFailed;
      rawStatusLine = result.rawStatusLine;

      if (result.ok) {
        success = true;
        console.log(
          `Reload OK — HTTP ${httpStatus}, chunks=${chunkCountParsed ?? "?"}, [DONE]=${doneReceived}`,
        );
        break;
      }

      errors.push(`tentativa ${attempts}: ${result.error}`);
      console.error(`Tentativa ${attempts} falhou: ${result.error}`);
    } catch (err) {
      const msg =
        err?.name === "AbortError"
          ? `timeout após ${REQUEST_TIMEOUT_MS}ms`
          : err?.message || String(err);
      errors.push(`tentativa ${attempts}: ${msg}`);
      console.error(`Tentativa ${attempts} exceção: ${msg}`);
    } finally {
      clearTimeout(timeoutId);
    }

    if (i < MAX_ATTEMPTS - 1) {
      const wait = BACKOFF_MS[i] ?? BACKOFF_MS[BACKOFF_MS.length - 1];
      console.log(`Aguardando ${wait / 1000}s antes da próxima tentativa...`);
      await sleep(wait);
    }
  }

  writeReport({
    timestamp: new Date().toISOString(),
    success,
    http_status: httpStatus,
    attempts,
    done_received: doneReceived,
    chunk_count_parsed: chunkCountParsed,
    keys_refresh_failed: keysRefreshFailed,
    raw_status_line: rawStatusLine,
    errors,
  });

  process.exit(success ? 0 : 1);
}

main();
