#!/usr/bin/env bash
# Envia embed ao Discord (webhook). Requer DISCORD_WEBHOOK_URL.
set -euo pipefail

if [[ -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  echo "DISCORD_WEBHOOK_URL não definido — notificação omitida."
  exit 0
fi

STATUS="${JOB_STATUS:-unknown}"
case "$STATUS" in
  success) COLOR=5763719; TITLE="ISS — pipeline concluído" ;;
  failure) COLOR=15548997; TITLE="ISS — pipeline falhou" ;;
  cancelled) COLOR=9807270; TITLE="ISS — pipeline cancelado" ;;
  *) COLOR=9807270; TITLE="ISS — pipeline ($STATUS)" ;;
esac

PIPELINE_SUMMARY="${PIPELINE_SUMMARY:-—}"
COMMIT_INFO="${COMMIT_INFO:-—}"
RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
EVENT="${GITHUB_EVENT_NAME}"
if [[ "$EVENT" == "workflow_dispatch" ]]; then
  EVENT="${EVENT} (max_files=${MAX_FILES:-?}, force=${FORCE_FLAG:-?})"
fi

PAYLOAD="$(jq -n \
  --arg title "$TITLE" \
  --argjson color "$COLOR" \
  --arg repo "${GITHUB_REPOSITORY}" \
  --arg branch "${GITHUB_REF_NAME}" \
  --arg event "$EVENT" \
  --arg summary "$PIPELINE_SUMMARY" \
  --arg commit "$COMMIT_INFO" \
  --arg url "$RUN_URL" \
  '{
    embeds: [{
      title: $title,
      color: $color,
      fields: [
        {name: "Repositório", value: ("`" + $repo + "`"), inline: true},
        {name: "Branch", value: ("`" + $branch + "`"), inline: true},
        {name: "Disparo", value: $event, inline: true},
        {name: "VTT → content", value: $summary, inline: false},
        {name: "Git", value: $commit, inline: false},
        {name: "Actions", value: ("[Abrir run](" + $url + ")"), inline: false}
      ],
      timestamp: (now | strftime("%Y-%m-%dT%H:%M:%SZ"))
    }]
  }')"

curl -fsS -X POST "$DISCORD_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"

echo "Notificação Discord enviada."
