# ISS (infetStudentsSummary) — Diretrizes de Design

## Objetivo

Manter a interface **limpa, rápida, simples e focada em leitura**, alinhada ao MVP estático (HTML + Tailwind + JavaScript). O uso de bibliotecas de componentes (ex.: shadcn/ui) é **opcional**; a prioridade é implementar com HTML, Tailwind e JS (Alpine.js para interatividade) sem dependências pesadas.

Referências de estilo: **Linear**, **Resend**, **Vercel** — clean, moderno. Tema padrão: **dark mode**.

---

## Paleta de cores (tema dark)

| Uso | Nome | Hex | Notas |
|-----|------|-----|--------|
| Fundo principal | Background | `#18181b` | Página e cards. |
| Fundo secundário | Surface | `#27272a` | Seções alternadas, listagens, blocos de exercício. |
| Texto principal | Foreground | `#fafafa` | Títulos e corpo. |
| Texto secundário | Muted | `#a1a1aa` | Legendas, metadados, breadcrumbs. |
| Borda / divisores | Border | `#3f3f46` | Linhas, contornos de cards. |
| Destaque / links | Accent | `#3b82f6` | Links, botões primários. |
| Hover / interação | Accent hover | `#60a5fa` | Feedback em links e botões. |

Tokens definidos em `css/styles.css` (`:root`). Usar as classes utilitárias `iss-text-foreground`, `iss-text-muted`, `iss-border`, `iss-link`, `iss-link-muted` em vez de cores fixas do Tailwind.

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

- **Leve:** Para cards na home/listagem (ex.: `0 1px 3px rgba(0,0,0,0.2)` no tema dark).
- Evitar sombras pesadas; priorizar bordas leves se preferir look mais flat.

---

## Componentes e padrões

### Navegação

- **Header:** Altura fixa (~48–56px); fundo background (token); borda inferior sutil.
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
