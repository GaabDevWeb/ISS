#!/usr/bin/env bash
# Notificação Discord (webhook). Secret: DISCORD_WEBHOOK_URL
set -euo pipefail

if [[ -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  echo "DISCORD_WEBHOOK_URL não definido — notificação omitida."
  exit 0
fi

# Emojis custom (servidor Discord) e cargo a mencionar (spoiler)
EMOJI_NOTEPAD="<:notepad:1469775431237501083>"
EMOJI_OK="<:ok:1469777983463231541>"
EMOJI_ARROW="<:arrow:1466040382138876061>"
EMOJI_COFFEE="<:coffeepikachu:1469777951867273216>"
EMOJI_SMILE="<:smile:1466314368474943539>"
ROLE_ID="1465931358609215520"
ISS_URL="https://gaabdevweb.github.io/ISS/"

STATUS="${JOB_STATUS:-unknown}"
PIPELINE_SUMMARY="${PIPELINE_SUMMARY:-}"
COMMIT_INFO="${COMMIT_INFO:-}"
RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"

PUBLISHED=0
if [[ "$PIPELINE_SUMMARY" =~ Publicados:\ ([0-9]+) ]]; then
  PUBLISHED="${BASH_REMATCH[1]}"
fi

post_discord() {
  local payload="$1"
  curl -fsS -X POST "$DISCORD_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "$payload"
}

# —— Sucesso com lições novas: mensagem pedida + ping ao cargo ——
if [[ "$STATUS" == "success" && "$PUBLISHED" -gt 0 ]]; then
  DESCRIPTION="${EMOJI_NOTEPAD} **Transcrição disponível!**
A última aula já foi transcrita e adicionada ao projeto de resumos ${EMOJI_OK}

${EMOJI_ARROW} ${ISS_URL}

Pra quem perdeu, pra quem quer revisar, ou pra quem piscou na hora errada ${EMOJI_COFFEE} ${EMOJI_SMILE}"

  if [[ -n "${LAST_PUBLISHED:-}" ]]; then
    DESCRIPTION="${DESCRIPTION}

\`${LAST_PUBLISHED}\`"
  fi

  if [[ -n "$PIPELINE_SUMMARY" ]]; then
    DESCRIPTION="${DESCRIPTION}

_${PIPELINE_SUMMARY}_"
  fi

  if [[ -n "$COMMIT_INFO" && "$COMMIT_INFO" != "—" ]]; then
    DESCRIPTION="${DESCRIPTION}
_${COMMIT_INFO}_"
  fi

  PAYLOAD="$(jq -n \
    --arg content "||<@&${ROLE_ID}>||" \
    --arg role "$ROLE_ID" \
    --arg desc "$DESCRIPTION" \
    --arg url "$RUN_URL" \
    '{
      content: $content,
      allowed_mentions: { parse: [], roles: [$role] },
      embeds: [{
        description: $desc,
        color: 5763719,
        footer: { text: "ISS · pipeline automático" },
        fields: [{ name: "Log do workflow", value: ("[Abrir no Actions](" + $url + ")") }]
      }]
    }')"

  post_discord "$PAYLOAD"
  echo "Notificação Discord (transcrição disponível) enviada."
  exit 0
fi

# —— Sucesso sem publicações: sem ping ——
if [[ "$STATUS" == "success" ]]; then
  DESCRIPTION="Nenhuma aula nova nesta execução."
  [[ -n "$PIPELINE_SUMMARY" ]] && DESCRIPTION="${DESCRIPTION}

_${PIPELINE_SUMMARY}_"

  PAYLOAD="$(jq -n \
    --arg desc "$DESCRIPTION" \
    --arg url "$RUN_URL" \
    '{
      embeds: [{
        title: "ISS — pipeline concluído",
        description: $desc,
        color: 9807270,
        fields: [{ name: "Actions", value: ("[Abrir run](" + $url + ")") }]
      }]
    }')"
  post_discord "$PAYLOAD"
  echo "Notificação Discord (sem novidades) enviada."
  exit 0
fi

# —— Falha ou cancelado ——
case "$STATUS" in
  failure) COLOR=15548997; TITLE="ISS — pipeline falhou" ;;
  cancelled) COLOR=9807270; TITLE="ISS — pipeline cancelado" ;;
  *) COLOR=9807270; TITLE="ISS — pipeline ($STATUS)" ;;
esac

DETAIL="${PIPELINE_SUMMARY:-Ver o log no Actions.}"
[[ -n "$COMMIT_INFO" && "$COMMIT_INFO" != "—" ]] && DETAIL="${DETAIL}

${COMMIT_INFO}"

PAYLOAD="$(jq -n \
  --arg title "$TITLE" \
  --argjson color "$COLOR" \
  --arg detail "$DETAIL" \
  --arg url "$RUN_URL" \
  '{
    embeds: [{
      title: $title,
      description: $detail,
      color: $color,
      fields: [{ name: "Actions", value: ("[Abrir run](" + $url + ")") }]
    }]
  }')"

post_discord "$PAYLOAD"
echo "Notificação Discord ($STATUS) enviada."
