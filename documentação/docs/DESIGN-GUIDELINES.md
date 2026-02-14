# ISS (infetStudentsSummary) — Diretrizes de Design

## Objetivo

Manter a interface **limpa, rápida, simples e focada em leitura**, alinhada ao MVP estático (HTML + Tailwind + JavaScript). O uso de bibliotecas de componentes (ex.: shadcn/ui) é **opcional**; a prioridade é implementar com HTML, Tailwind e JS (Alpine.js para interatividade) sem dependências pesadas.

Referências de estilo: **Linear**, **Resend**, **Vercel** — clean, moderno, light mode.

---

## Paleta de cores sugerida

| Uso | Nome | Hex | Notas |
|-----|------|-----|--------|
| Fundo principal | Background | `#ffffff` | Página e cards. |
| Fundo secundário | Surface | `#fafafa` ou `#f4f4f5` | Seções alternadas, listagens. |
| Texto principal | Foreground | `#18181b` ou `#09090b` | Títulos e corpo. |
| Texto secundário | Muted | `#71717a` ou `#52525b` | Legendas, metadados. |
| Borda / divisores | Border | `#e4e4e7` ou `#d4d4d8` | Linhas, contornos de cards. |
| Destaque / links | Accent | `#18181b` ou `#2563eb` | Links, botões primários (escolher um e manter consistente). |
| Hover / interação | Accent hover | Escurecer ou clarear levemente o Accent | Feedback em links e botões. |

Sugestão: manter **light mode** no MVP; poucos tons para não distrair da leitura.

---

## Tipografia

- **Fontes:** System fonts ou Google Fonts. Sugestões:
  - **Títulos:** Inter, Geist ou system-ui.
  - **Corpo:** Inter, Geist, ou mesma do título para simplicidade.
- **Tamanhos sugeridos (escala relativa):**
  - H1 (hero, título da aula): 1.75rem – 2rem
  - H2 (seções): 1.25rem – 1.5rem
  - H3 (subseções): 1.1rem – 1.25rem
  - Corpo: 1rem (16px)
  - Pequeno / metadados: 0.875rem
- **Peso:** Regular (400) para corpo; Semibold (600) ou Bold (700) para títulos.
- **Line-height:** Corpo ~1.6; títulos ~1.3.

---

## Espaçamento

- **Base:** 4px ou 8px.
- **Escala sugerida:** 4, 8, 12, 16, 24, 32, 48, 64 (em px ou rem equivalente).
- **Uso:** Padding de cards e seções (16–24px); margem entre blocos (24–32px); entre parágrafos (12–16px).

---

## Border radius

- **Padrão:** 6px ou 8px para cards e botões.
- **Pequeno:** 4px para badges ou elementos menores.
- Manter consistente em toda a UI.

---

## Sombras

- **Leve:** Para cards na home/listagem (ex.: `0 1px 3px rgba(0,0,0,0.06)`).
- Evitar sombras pesadas; priorizar bordas leves se preferir look mais flat.

---

## Componentes e padrões

### Navegação

- **Header:** Altura fixa (~48–56px); fundo branco ou surface; borda inferior sutil.
- **Links:** Cor de texto ou accent; sublinhado ou destaque no hover.

### Listagem de disciplinas (home)

- **Card/link:** Área clicável clara; padding confortável; borda ou sombra leve; hover com mudança sutil (cor de fundo ou borda).

### Listagem de aulas

- **Lista:** Itens com título da aula; opcional: número ou data; separação visual (borda ou espaço).

### Página de aula

- **Hierarquia:** H1 = título da aula; H2 = Resumo, Explicações, Exercícios; H3 = subseções dentro de cada parte.
- **Resumo e explicações:** Tipografia legível; listas e parágrafos bem espaçados.
- **Exercícios:** Cada exercício em um bloco (card ou seção); pergunta em destaque; controle “Ver resposta sugerida” que expande o conteúdo (accordion ou `<details>`).

### Expandíveis (exercícios)

- **Padrão:** Pergunta sempre visível; botão ou link “Ver resposta sugerida” / “Ver dicas”; ao ativar, expandir bloco com resposta/dicas.
- **Implementação:** Preferir `<details>` e `<summary>` (funciona sem JS) ou Alpine.js para expandir/recolher; opcional: animação suave.
- **Acessibilidade:** Focável por teclado; estado expandido/colapsado claro.

---

## Referências visuais

- **Linear:** [linear.app](https://linear.app) — clean, bom uso de listas e hierarquia.
- **Resend:** [resend.com](https://resend.com) — hero simples, CTAs claros.
- **Vercel:** [vercel.com](https://vercel.com) — tipografia e espaçamento.

---

## Uso do Tailwind

- Usar classes utilitárias para cores, espaçamento, tipografia e bordas.
- Definir tokens no `tailwind.config` (ou em CSS customizado se usar Tailwind via CDN) para cores, fontes e radius.
- Evitar JS pesado; repetição de blocos (ex.: card de disciplina, bloco de exercício) via HTML gerado por JS ou templates simples.

---

## shadcn/ui (opcional)

Se for adotar depois:

- Escolher apenas componentes necessários (ex.: Accordion para exercícios).
- Manter alinhado à paleta e tipografia destas diretrizes.
- No MVP, não é obrigatório; HTML semântico + Tailwind + Alpine.js são suficientes.

---

*Documento alinhado ao MVP estático da ISS. Stack: HTML5 + Tailwind + JavaScript + Alpine.js (documentação/agents/frontEnd.md); foco em leitura e simplicidade.*
