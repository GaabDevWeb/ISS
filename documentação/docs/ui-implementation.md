# ISS (infetStudentsSummary) — Implementação da UI

Documento de implementação da interface da plataforma ISS com a stack estática definida em **documentação/agents/frontEnd.md**: HTML5, Tailwind CSS, JavaScript, Alpine.js, Marked.js, Highlight.js.

**Referências:** `docs/architecture.md`, `docs/content-system.md`, `docs/DESIGN-GUIDELINES.md`, `docs/LANDING-PAGE-SPEC.md`.

---

## 1. Estrutura de arquivos

```
/
  index.html           # Home: hero + listagem de disciplinas
  disciplina.html      # Listagem de aulas (parâmetro d=slug)
  aula.html            # Página da aula (parâmetros d=disciplina, a=slug)

  content/
    disciplines.json   # Lista de disciplinas
    lessons.json       # Lista de todas as aulas
    python/
      aula-01-introducao.md
      aula-02-variaveis.md
    redes/
      aula-01-pilha-tcp.md

  js/
    app.js             # Inicialização, leitura de parâmetros, rotas
    content.js         # Fetch de disciplines.json, lessons.json, .md
    markdown.js        # Parse de frontmatter, Marked.js, Highlight.js, injeção de exercícios
  css/
    styles.css         # Tailwind (CDN ou output de build) + tokens (opcional)

  favicon.svg
```

---

## 2. URLs e parâmetros

- **Home:** `index.html` ou `/`  
  Sem parâmetros.

- **Disciplina:** `disciplina.html?d=python`  
  `d` = slug da disciplina. A página faz fetch a `content/lessons.json`, filtra por `discipline === d`, ordena por `order`, e renderiza links para `aula.html?d=...&a=...`.

- **Aula:** `aula.html?d=python&a=introducao`  
  `d` = disciplina, `a` = slug da aula. A página usa `lessons.json` para obter o `file` correspondente (ex.: `aula-01-introducao.md`), faz fetch a `content/{d}/{file}`, parse do frontmatter + corpo, renderiza o corpo com Marked.js, aplica Highlight.js nos blocos de código, e injeta a seção Exercícios (Alpine.js) a partir do array `exercises` do frontmatter.

Se `d` ou `a` estiverem em falta ou inválidos, redirecionar para `index.html` ou mostrar mensagem amigável.

---

## 3. Estilos (Tailwind e tokens)

Seguir **DESIGN-GUIDELINES.md**. Duas opções:

### Opção A: Tailwind via CDN

Incluir no `<head>` de cada HTML:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Para tokens (cores, fontes), usar um bloco `<script type="text/tailwindcss">` ou um ficheiro CSS com classes customizadas que espelhem os tokens (background, surface, foreground, muted, border, accent, text-hero, text-section, etc.). Ver DESIGN-GUIDELINES para valores hex e escalas.

### Opção B: Build do Tailwind

Se usar `npm` e build: instalar Tailwind, configurar `content: ['./**/*.html', './js/**/*.js']`, e em `theme.extend` definir as mesmas cores, fontFamily, fontSize, borderRadius, boxShadow e maxWidth de DESIGN-GUIDELINES (ex.: background, surface, foreground, muted, border, accent; font-hero, text-section; rounded-card; shadow-card; max-w-read, max-w-container). Importar o CSS compilado em cada página.

---

## 4. Página inicial (index.html)

- **Estrutura:** Header (nome ISS, link para `index.html`) + main (hero + listagem) + footer, conforme LANDING-PAGE-SPEC.md.
- **Comportamento:** Ao carregar, `fetch('content/disciplines.json')`, ordenar por `order`, e renderizar uma lista ou grid de cards. Cada card é um link para `disciplina.html?d={slug}`; título = `title`, opcionalmente subtítulo = `description`.
- **Layout:** Container centralizado (max-width conforme DESIGN-GUIDELINES), hero (H1 + descrição curta), depois grid de disciplinas. Footer discreto (ex.: “Projeto de apoio à revisão — INFET”).

Pode ser HTML puro com um container vazio para a listagem, preenchido por JS; ou a listagem já em HTML estático se for gerada por uma ferramenta de build.

---

## 5. Página de disciplina (disciplina.html)

- **Estrutura:** Mesmo header e footer; no main: breadcrumb (Home / Nome da disciplina), H1 com nome da disciplina (obtido de disciplines.json ou do primeiro item de lessons da disciplina), lista de aulas.
- **Comportamento:** Ler `d` da query string. Fetch a `content/lessons.json` e opcionalmente `content/disciplines.json`. Filtrar aulas com `discipline === d`, ordenar por `order`. Obter título da disciplina a partir de `disciplines.json`. Renderizar links para `aula.html?d={d}&a={slug}` com o título de cada aula.
- **Disciplina inexistente:** Se `d` não existir em disciplines ou não houver aulas, redirecionar para `index.html` ou mostrar “Disciplina não encontrada”.

---

## 6. Página de aula (aula.html)

- **Estrutura:** Header + breadcrumb (Home / Disciplina / Título da aula) + área de conteúdo (H1 + conteúdo Markdown + seção Exercícios) + footer.
- **Comportamento:**
  1. Ler `d` e `a` da query string.
  2. Fetch `content/lessons.json` para obter o `file` da aula com `discipline === d` e `slug === a`. Se não existir, redirecionar ou mostrar erro.
  3. Fetch `content/{d}/{file}` (texto bruto).
  4. Parse do frontmatter YAML (entre `---` e `---`) e do corpo (resto). Extrair `title`, `exercises` e o corpo Markdown (seções ## Resumo e ## Explicações).
  5. Atualizar `<title>` e H1 com o título da aula.
  6. Passar o corpo a Marked.js e inserir o HTML resultante num container. Aplicar Highlight.js nos blocos `<pre><code>` (por exemplo, após a injeção, chamar `document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el))`).
  7. Adicionar a seção “Exercícios” (H2) e, para cada item de `exercises`, um bloco com: pergunta visível; botão/link “Ver resposta sugerida” (e “Ver dica” se existir `hint`) que expande/recolhe com Alpine.js (ex.: `x-data="{ open: false }"`, `x-show="open"`, `@click="open = !open"`). Alternativa: usar `<details>` e `<summary>` para funcionar sem JS.
  8. Breadcrumb: link Home → `index.html`; link Disciplina → `disciplina.html?d={d}` com o título da disciplina (de disciplines.json).

---

## 7. Parse de frontmatter e Markdown (js/markdown.js)

- **Função** que recebe o texto bruto do .md e devolve `{ frontmatter, body }`.
  - Detetar o primeiro `---` e o segundo `---`; entre eles = YAML. Usar um parser YAML em JS (ex.: biblioteca leve ou regex simples para `key: value` e para o array `exercises`).
  - Corpo = texto após o segundo `---`.
- **Função** que recebe `body` e devolve HTML: usar Marked.js (`marked.parse(body)`). Configurar Marked se necessário (ex.: quebras de linha, sanitização).
- **Exercícios:** A partir de `frontmatter.exercises`, gerar HTML para cada exercício: pergunta em parágrafo ou destaque; depois elemento expandível (Alpine ou `<details>`) com resposta e, se houver, dica.

Exemplo de bloco de exercício com Alpine.js:

```html
<div class="..." x-data="{ open: false }">
  <p class="font-medium">Pergunta aqui</p>
  <button @click="open = !open" class="text-accent ...">Ver resposta sugerida</button>
  <div x-show="open" x-collapse>
    <p>Resposta aqui.</p>
    <p x-show="hint">Dica: ...</p>
  </div>
</div>
```

Gerar este HTML a partir de cada objeto em `exercises` e inserir na página.

---

## 8. Dependências (scripts nas páginas)

Em cada HTML, incluir na ordem adequada:

- Tailwind (CDN ou link para CSS compilado).
- Highlight.js: CSS do tema (ex.: no head) e script (antes do fecho do body).
- Marked.js: script.
- Alpine.js: script (defer).
- `js/content.js` e `js/markdown.js` (módulos ou globais conforme a organização).
- `js/app.js`: inicialização da página (detectar se é home, disciplina ou aula; chamar as funções de fetch e render).

Para aula.html: garantir que Alpine está carregado antes de injetar os blocos de exercício (ou usar `Alpine.start()` após injeção se necessário).

---

## 9. Acessibilidade e boas práticas

- Estrutura semântica: `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>` onde fizer sentido.
- Links e botões focáveis por teclado; estado de foco visível (estilos focus).
- Expandíveis: se usar `<details>/<summary>`, já são acessíveis; se usar Alpine, garantir que o botão é focável e que o estado expandido/recolhido é claro (aria-expanded se aplicável).
- Contraste de cores conforme DESIGN-GUIDELINES; tamanhos de fonte legíveis.

---

## 10. Passo a passo de implementação

1. Criar a estrutura de pastas e os ficheiros `content/disciplines.json` e `content/lessons.json` (exemplo em content-system.md).
2. Adicionar pelo menos uma disciplina e uma aula (ficheiro .md com frontmatter e corpo Resumo + Explicações + array exercises).
3. Implementar `index.html` com header, hero, container vazio para disciplinas, footer; em `app.js`, fetch de disciplines.json e render da listagem.
4. Implementar `disciplina.html` com leitura de `d`, fetch de lessons.json (e disciplines.json), render da listagem de aulas.
5. Implementar `aula.html` com leitura de `d` e `a`, fetch do .md, parse de frontmatter, render do corpo com Marked e Highlight, injeção da seção Exercícios com Alpine (ou details/summary).
6. Ajustar estilos (Tailwind/tokens) conforme DESIGN-GUIDELINES.
7. Testar navegação Home → Disciplina → Aula; testar expandir/recolher exercícios; testar em mobile e com teclado.

---

## 11. Checklist final

- [ ] index.html: lista de disciplinas a partir de disciplines.json; links para disciplina.html?d=...
- [ ] disciplina.html: lista de aulas a partir de lessons.json (filtro por d); links para aula.html?d=...&a=...
- [ ] aula.html: carrega .md correto, frontmatter parseado, corpo renderizado com Marked + Highlight, exercícios expandíveis (Alpine ou details/summary).
- [ ] Header e footer consistentes; breadcrumb na disciplina e na aula.
- [ ] Cores e tipografia conforme DESIGN-GUIDELINES.
- [ ] Responsivo; links e expandíveis acessíveis por teclado.
- [ ] Sem backend; conteúdo só em content/; deploy como site estático (ex.: GitHub Pages).

---

*Alinhado a documentação/agents/frontEnd.md e docs/architecture.md. Stack: HTML5 + Tailwind + JavaScript + Alpine.js + Marked.js + Highlight.js.*
