# Outline TOC Agent — Prompt Oficial

## Objetivo

Implementar uma feature de **outline/índice dinâmico** na página de aula (`aula.html`) do projeto ISS. O outline exibe os títulos (H2 e H3) do conteúdo renderizado da aula em um painel lateral sticky. Clicar em um item faz scroll suave até a seção correspondente. O item da seção visível no momento fica destacado enquanto o usuário rola a página.

---

## Contexto do projeto

- Aplicação web **estática** com **JavaScript vanilla** (sem framework, sem build step)
- Renderização **client-side**: o conteúdo Markdown é convertido para HTML no browser via Marked.js
- Arquivos principais da página de aula:
  - `aula.html` — template HTML estático com containers vazios
  - `js/markdown.js` — parse de frontmatter, render do Markdown, injeção de HTML na página
  - `js/app.js` — orquestração: lê params da URL, busca conteúdo, chama `renderAulaPage()`
  - `css/styles.css` — estilos customizados com design tokens CSS
- Layout atual em `aula.html`: `<main class="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-3xl mx-auto w-full">` — coluna única centralizada
- Design tokens relevantes em `css/styles.css`:
  - `--color-background: #1E1E1E`
  - `--color-surface: #27272a`
  - `--color-foreground: #DADADA`
  - `--color-muted: #a1a1aa`
  - `--color-border: #3f3f46`
  - `--color-accent: #5B88B2`
  - `--color-accent-hover: #82AAE6`
  - `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif`
  - `--text-small: 0.875rem`
  - `--radius-sm: 4px`
- Header fixo com `height: 56px` e `sticky top-0 z-10`
- Função `ensureSectionIds()` em `js/markdown.js` atualmente atribui IDs fixos apenas aos dois primeiros H2 (ids `resumo` e `explicacoes`) — precisa ser generalizada
- O H2 de exercícios é gerado por `renderExercisesHTML()` com `id="exercicios"` já fixo no HTML — deve ser incluído no outline

---

## Arquivos a modificar

1. `aula.html`
2. `js/markdown.js`
3. `css/styles.css`

Não criar novos arquivos JS ou CSS — toda a lógica entra nos arquivos existentes.

---

## Implementação detalhada

### 1. `aula.html` — Mudar para layout de duas colunas

Substituir o `<main>` atual por um wrapper que em telas `lg`+ (≥1024px) exibe duas colunas: conteúdo à esquerda e sidebar de outline à direita. Em telas menores, o outline fica oculto.

**Estrutura alvo:**

```html
<div class="iss-page-layout flex-1 w-full">
  <main class="px-4 md:px-6 py-8 md:py-12 max-w-3xl w-full mx-auto lg:mx-0 lg:ml-auto">
    <nav id="breadcrumb-aula" class="text-sm mb-4" aria-label="Navegação">
      …
    </nav>
    <article>
      <h1 id="lesson-title" class="text-2xl md:text-3xl font-bold iss-text-foreground mb-6">…</h1>
      <div id="lesson-content" class="iss-prose">
        <p class="iss-text-muted">A carregar…</p>
      </div>
    </article>
  </main>

  <aside id="iss-outline" class="iss-outline" aria-label="Índice da aula" hidden>
    <p class="iss-outline__title">Nesta página</p>
    <nav>
      <ul id="iss-outline-list" class="iss-outline__list"></ul>
    </nav>
  </aside>
</div>
```

O `<div class="iss-page-layout">` envolve tanto o `<main>` quanto o `<aside>` e controla o grid. O aside começa com `hidden` e é revelado via JS somente quando houver pelo menos 2 headings para mostrar.

### 2. `js/markdown.js` — Extração de headings e geração do outline

#### 2a. Atualizar `ensureSectionIds()`

A função atual atribui apenas os IDs `resumo` e `explicacoes` aos dois primeiros H2. Ela deve ser reescrita para atribuir IDs a **todos** os H2 e H3 dentro de `.iss-prose`, usando slugificação do texto do heading. O `#exercicios` já vem pronto do HTML gerado por `renderExercisesHTML()` — não precisa ser tocado.

Regra de slugificação: texto em minúsculas, acentos removidos (via `normalize('NFD').replace(/[\u0300-\u036f]/g, '')`), espaços e caracteres não-alfanuméricos viram `-`, hífens múltiplos colapsados, hífens nas pontas removidos.

Se dois headings gerarem o mesmo slug, adicionar sufixo `-2`, `-3`, etc.

Os IDs `resumo` e `explicacoes` devem continuar sendo gerados para os dois primeiros H2 (para não quebrar o "Copiar resumo" e outros comportamentos existentes que dependem desses IDs). A lógica pode ser: atribuir o slug gerado a cada heading, **mas** sobrescrever os dois primeiros H2 com `resumo` e `explicacoes` respectivamente (mantendo compatibilidade).

#### 2b. Adicionar função `buildOutline(contentEl)`

Deve ser chamada ao final de `renderAulaPage()`, após `ensureSectionIds()`.

Passos:
1. Coletar todos os H2 e H3 dentro de `contentEl` (inclui os do `.iss-prose` e o `#exercicios` gerado pelo `renderExercisesHTML()`), na ordem do DOM
2. Se menos de 2 headings, não exibir o outline (manter `aside` oculto) e retornar
3. Para cada heading, criar um `<li>` com um `<a href="#id">texto</a>`. H3 deve ter indentação visual (classe `iss-outline__item--h3`)
4. Popular o `<ul id="iss-outline-list">` e remover o atributo `hidden` do `<aside id="iss-outline">`
5. Configurar `IntersectionObserver` nos headings para marcar o item ativo no outline

**Lógica do IntersectionObserver:**

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // remover classe ativa de todos os itens
        // adicionar classe iss-outline__item--active no item correspondente ao entry.target.id
      }
    });
  },
  { rootMargin: '0px 0px -70% 0px', threshold: 0 }
);
headings.forEach((h) => observer.observe(h));
```

O `rootMargin: '0px 0px -70% 0px'` faz com que um heading seja considerado "ativo" quando entra nos 30% superiores da viewport.

#### 2c. Scroll suave

No `<a>` do outline, usar `href="#id"`. O scroll suave é controlado por CSS (`scroll-behavior: smooth` no `html`). Adicionar `scroll-margin-top: 72px` nos headings via CSS para compensar o header sticky de 56px + folga.

### 3. `css/styles.css` — Estilos do outline

Adicionar ao final do arquivo:

```css
/* scroll-margin para headings (compensa o header sticky) */
.iss-prose h2,
.iss-prose h3,
#exercicios {
  scroll-margin-top: 72px;
}

/* Layout de duas colunas na página de aula */
.iss-page-layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Outline sidebar */
.iss-outline {
  display: none; /* oculto por padrão; JS remove hidden, CSS controla visibilidade por breakpoint */
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: 72px; /* 56px header + 16px folga */
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  padding: 1.5rem 0 1.5rem 1.5rem;
  font-size: var(--text-small);
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

/* Mostrar apenas em telas grandes */
@media (min-width: 1200px) {
  .iss-outline:not([hidden]) {
    display: block;
  }
}

.iss-outline__title {
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.iss-outline__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.iss-outline__list a {
  display: block;
  padding: 0.2rem 0;
  color: var(--color-muted);
  text-decoration: none;
  line-height: 1.4;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  transition: color 0.15s;
}

.iss-outline__list a:hover {
  color: var(--color-foreground);
}

.iss-outline__item--h3 > a {
  padding-left: 1.25rem;
  font-size: 0.8125rem;
}

.iss-outline__item--active > a {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}

/* No modo foco, esconder o outline */
body.iss-focus-mode .iss-outline {
  display: none !important;
}
```

---

## Restrições e cuidados

- **Não quebrar** o comportamento do botão "Copiar resumo" — ele depende de `contentEl.querySelector('#resumo')` e `contentEl.querySelector('#explicacoes')`. Os IDs desses dois H2 devem continuar sendo `resumo` e `explicacoes`.
- **Não quebrar** a navegação interna já existente (`<nav aria-label="Nesta página">` com links `#resumo`, `#explicacoes`, `#exercicios`).
- **Não quebrar** o modo foco (`body.iss-focus-mode`): o outline deve ser ocultado nesse modo.
- O `<aside>` começa com o atributo HTML `hidden` e só é exibido pelo JS (removendo `hidden`) quando houver headings suficientes. O CSS controla a visibilidade por breakpoint com `:not([hidden])`.
- O layout deve continuar funcional em telas pequenas (mobile): a coluna de outline simplesmente não aparece.
- Não usar `document.write`, `eval`, ou qualquer biblioteca externa nova.
- Manter o estilo de código existente: funções nomeadas, `const`/`let`, sem classes ES6, sem módulos ES6 (`import`/`export`) — o projeto usa scripts globais carregados via `<script defer>`.

---

## Comportamento esperado

1. Ao carregar a `aula.html`, após o render do Markdown, o outline aparece na lateral direita (em telas ≥1200px) listando todos os H2 e H3 da aula
2. Os H2 ficam alinhados à esquerda do outline; os H3 ficam levemente indentados
3. Clicar em um item faz scroll suave até o heading correspondente, com offset suficiente para não ficar atrás do header
4. Conforme o usuário rola, o item do heading atual fica destacado em azul com borda esquerda colorida
5. Em telas pequenas (< 1200px), o outline não é exibido (a navegação interna existente já supre essa necessidade)
6. No modo foco, o outline desaparece junto com o header e footer
