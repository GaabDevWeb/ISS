#!/usr/bin/env node
/**
 * Job 4 — tripla verificação pós-sync: SSOT (validate-report), MySQL, RAM (/health/catalog).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const REPORT_DIR = join(ROOT, ".github/reports");
const VALIDATE_PATH = join(REPORT_DIR, "validate-report.json");
const RELOAD_PATH = join(REPORT_DIR, "reload-report.json");
const VERIFY_PATH = join(REPORT_DIR, "verify-report.json");

const MYSQL_COUNT_PY = `
import os, sys
import pymysql
import pymysql.cursors

sql = (
    "SELECT COUNT(DISTINCT discipline, slug) AS n FROM knowledge "
    "WHERE active = 1 AND content IS NOT NULL AND TRIM(content) <> ''"
)

host = os.environ.get("DB_HOST", "").strip()
name = os.environ.get("DB_NAME", "").strip()
user = os.environ.get("DB_USER", "").strip()
password = os.environ.get("DB_PASSWORD", "")
port = int(os.environ.get("DB_PORT", "3306") or "3306")

missing = [k for k, v in [("DB_HOST", host), ("DB_NAME", name), ("DB_USER", user)] if not v]
if missing:
    print(f"missing env: {', '.join(missing)}", file=sys.stderr)
    sys.exit(2)

try:
    conn = pymysql.connect(
        host=host, port=port, database=name, user=user, password=password,
        charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor,
        connect_timeout=10, read_timeout=30,
    )
    with conn:
        with conn.cursor() as cur:
            cur.execute(sql)
            row = cur.fetchone()
    print(int(row["n"]))
except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)
`;

/** @returns {string} */
function resolveHealthCatalogUrl() {
  const explicit = (process.env.KERNELBOT_HEALTH_URL || "").trim();
  if (explicit) return explicit;

  const chatUrl = (process.env.KERNELBOT_CHAT_URL || "").trim();
  if (!chatUrl) return "";

  if (chatUrl.endsWith("/chat")) {
    return `${chatUrl.slice(0, -"/chat".length)}/health/catalog`;
  }
  const base = chatUrl.replace(/\/chat\/?$/, "");
  return `${base}/health/catalog`;
}

function readJson(path, label) {
  if (!existsSync(path)) {
    return { ok: false, error: `${label} ausente: ${path}`, data: null };
  }
  try {
    return { ok: true, error: null, data: JSON.parse(readFileSync(path, "utf8")) };
  } catch (err) {
    return { ok: false, error: `${label} JSON inválido: ${err.message}`, data: null };
  }
}

function queryMysqlCount() {
  const result = spawnSync("python3", ["-c", MYSQL_COUNT_PY], {
    env: process.env,
    encoding: "utf8",
    timeout: 60_000,
  });

  if (result.error) {
    return { ok: false, count: null, error: result.error.message };
  }
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim() || `exit ${result.status}`;
    return { ok: false, count: null, error: detail };
  }

  const n = Number.parseInt(String(result.stdout).trim(), 10);
  if (!Number.isFinite(n) || n < 0) {
    return { ok: false, count: null, error: `COUNT inválido: ${result.stdout}` };
  }
  return { ok: true, count: n, error: null };
}

/** @param {string} url @param {string} token */
async function fetchHealthCatalog(url, token) {
  if (!url) {
    return { ok: false, httpStatus: null, body: null, error: "URL /health/catalog não resolvida" };
  }
  if (!token) {
    return { ok: false, httpStatus: null, body: null, error: "KERNELBOT_RELOAD_TOKEN ausente" };
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(30_000),
    });

    const httpStatus = res.status;
    let body = null;
    try {
      body = await res.json();
    } catch {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        httpStatus,
        body: null,
        error: `Resposta não-JSON (HTTP ${httpStatus}): ${text.slice(0, 300)}`,
      };
    }

    if (httpStatus !== 200) {
      const detail =
        typeof body?.detail === "string"
          ? body.detail
          : `HTTP ${httpStatus}`;
      return { ok: false, httpStatus, body, error: detail };
    }

    return { ok: true, httpStatus, body, error: null };
  } catch (err) {
    return {
      ok: false,
      httpStatus: null,
      body: null,
      error: err?.message || String(err),
    };
  }
}

function writeVerifyReport(report) {
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(VERIFY_PATH, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(`Relatório: ${VERIFY_PATH}`);
}

async function main() {
  const failures = [];
  const gates = {
    static_ssot: { pass: false, detail: null },
    mysql: { pass: false, detail: null },
    ram_health: { pass: false, detail: null },
    reload_report: { pass: true, checked: false, detail: null },
  };

  let expectedLessonCount = null;
  let validatedKeysCount = null;

  const validate = readJson(VALIDATE_PATH, "validate-report");
  if (!validate.ok) {
    failures.push(validate.error);
    gates.static_ssot.detail = validate.error;
  } else {
    const vr = validate.data;
    if (vr.success !== true) {
      const msg = "validate-report.success !== true";
      failures.push(msg);
      gates.static_ssot.detail = msg;
    } else if (typeof vr.lesson_count !== "number") {
      const msg = "validate-report.lesson_count ausente ou inválido";
      failures.push(msg);
      gates.static_ssot.detail = msg;
    } else if (!Array.isArray(vr.validated_keys)) {
      const msg = "validate-report.validated_keys ausente ou não é array";
      failures.push(msg);
      gates.static_ssot.detail = msg;
    } else {
      expectedLessonCount = vr.lesson_count;
      validatedKeysCount = vr.validated_keys.length;
      gates.static_ssot.pass = true;
      gates.static_ssot.detail = {
        lesson_count: expectedLessonCount,
        validated_keys_count: validatedKeysCount,
      };

      if (validatedKeysCount !== expectedLessonCount) {
        const msg = `validated_keys.length (${validatedKeysCount}) !== lesson_count (${expectedLessonCount})`;
        failures.push(msg);
        gates.static_ssot.pass = false;
        gates.static_ssot.detail = msg;
      }
    }
  }

  let mysqlCount = null;
  if (expectedLessonCount === null) {
    failures.push("MySQL: pulado — lesson_count esperado indisponível");
    gates.mysql.detail = "skipped — no expected count";
  } else {
    const mysql = queryMysqlCount();
    if (!mysql.ok) {
      failures.push(`MySQL: ${mysql.error}`);
      gates.mysql.detail = mysql.error;
    } else {
      mysqlCount = mysql.count;
      gates.mysql.detail = { mysql_count: mysqlCount, expected: expectedLessonCount };
      if (mysqlCount !== expectedLessonCount) {
        failures.push(
          `MySQL: mysql_count (${mysqlCount}) !== lesson_count esperado (${expectedLessonCount})`,
        );
      } else {
        gates.mysql.pass = true;
      }
    }
  }

  const healthUrl = resolveHealthCatalogUrl();
  const token = (process.env.KERNELBOT_RELOAD_TOKEN || "").trim();
  const health = await fetchHealthCatalog(healthUrl, token);

  let indexedLessonKeysCount = null;
  let catalogOnlyCount = null;
  let catalogOnlySample = null;

  if (!health.ok) {
    failures.push(`RAM /health/catalog: ${health.error}`);
    gates.ram_health.detail = health.error;
  } else {
    const body = health.body;
    indexedLessonKeysCount = body.indexed_lesson_keys_count;
    catalogOnlyCount = body.catalog_only_count;
    catalogOnlySample = body.catalog_only_sample ?? null;

    gates.ram_health.detail = {
      health_url: healthUrl,
      http_status: health.httpStatus,
      indexed_lesson_keys_count: indexedLessonKeysCount,
      catalog_only_count: catalogOnlyCount,
      catalog_only_sample: catalogOnlySample,
      catalog_enabled: body.catalog_enabled,
      catalog_lesson_keys_count: body.catalog_lesson_keys_count,
    };

    if (expectedLessonCount !== null && indexedLessonKeysCount !== expectedLessonCount) {
      failures.push(
        `RAM: indexed_lesson_keys_count (${indexedLessonKeysCount}) !== lesson_count esperado (${expectedLessonCount})`,
      );
    }

    if (catalogOnlyCount === undefined || catalogOnlyCount === null) {
      failures.push("RAM: catalog_only_count ausente na resposta");
    } else if (catalogOnlyCount > 0) {
      failures.push(
        `RAM: catalog_only_count (${catalogOnlyCount}) > 0 — drift (amostra: ${JSON.stringify(catalogOnlySample)})`,
      );
    }

    if (
      expectedLessonCount !== null &&
      indexedLessonKeysCount === expectedLessonCount &&
      typeof catalogOnlyCount === "number" &&
      catalogOnlyCount === 0
    ) {
      gates.ram_health.pass = true;
    }
  }

  if (existsSync(RELOAD_PATH)) {
    gates.reload_report.checked = true;
    const reload = readJson(RELOAD_PATH, "reload-report");
    if (!reload.ok) {
      failures.push(reload.error);
      gates.reload_report.pass = false;
      gates.reload_report.detail = reload.error;
    } else {
      const rr = reload.data;
      gates.reload_report.detail = {
        success: rr.success,
        keys_refresh_failed: rr.keys_refresh_failed,
      };
      if (rr.success === false) {
        failures.push("reload-report.success === false");
        gates.reload_report.pass = false;
      }
      if (rr.keys_refresh_failed === true) {
        failures.push("reload-report.keys_refresh_failed === true");
        gates.reload_report.pass = false;
      }
    }
  }

  const success = failures.length === 0;

  const report = {
    timestamp: new Date().toISOString(),
    success,
    expected_lesson_count: expectedLessonCount,
    validated_keys_count: validatedKeysCount,
    mysql_count: mysqlCount,
    health_url: healthUrl || null,
    health_http_status: health.httpStatus,
    indexed_lesson_keys_count: indexedLessonKeysCount,
    catalog_only_count: catalogOnlyCount,
    catalog_only_sample: catalogOnlySample,
    gates,
    failures,
  };

  writeVerifyReport(report);

  if (success) {
    console.log(
      `Verificação OK — esperado=${expectedLessonCount}, mysql=${mysqlCount}, indexed=${indexedLessonKeysCount}, catalog_only=${catalogOnlyCount}`,
    );
    process.exit(0);
  }

  console.error(`Verificação falhou (${failures.length} problema(s)):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

main();
