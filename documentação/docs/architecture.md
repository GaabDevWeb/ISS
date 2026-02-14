# ISS (infetStudentsSummary) — Arquitetura

Documento que define a stack técnica e a estrutura do projeto. Fonte única de verdade para implementação do frontend.

---

## 1. Stack obrigatória

| Tecnologia   | Uso |
|-------------|-----|
| **HTML5**   | Estrutura das páginas; semântica correta. |
| **TailwindCSS** | Estilos; tokens alinhados a DESIGN-GUIDELINES.md. |
| **JavaScript puro** | Lógica de carregamento de conteúdo, listagens, integração de libs. |
| **Alpine.js** | Interatividade leve (expandir/recolher exercícios, etc.). |
| **Marked.js** | Renderização de Markdown no cliente. |
| **Highlight.js** | Syntax highlight de blocos de código no conteúdo. |

O ISS é um site **100% estático**. Pode ser hospedado em GitHub Pages, Cloudflare Pages, Netlify ou qualquer servidor de arquivos estáticos.

---

## 2. O que NÃO usar

- Backend ou API própria
- Banco de dados
- Autenticação ou login
- Frameworks pesados (React, Angular, Vue, Next.js, etc.)
- Build obrigatório com Node (opcional: ferramentas de build só para minificar/concatenar se desejado)

---

## 3. Estrutura de arquivos do projeto

```
/
  index.html          # Landing: lista de disciplinas
  disciplina.html     # Listagem de aulas de uma disciplina (slug via query/hash)
  aula.html           # Página de uma aula (conteúdo Markdown + exercícios)

  content/            # Conteúdo editável
    disciplines.json  # Lista de disciplinas (slug, title, description, order)
    python/
      aula-01-introducao.md
      aula-02-variaveis.md
    redes/
      aula-01-pilha-tcp.md

  js/
    app.js            # Inicialização, Alpine, carregamento de listagens
    markdown.js       # Carregamento e renderização com Marked (+ Highlight.js)
    config.js         # (opcional) Constantes, base path

  css/
    (opcional; Tailwind pode ser CDN ou build)

  favicon.svg
```

- **Páginas:** três HTML (index, disciplina, aula); a mesma página física serve todas as disciplinas/aulas; o “qual conteúdo” vem de parâmetros (query string ou hash).
- **Conteúdo:** apenas em `content/`. Lista de disciplinas em `content/disciplines.json`; uma pasta por disciplina; um arquivo `.md` por aula (ver content-system.md).

---

## 4. Rotas e URLs

Como não há servidor dinâmico, as rotas são implementadas com um único HTML por “tipo” de página e parâmetros na URL.

| Página        | URL (exemplo) | Parâmetros |
|---------------|----------------|------------|
| Home          | `/` ou `/index.html` | — |
| Disciplina    | `/disciplina.html?d=python` ou `...#python` | Identificador da disciplina (`d` ou hash) |
| Aula          | `/aula.html?d=python&a=introducao` ou equivalente | `d` = disciplina, `a` = slug da aula |

A convenção exata (query vs hash) fica definida em ui-implementation.md; o importante é que disciplina e aula sejam identificadas de forma estável e legível.

---

## 5. Fluxo de dados

- **Home:** carrega `content/disciplines.json`, renderiza lista de links para `disciplina.html?d={slug}`.
- **Disciplina:** lê parâmetro da disciplina, carrega lista de aulas (via outro JSON ou listando arquivos não é possível em estático puro — portanto a lista de aulas deve vir de um índice, e.g. `content/python/index.json` ou um único `content/lessons.json` que lista todas as aulas; ver content-system.md).
- **Aula:** lê parâmetro disciplina + aula, carrega o `.md` correspondente (e.g. `content/python/aula-01-introducao.md`), converte com Marked.js, injeta blocos de exercício com Alpine.js para expandir/recolher.

Sem backend, todo conteúdo é carregado via `fetch()` a arquivos estáticos em `content/`.

---

## 6. Responsabilidade dos documentos

- **architecture.md** (este): stack, estrutura de pastas, rotas e fluxo.
- **content-system.md:** formato dos arquivos em `content/`, frontmatter, convenção de exercícios.
- **DESIGN-GUIDELINES.md:** cores, tipografia, componentes visuais.
- **LANDING-PAGE-SPEC.md:** estrutura da home.
- **PRD.md / MVP-SCOPE.md:** requisitos e escopo.
- **ui-implementation.md:** detalhes de implementação (como passar parâmetros, como renderizar Markdown e exercícios).

---

*Stack definida em documentação/agents/frontEnd.md. Deploy: site estático; GitHub Pages ou equivalente.*
