#!/usr/bin/env bash
# Notificação Discord (webhook). Secret: DISCORD_WEBHOOK_URL
set -euo pipefail

if [[ -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  echo "DISCORD_WEBHOOK_URL não definido — notificação omitida."
  exit 0
fi

# Emojis custom (servidor Discord) e cargo a mencionar (spoiler)
EMOJI_NOTEPAD="<:notepad:1469775431237501083>"
EMOJI_COFFEE="<:coffeepikachu:1469777951867273216>"
ROLE_ID="1465931358609215520"
ISS_URL="https://gaabdevweb.github.io/ISS/"

STATUS="${JOB_STATUS:-unknown}"
PIPELINE_SUMMARY="${PIPELINE_SUMMARY:-}"
LAST_DISCIPLINE_TITLE="${LAST_DISCIPLINE_TITLE:-}"
LAST_LESSON_TITLE="${LAST_LESSON_TITLE:-}"

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

# —— Sucesso com lições novas: mensagem para alunos + ping ao cargo ——
if [[ "$STATUS" == "success" && "$PUBLISHED" -gt 0 ]]; then
  if [[ -n "$LAST_DISCIPLINE_TITLE" ]]; then
    BODY="A última aula de **${LAST_DISCIPLINE_TITLE}** já está disponível no site com resumo estruturado, conceitos organizados e exemplos práticos."
  else
    BODY="A última aula processada já está disponível no site com resumo estruturado, conceitos organizados e exemplos práticos."
  fi

  MESSAGE="${EMOJI_NOTEPAD} **Novo conteúdo publicado no ISS**

${BODY}"

  if [[ -n "$LAST_LESSON_TITLE" ]]; then
    MESSAGE="${MESSAGE}

» ${LAST_LESSON_TITLE}"
  fi

  MESSAGE="${MESSAGE}

🔗 ${ISS_URL}

${EMOJI_COFFEE} Pra revisar rápido, recuperar uma aula perdida ou consultar depois."

  PAYLOAD="$(jq -n \
    --arg content "||<@&${ROLE_ID}>||

${MESSAGE}" \
    --arg role "$ROLE_ID" \
    '{
      content: $content,
      allowed_mentions: { parse: [], roles: [$role] }
    }')"

  post_discord "$PAYLOAD"
  echo "Notificação Discord enviada."
  exit 0
fi

# —— Sucesso sem publicações: não incomodar o canal ——
if [[ "$STATUS" == "success" ]]; then
  echo "Nenhuma aula nova — notificação omitida."
  exit 0
fi

# —— Falha ou cancelado (texto simples, sem embed de Actions) ——
case "$STATUS" in
  failure)
    MESSAGE="Não foi possível publicar conteúdo novo no ISS desta vez. Se persistir, avisa no servidor."
    ;;
  cancelled)
    MESSAGE="A atualização do ISS foi cancelada antes de terminar."
    ;;
  *)
    MESSAGE="A atualização do ISS não concluiu (${STATUS})."
    ;;
esac

PAYLOAD="$(jq -n --arg content "$MESSAGE" '{ content: $content }')"
post_discord "$PAYLOAD"
echo "Notificação Discord ($STATUS) enviada."
