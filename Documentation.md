# ISS — Documentação técnica do projeto

> **Infet Students Summary**: plataforma estática (HTML, CSS, JavaScript) para leitura de aulas em Markdown, exercícios e acompanhamento de progresso no navegador (localStorage).

## Índice

- [Pipeline automático (scraper → Actions → site)](#pipeline-automático-scraper--actions--site)
- [Pipeline de Sincronização e Ingestão Automática (Fase 5b)](#pipeline-de-sincronização-e-ingestão-automática-fase-5b)
- [Visão geral](#visão-geral)
- [Arquitetura e fluxo](#arquitetura-e-fluxo)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Dados de conteúdo (JSON)](#dados-de-conteúdo-json)
- [Como adicionar uma nova aula](#como-adicionar-uma-nova-aula)
- [Como verificar se uma aula já existe](#como-verificar-se-uma-aula-já-existe)
- [Markdown das aulas (frontmatter e corpo)](#markdown-das-aulas-frontmatter-e-corpo)
- [Índice de pesquisa (`search-index.json`)](#índice-de-pesquisa-search-indexjson)
- [Trilha opcional (`study-path.json`)](#trilha-opcional-study-pathjson)
- [Exercícios independentes](#exercícios-independentes)
- [URLs e roteamento](#urls-e-roteamento)
- [Estado local (progresso do utilizador)](#estado-local-progresso-do-utilizador)
- [Executar o projeto localmente](#executar-o-projeto-localmente)
- [Checklist de contribuição](#checklist-de-contribuição)

---

## Pipeline automático (scraper → Actions → site)

A documentação **completa** do ecossistema (dois repositórios, contrato de integração, runbooks) está na **[WIKI.md](WIKI.md)**. Resumo operacional: **[README.md](README.md#ecossistema-fluxo-completo-automático)**.

Resumo:

1. **[STRIPPERscrapper](https://github.com/GaabDevWeb/STRIPPERscrapper)** (local) — extrai `.vtt` e documentos para `downloads/`.
2. **Workflow** [`.github/workflows/summarize-transcripts.yml`](.github/workflows/summarize-transcripts.yml) — gera lições em `content/` via Cursor SDK, sem edição manual por aula.
3. **GitHub Pages** — serve o site estático que lê `content/`.

Convenção VTT: `downloads/<Pasta>/Aula_NN_-_DDMMYYYY.vtt`. Configuração: `config/vtt-to-content.json`, `config/documents-context.json`, `agents/content-summary-*.md`.

---

## Pipeline de Sincronização e Ingestão Automática (Fase 5b)

Sincroniza o **SSOT** do ISS (`content/lessons.json`, Markdown e `search-index.json`) com o MySQL do **KernelBot** e reconstrói o índice BM25 em RAM. Documentação do lado do chatbot (endpoints `/reload`, `/health/catalog`): repositório [KernelBot](https://github.com/GaabDevWeb/KernelBot) — `documentation.md`.

**Workflow:** [`.github/workflows/sync-kernelbot-knowledge.yml`](.github/workflows/sync-kernelbot-knowledge.yml)

**Disparo:** `push` / `pull_request` em `content/**`, `content/lessons.json`, `content/search-index.json`; `workflow_dispatch` com `skip_ingest=1` (só validar + reload + verify, sem ingest).

### Diagrama (Jobs 1–5)

```mermaid
flowchart TD
  subgraph triggers [Disparo]
    PUSH[push em content/]
    PR[pull_request]
    WD[workflow_dispatch]
  end

  J1[J1 validate\nvalidate-catalog.mjs]
  J2[J2 ingest\ningest-knowledge.py]
  J3[J3 reload\nreload-kernelbot.mjs]
  J4[J4 verify\nverify-kernelbot-sync.mjs]
  J5[J5 notify\nops-notify.sh]

  PUSH --> J1
  PR --> J1
  WD --> J1

  J1 -->|success| J2
  J1 -->|PR ou skip_ingest| J3
  J2 -->|success push/main| J3
  J3 --> J4
  J4 --> J5
  J2 --> J5
  J1 --> J5

  J2 --> MySQL[(MySQL knowledge)]
  J3 --> KB[KernelBot POST /chat /reload]
  J4 --> KBH[KernelBot GET /health/catalog]
  J5 --> Discord[Discord webhook ops]
```

### Jobs (J1–J5)

| Job | Script | Quando corre | Função |
|-----|--------|--------------|--------|
| **J1 `validate`** | [`.github/scripts/validate-catalog.mjs`](.github/scripts/validate-catalog.mjs) | Sempre (push, PR, dispatch) | Valida `lessons.json`, `search-index.json`, `disciplines.json`; normaliza chaves `discipline:slug` (strip, lower, `_` → `-`, alinhado ao KernelBot). Gera [`.github/reports/validate-report.json`](.github/reports/validate-report.json). |
| **J2 `ingest`** | [`.github/scripts/ingest-knowledge.py`](.github/scripts/ingest-knowledge.py) | `push`/`workflow_dispatch` com ingest (não em PR) | UPSERT em `knowledge` a partir dos `.md`; desativa linhas `active=1` ausentes do SSOT. Requer rede até o MySQL. Relatório: `ingest-report.json`. |
| **J3 `reload`** | [`.github/scripts/reload-kernelbot.mjs`](.github/scripts/reload-kernelbot.mjs) | Após J1 (+ J2 ok ou `skip_ingest=1`) | `POST` SSE em `KERNELBOT_CHAT_URL` com `message: "/reload"` e Bearer. Rebuild BM25 + refresh de chaves indexadas. Relatório: `reload-report.json`. |
| **J4 `verify`** | [`.github/scripts/verify-kernelbot-sync.mjs`](.github/scripts/verify-kernelbot-sync.mjs) | Após J3 (ou dispatch com skip ingest) | Tripla verificação: SSOT (`lesson_count` / `validated_keys`), `COUNT(DISTINCT discipline, slug)` no MySQL, `GET /health/catalog` (RAM). Relatório: `verify-report.json`. |
| **J5 `notify`** | [`.github/scripts/ops-notify.sh`](.github/scripts/ops-notify.sh) | `always()` | Discord **só em falha/cancelamento**; sucesso não pinga ops. |

### Políticas de segurança

- **Secrets no GitHub** (nunca no repositório): `KB_DB_HOST`, `KB_DB_PORT`, `KB_DB_USER`, `KB_DB_PASSWORD`, `KB_DB_NAME`, `KERNELBOT_CHAT_URL`, `KERNELBOT_RELOAD_TOKEN`, `DISCORD_WEBHOOK_URL`. Opcional: variável de repositório `KERNELBOT_HEALTH_URL` (senão derivada de `KERNELBOT_CHAT_URL` → `/health/catalog`).
- **`KERNELBOT_RELOAD_TOKEN`** deve ser igual a `ACL_RELOAD_BEARER_TOKEN` no `.env` do KernelBot.
- **PR:** executa apenas **J1** — sem escrita em MySQL nem reload remoto.
- **Ingest:** aborta com erro se alguma lição falhar; **não** desativa registos no banco se a lista processada estiver vazia (evita wipe acidental).
- **`/reload` e `/health/catalog`:** exigem `Authorization: Bearer …`; comparação com `secrets.compare_digest` no KernelBot. Sem token configurado: HTTP 503.
- **Respostas de health:** JSON operacional sem credenciais nem conteúdo de aulas.

### RAM do KernelBot — sem auto-heal

O índice BM25 e o snapshot `indexed_lesson_keys` **não** são atualizados por timer em background (`engine/watcher.py` existe como legado e **não** está ligado ao fluxo atual). A RAM só muda quando:

1. o pipeline **J3** dispara `/reload` após ingest bem-sucedido, ou  
2. um operador corre `workflow_dispatch` (com ou sem `skip_ingest`) e o job reload/verify corre, ou  
3. alguém chama manualmente `POST /chat` com `/reload` + Bearer.

Reiniciar o processo do KernelBot também reconstrói a partir do MySQL no boot, mas isso **não** substitui a verificação CI pós-sync.

### Requisito de rede (runners GitHub Actions)

Os jobs **J2–J4** precisam de saída à Internet (ou VPN/firewall configurado) para:

- host/porta MySQL (`KB_DB_*`);
- URL pública ou interna do KernelBot (`KERNELBOT_CHAT_URL`, `KERNELBOT_HEALTH_URL`);
- webhook Discord (`DISCORD_WEBHOOK_URL`) no J5 em falha.

Runners `ubuntu-latest` na nuvem GitHub **não** alcançam `127.0.0.1` na sua máquina local — o KernelBot em produção/staging deve estar exposto num host acessível ao runner.

### Limitações conhecidas (BM25 lexical)

- Retrieval é **lexical** (BM25): perguntas com vocabulário diferente do material tendem a `insufficient_context` (hard stop) mesmo com a aula no catálogo.
- **Catálogo vs índice:** o KernelBot pode ter chave no catálogo ISS (`catalog_only`) ou no índice sem catálogo; J4 falha se `catalog_only_count > 0` após reload.
- **Index gap na UI:** aula no catálogo mas ausente do BM25 → `ACL_META` com `reason: index_gap` (ver documentação KernelBot).
- Não há correção automática de conteúdo nem re-ingest fora deste workflow.

### Opção B2 — ingest unificado (release 2026-05-20)

- **J2** persiste 1 documento/lição (`meta_header + body`) sem chunking MySQL; chunking BM25 (~500/50, meta só no chunk 0) no KernelBot RAM.
- **Validação pré-UPSERT:** `MAX_CONTENT_CHARS=4_000_000` em `ingest-knowledge.py` — lição rejeitada com erro explícito em `ingest-report.json` (mitiga OOM na origem).
- **Erros sanitizados:** `_sanitize_error` redige `password=` em stderr/relatório (sem stack trace no CI).
- **Backlog pós-deploy:** substituir validação OOM pós-fetch por `LIMIT` SQL / validação Job 2 ISS; expandir sensitive log sanitizer (KernelBot `redact_secrets`).

### Artefatos

Relatórios JSON em [`.github/reports/`](.github/reports/) (uploadados como artifacts GHA): `validate-report.json`, `ingest-report.json`, `reload-report.json`, `verify-report.json`.

---

## Visão geral

O ISS não usa backend nem build step obrigatório: o browser faz `fetch()` a ficheiros em `content/` (JSON + Markdown) e renderiza com **Marked.js**, **Highlight.js** e **Mermaid.js**. A navegação entre páginas usa ficheiros em `public/` (ex.: `aula.html`, `disciplina.html`) e parâmetros de query string.

**Repositório público referenciado na UI:** [https://github.com/GaabDevWeb/ISS](https://github.com/GaabDevWeb/ISS)

---

## Arquitetura e fluxo

### Componentes

| Peça | Função |
|------|--------|
| `index.html` | Entrada principal (home, pesquisa, cartões por disciplina) |
| `public/js/content.js` | Carrega `disciplines.json`, `lessons.json`, `search-index.json`, Markdown, `exercises.json` |
| `public/js/router.js` | Monta URLs (`d=`, `a=`, `slug=`) e resolve paths (`public/` vs raiz) |
| `public/js/app.js` | `initHome`, `initDisciplina`, `initAula`; pesquisa; integração com estado |
| `public/js/markdown.js` | Parse de YAML frontmatter, render Markdown, exercícios embutidos, Mermaid |
| `public/js/state.js` | localStorage: aulas lidas, exercícios concluídos, checklists, revisões, streak |
| `public/js/exercises.js` | Listagem e página de exercício (editor, testes quando aplicável) |

### Diagrama de alto nível

```mermaid
flowchart LR
  subgraph browser [Navegador]
    HTML[Páginas HTML]
    App[app.js + markdown.js]
  end
  subgraph static [Ficheiros estáticos content/]
    DJ[disciplines.json]
    LJ[lessons.json]
    SI[search-index.json]
    MD[Aulas .md]
    EJ[exercises/exercises.json]
    EM[exercises/*.md]
  end
  HTML --> App
  App --> DJ
  App --> LJ
  App --> SI
  App --> MD
  App --> EJ
  App --> EM
```

### Fluxo ao abrir uma aula

```mermaid
sequenceDiagram
  participant U as Utilizador
  participant A as aula.html
  participant App as app.js initAula
  participant L as lessons.json
  participant M as ficheiro .md

  U->>A: ?d=disciplina&a=slug-aula
  A->>App: carregar página
  App->>L: fetch lessons.json
  L-->>App: lista de aulas
  App->>App: getLesson(discipline, slug)
  alt aula não encontrada
    App-->>U: mensagem "Esta aula não existe."
  else aula encontrada
    App->>M: fetch conteúdo lesson.file
    M-->>App: texto Markdown
    App->>App: parseFrontmatter + render + Mermaid/Highlight
    App-->>U: conteúdo renderizado
  end
```

---

## Estrutura de pastas

| Caminho | Conteúdo |
|---------|----------|
| `content/` | Disciplinas como subpastas (`python/`, `visualizacao-sql/`, …) com ficheiros `.md` |
| `content/disciplines.json` | Catálogo de disciplinas (título, slug, trimestre, ordem) |
| `content/lessons.json` | **Registo canónico** de todas as aulas (disciplina, slug, título, ordem, ficheiro) |
| `content/search-index.json` | Trechos por aula para enriquecer a pesquisa na home |
| `content/exercises/` | `exercises.json` + um `.md` por exercício listado |
| `public/` | HTML auxiliar, `css/`, `js/` |
| `public/js/` | Toda a lógica cliente |

A base de fetch é calculada em `content.js`: se o path da página contém `/public/`, usa `../content`; caso contrário, `content`.

---

## Dados de conteúdo (JSON)

### `content/disciplines.json`

Array de objetos. Campos usados na UI:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `slug` | string | Identificador estável (ex.: `python`) — deve coincidir com `lesson.discipline` |
| `title` | string | Nome apresentado |
| `description` | string | Texto do cartão na home |
| `professor` | string | Aparece nos resultados de pesquisa |
| `order` | number | Ordenação na home |
| `trimester` | `1`, `2` ou `[1, 2]` | Filtro “1º / 2º / Ambos” na home |

### `content/lessons.json`

Array ordenado pela app por `order` **por disciplina**. Cada entrada:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `discipline` | string | **Obrigatório.** Slug da disciplina (chave em `disciplines.json`) |
| `slug` | string | **Obrigatório.** Identificador da aula na URL (`a=`) — único **por disciplina** |
| `title` | string | Título na lista e na página |
| `order` | number | Ordem dentro da disciplina |
| `file` | string | Caminho do Markdown relativamente a `content/`, normalmente `disciplina/nome-ficheiro.md` |

A função `getLesson(lessons, disciplineSlug, lessonSlug)` procura **par** `(discipline, slug)`. Não há validação automática de duplicados no runtime: duas entradas com o mesmo par podem causar comportamento imprevisível; a primeira encontrada por `Array.prototype.find` “ganha”.

---

## Como adicionar uma nova aula

1. **Garantir disciplina**  
   O `slug` em `disciplines.json` deve existir. Se for disciplina nova, acrescente um objeto completo em `disciplines.json` **antes** de referenciar em `lessons.json`.

2. **Criar o ficheiro Markdown**  
   Caminho sugerido: `content/<slug-disciplina>/aula-XX-titulo-curto.md` (convenção do repositório; não é imposta pelo código).

3. **Registar em `content/lessons.json`**  
   Adicione um objeto ao array, com `discipline`, `slug`, `title`, `order` e `file` coerentes com o passo anterior.

4. **(Recomendado) Atualizar `content/search-index.json`**  
   Para a pesquisa na home incluir termos do corpo da aula, adicione uma entrada com chave lógica `discipline/slug` (ver secção [Índice de pesquisa](#índice-de-pesquisa-search-indexjson)).

5. **(Opcional) Trilha na página da disciplina**  
   Se existir `content/<disciplina>/study-path.json`, pode listar passos `lesson` ou `exercises` (ver secção [Trilha opcional](#trilha-opcional-study-pathjson)).

6. **Testar localmente**  
   Servidor HTTP estático na raiz do repo; abrir `disciplina.html?d=<slug>` e a nova aula, ou `aula.html?d=<slug>&a=<slug-aula>`.

**Exemplo mínimo de entrada em `lessons.json`:**

```json
{
  "discipline": "python",
  "slug": "minha-nova-aula",
  "title": "Título visível na plataforma",
  "order": 42,
  "file": "python/minha-nova-aula.md"
}
```

---

## Como verificar se uma aula já existe

### 1. Chave canónica: disciplina + slug

Uma aula “existe” na plataforma se existir em `lessons.json` um objeto cujo par `(discipline, slug)` corresponde ao que pretende usar. A URL será:

`public/aula.html?d=<discipline>&a=<slug>` (ou `aula.html?...` a partir da raiz, conforme o servidor).

### 2. Verificação no repositório (grep / editor)

- Abra `content/lessons.json` e procure `"slug": "o-seu-slug"` **junto** com `"discipline": "a-mesma-disciplina"`.
- O mesmo `slug` **pode** repetir-se noutra disciplina (URLs diferentes); só é problema se a intenção for URL globalmente única.

### 3. Verificação do ficheiro físico

- Confirme que o caminho em `file` existe sob `content/` (respeitando maiúsculas/minúsculas).

### 4. Duplicados acidentais

- Procure dois objetos com o **mesmo** `discipline` e **mesmo** `slug`: deve haver no máximo um.
- Slugs duplicados na **mesma** disciplina com `order` diferentes: erro de dados; remova ou renomeie.

### 5. Frontmatter vs `lessons.json`

Alguns `.md` incluem `slug:` no YAML. **Quem manda na navegação é `lessons.json`.** Se o frontmatter disser um slug e o JSON outro, a URL válida é a do JSON. Mantenha ambos alinhados para evitar confusão.

---

## Markdown das aulas (frontmatter e corpo)

O parser está em `public/js/markdown.js` (`parseFrontmatter`). Campos comuns observados no repositório:

| Chave | Uso |
|-------|-----|
| `title` | Metadados / consistência (o título principal na UI vem de `lessons.json`) |
| `slug`, `discipline`, `order` | Documentação; não substituem o registo em `lessons.json` |
| `reading_time` / `readingMinutes` | Informação pedagógica no frontmatter (nomes variam entre aulas) |
| `concepts` | Lista usada na página da aula para cruzar com exercícios |
| `exercises` | Lista de objetos com `question`, `answer`, `hint` — injetados como blocos `<details>` no final |
| `tests` | Estrutura YAML mais rica para cenários com casos de teste (quando usados) |

Blocos de código com linguagem `mermaid` são convertidos para diagramas. Listas sob um H3 que contém **“Checklist de domínio”** tornam-se checklist interativa com estado em localStorage.

---

## Índice de pesquisa (`search-index.json`)

A home (`initHome` em `app.js`) combina:

- título da aula (`lessons.json`);
- título da disciplina e nome do professor (`disciplines.json`);
- texto em `search-index.json` para cada par `discipline/slug`.

Cada elemento do índice tem a forma:

```json
{
  "discipline": "slug-da-disciplina",
  "slug": "slug-da-aula",
  "excerpt": "Texto longo ou resumo pesquisável…"
}
```

A chave interna é `` `${discipline}/${slug}` ``. Se faltar entrada para uma aula nova, a aula **continua acessível** por menu e URL, mas **só** será encontrada na pesquisa pelos campos título/disciplina/professor, não pelo corpo.

---

## Trilha opcional (`study-path.json`)

`fetchStudyPath(disciplineSlug)` em `content.js` tenta carregar `content/<disciplina>/study-path.json`. Se o array existir, `initDisciplina` mostra uma secção extra com passos:

- `{ "type": "lesson", "slug": "<slug da aula>" }` — liga à aula se o slug existir em `lessons.json` para essa disciplina;
- `{ "type": "exercises", "slugs": ["ex-1", "ex-2"] }` — liga a `exercise.html?slug=…`.

Se o ficheiro não existir, a funcionalidade fica omitida (comportamento normal).

---

## Exercícios independentes

Além dos exercícios no YAML da aula, o banco principal está em:

- `content/exercises/exercises.json` — metadados (`slug`, `title`, `difficulty`, `concepts`, `discipline`, `file`, `order`, …);
- `content/exercises/<ficheiro>.md` — enunciado em Markdown; secção **Solução** separa o texto de apoio.

Cada `slug` em `exercises.json` deve ser **único** no array. A página `exercise.html?slug=...` carrega o registo e o ficheiro referenciado.

Para **adicionar** um exercício novo: crie o `.md`, acrescente a entrada em `exercises.json`, e garanta que `discipline` corresponde a um slug em `disciplines.json` (para filtros e consistência).

---

## URLs e roteamento

| Página | Parâmetros |
|--------|------------|
| Home | `index.html` |
| Disciplina | `public/disciplina.html?d=<slug-disciplina>` |
| Aula | `public/aula.html?d=<slug-disciplina>&a=<slug-aula>` |
| Lista de exercícios | `public/exercises.html` |
| Exercício | `public/exercise.html?slug=<slug-exercício>` |

`Router.pagePath` prefixa `public/` quando a página atual não está sob `/public/`, para links corretos a partir da raiz.

---

## Estado local (progresso do utilizador)

Definido em `public/js/state.js` (chaves `localStorage` prefixadas `iss-`):

- Aulas lidas: `disciplineSlug + '_' + lessonSlug`;
- Exercícios concluídos, revisões, checklists por aula, streak de dias, conquistas.

Não há sincronização com servidor: limpar dados do site remove o progresso.

---

## Executar o projeto localmente

Na raiz do repositório, sirva ficheiros estáticos. Exemplos:

```bash
python -m http.server 8000
```

```bash
npx serve .
```

Abra o URL indicado (ex.: `http://localhost:8000`) e use `index.html` como entrada.

**Deploy GitHub Pages:** o site publicado costuma usar a raiz do repo; mantenha caminhos relativos como no código atual.

---

## Checklist de contribuição

- [ ] `disciplines.json` — disciplina referenciada existe e `slug` está correto  
- [ ] `lessons.json` — par `(discipline, slug)` único; `file` aponta para ficheiro existente  
- [ ] Markdown válido; frontmatter fechado com `---`  
- [ ] `search-index.json` atualizado se a pesquisa full-text for importante  
- [ ] Exercícios: `exercises.json` + `.md` coerentes, `slug` único  
- [ ] Testar `aula.html` e links “anterior / próxima” dentro da disciplina  
- [ ] Pull request com descrição clara (convenção do `README.md` do projeto)

---

*Documento gerado com base no código em `public/js/` e nos ficheiros em `content/` do repositório ISS.*
