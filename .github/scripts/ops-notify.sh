#!/usr/bin/env bash
# Notificação Discord (canal ops) — falhas no pipeline kernelbot-sync.
# Secret: DISCORD_WEBHOOK_URL (mesmo webhook; omitido se ausente).
set -euo pipefail

if [[ -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  echo "DISCORD_WEBHOOK_URL não definido — notificação ops omitida."
  exit 0
fi

STATUS="${JOB_STATUS:-unknown}"
PIPELINE="${PIPELINE_PHASE:-kernelbot-sync}"
REPORTS_DIR=".github/reports"

# Sucesso: sair em silêncio (sem ping no canal ops).
if [[ "$STATUS" == "success" ]]; then
  echo "Pipeline OK — notificação ops omitida."
  exit 0
fi

VALIDATE_REPORT="${REPORTS_DIR}/validate-report.json"
INGEST_REPORT="${REPORTS_DIR}/ingest-report.json"
RELOAD_REPORT="${REPORTS_DIR}/reload-report.json"
VERIFY_REPORT="${REPORTS_DIR}/verify-report.json"

post_discord() {
  local payload="$1"
  curl -fsS -X POST "$DISCORD_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "$payload"
}

# —— Gates que falharam (relatório JSON e/ou result do job GHA) ——
FAILED_GATES=()

report_gate_failed() {
  local gate="$1"
  local path="$2"
  local jq_test="${3:-.success != true}"

  if [[ ! -f "$path" ]]; then
    return 1
  fi
  if ! jq -e "$jq_test" "$path" >/dev/null 2>&1; then
    return 1
  fi
  FAILED_GATES+=("$gate")
  return 0
}

job_gate_failed() {
  local gate="$1"
  local result_var="NEEDS_${gate^^}"
  local result="${!result_var:-}"
  [[ "$result" == "failure" ]]
}

gate_already_listed() {
  local g="$1"
  local x
  for x in "${FAILED_GATES[@]}"; do
    [[ "$x" == "$g" ]] && return 0
  done
  return 1
}

add_gate_if_failed() {
  local gate="$1"
  local path="$2"
  local jq_test="${3:-.success != true}"

  gate_already_listed "$gate" && return 0

  if report_gate_failed "$gate" "$path" "$jq_test"; then
    return 0
  fi
  if job_gate_failed "$gate"; then
    FAILED_GATES+=("$gate")
  fi
}

add_gate_if_failed validate "$VALIDATE_REPORT"
add_gate_if_failed ingest "$INGEST_REPORT"
add_gate_if_failed reload "$RELOAD_REPORT" \
  '(.success != true) or (.keys_refresh_failed == true)'
add_gate_if_failed verify "$VERIFY_REPORT"

# verify-report pode citar falhas em gates anteriores
if [[ -f "$VERIFY_REPORT" ]]; then
  while IFS= read -r hint; do
    [[ -z "$hint" ]] && continue
    case "$hint" in
      *validate-report*|*validate.report*|*static_ssot*)
        gate_already_listed validate || FAILED_GATES+=("validate")
        ;;
      *reload-report*|*reload.report*)
        gate_already_listed reload || FAILED_GATES+=("reload")
        ;;
      *MySQL*|*mysql*)
        gate_already_listed ingest || FAILED_GATES+=("ingest")
        ;;
    esac
  done < <(jq -r '.failures[]? // empty' "$VERIFY_REPORT" 2>/dev/null || true)
fi

if [[ ${#FAILED_GATES[@]} -eq 0 ]]; then
  FAILED_GATES+=("unknown")
fi

GATES_LINE=$(IFS=', '; echo "${FAILED_GATES[*]}")

# —— Contagens do verify-report ——
COUNTS_BLOCK=""
if [[ -f "$VERIFY_REPORT" ]]; then
  COUNTS_BLOCK="$(jq -r '
    [
      (if .expected_lesson_count != null then "expected_lesson_count: \(.expected_lesson_count)" else empty end),
      (if .mysql_count != null then "mysql_count: \(.mysql_count)" else empty end),
      (if .indexed_lesson_keys_count != null then "indexed_lesson_keys_count: \(.indexed_lesson_keys_count)" else empty end),
      (if .catalog_only_count != null then "catalog_only_count: \(.catalog_only_count)" else empty end)
    ] | if length > 0 then join("\n") else empty end
  ' "$VERIFY_REPORT" 2>/dev/null || true)"
fi

# —— Resumos de erro por relatório ——
DETAILS=""
append_report_errors() {
  local label="$1"
  local path="$2"
  local field="${3:-errors}"

  [[ -f "$path" ]] || return 0
  local snippet
  snippet="$(jq -r --arg f "$field" --arg lbl "$label" '
    (.[$f] // .failures // []) | if type == "array" and length > 0 then
      "**\($lbl):**\n" + ([.[] | "• " + (. | tostring)] | .[0:5] | join("\n"))
    else empty end
  ' "$path" 2>/dev/null || true)"
  if [[ -n "$snippet" ]]; then
    if [[ -n "$DETAILS" ]]; then
      DETAILS="${DETAILS}

${snippet}"
    else
      DETAILS="$snippet"
    fi
  fi
}

append_report_errors validate "$VALIDATE_REPORT"
append_report_errors ingest "$INGEST_REPORT"
append_report_errors reload "$RELOAD_REPORT"
append_report_errors verify "$VERIFY_REPORT" failures

# —— Link da execução no Actions ——
RUN_URL=""
if [[ -n "${GITHUB_SERVER_URL:-}" && -n "${GITHUB_REPOSITORY:-}" && -n "${GITHUB_RUN_ID:-}" ]]; then
  RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
fi

case "$STATUS" in
  failure)
    TITLE="KernelBot sync — falha"
    EMBED_COLOR=15548997
    ;;
  cancelled)
    TITLE="KernelBot sync — cancelado"
    EMBED_COLOR=9807270
    ;;
  *)
    TITLE="KernelBot sync — ${STATUS}"
    EMBED_COLOR=9807270
    ;;
esac

MESSAGE="**${TITLE}**
Pipeline: \`${PIPELINE}\`
Status: \`${STATUS}\`

**Gates com falha:** ${GATES_LINE}"

if [[ -n "$COUNTS_BLOCK" ]]; then
  MESSAGE="${MESSAGE}

**Contagens (verify):**
\`\`\`
${COUNTS_BLOCK}
\`\`\`"
fi

if [[ -n "$DETAILS" ]]; then
  MESSAGE="${MESSAGE}

${DETAILS}"
fi

if [[ -n "$RUN_URL" ]]; then
  MESSAGE="${MESSAGE}

🔗 [Abrir execução no Actions](${RUN_URL})"
fi

PAYLOAD="$(jq -n \
  --arg desc "$MESSAGE" \
  --argjson color "$EMBED_COLOR" \
  '{ embeds: [{ description: $desc, color: $color }] }')"

post_discord "$PAYLOAD"
echo "Notificação ops Discord (${STATUS}) enviada."
