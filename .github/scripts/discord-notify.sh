#!/usr/bin/env bash
# Notificação Discord (webhook). Secret: DISCORD_WEBHOOK_URL
set -euo pipefail

if [[ -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  echo "DISCORD_WEBHOOK_URL não definido — notificação omitida."
  exit 0
fi

# Emojis custom (servidor Discord): em content usa <:nome:id>; em embed usa CDN com o id
EMOJI_NOTEPAD_NAME="notepad"
EMOJI_NOTEPAD_ID="1469775431237501083"
EMOJI_COFFEE_NAME="coffeepikachu"
EMOJI_COFFEE_ID="1469777951867273216"
EMOJI_NOTEPAD="<:${EMOJI_NOTEPAD_NAME}:${EMOJI_NOTEPAD_ID}>"
EMOJI_COFFEE="<:${EMOJI_COFFEE_NAME}:${EMOJI_COFFEE_ID}>"
EMOJI_NOTEPAD_URL="https://cdn.discordapp.com/emojis/${EMOJI_NOTEPAD_ID}.png"
EMOJI_COFFEE_URL="https://cdn.discordapp.com/emojis/${EMOJI_COFFEE_ID}.png"
ROLE_ID="1465931358609215520"
ISS_URL="https://gaabdevweb.github.io/ISS/"

STATUS="${JOB_STATUS:-unknown}"
PIPELINE_SUMMARY="${PIPELINE_SUMMARY:-}"
LAST_DISCIPLINE_TITLE="${LAST_DISCIPLINE_TITLE:-}"
LAST_LESSON_TITLE="${LAST_LESSON_TITLE:-}"
LAST_LESSON_DESCRIPTION="${LAST_LESSON_DESCRIPTION:-}"

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
  # Emojis custom em content (renderizam com <:nome:id>)
  CONTENT="||<@&${ROLE_ID}>||
${EMOJI_NOTEPAD} **Conteúdo novo acabou de cair no ISS**"

  EMBED_DESC=""

  if [[ -n "$LAST_DISCIPLINE_TITLE" ]]; then
    EMBED_DESC="${LAST_DISCIPLINE_TITLE}"
  fi

  if [[ -n "$LAST_LESSON_TITLE" ]]; then
    if [[ -n "$EMBED_DESC" ]]; then
      EMBED_DESC="${EMBED_DESC}
» ${LAST_LESSON_TITLE}"
    else
      EMBED_DESC="» ${LAST_LESSON_TITLE}"
    fi
  fi

  if [[ -n "$LAST_LESSON_DESCRIPTION" ]]; then
    if [[ -n "$EMBED_DESC" ]]; then
      EMBED_DESC="${EMBED_DESC}

${LAST_LESSON_DESCRIPTION}"
    else
      EMBED_DESC="${LAST_LESSON_DESCRIPTION}"
    fi
  fi

  if [[ -n "$EMBED_DESC" ]]; then
    EMBED_DESC="${EMBED_DESC}

"
  fi
  EMBED_DESC="${EMBED_DESC}${ISS_URL}"

  PAYLOAD="$(jq -n \
    --arg content "$CONTENT" \
    --arg role "$ROLE_ID" \
    --arg desc "$EMBED_DESC" \
    --arg author_icon "$EMOJI_NOTEPAD_URL" \
    --arg footer_icon "$EMOJI_COFFEE_URL" \
    --arg footer_text "Tudo organizadinho pra consultar depois sem sofrer no AVA." \
    '{
      content: $content,
      allowed_mentions: { parse: [], roles: [$role] },
      embeds: [{
        author: { name: "ISS", icon_url: $author_icon },
        description: $desc,
        footer: { text: $footer_text, icon_url: $footer_icon },
        color: 5763719
      }]
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
    EMBED_COLOR=15548997
    ;;
  cancelled)
    MESSAGE="A atualização do ISS foi cancelada antes de terminar."
    EMBED_COLOR=9807270
    ;;
  *)
    MESSAGE="A atualização do ISS não concluiu (${STATUS})."
    EMBED_COLOR=9807270
    ;;
esac

PAYLOAD="$(jq -n \
  --arg desc "$MESSAGE" \
  --argjson color "$EMBED_COLOR" \
  '{ embeds: [{ description: $desc, color: $color }] }')"
post_discord "$PAYLOAD"
echo "Notificação Discord ($STATUS) enviada."
