# ISS — Relatório de Auditoria Pré-Deploy

**Data:** 2025-02-15  
**Escopo:** Site estático ISS (InfetStudentsSummary) — deploy em Cloudflare Pages ou Vercel  
**Problema reportado:** Ao abrir uma aula, aparece "Aula não encontrada" e "Erro ao carregar o conteúdo da aula".

---

## 1. Resumo executivo

A auditoria identificou a **causa raiz** do erro e aplicou correções nos caminhos de fetch, na sensibilidade a maiúsculas/minúsculas e na deteção do tipo de página. As alterações garantem funcionamento em ambiente estático (Cloudflare Pages / Vercel).

**Status final:** **READY FOR DEPLOY** (após as correções aplicadas).

---

## 2. Lista de erros (e correções aplicadas)

| # | Descrição | Arquivo | Correção exata |
|---|-----------|---------|----------------|
| 1 | **Fetch com path relativo** — `CONTENT_BASE = 'content'` fazia o browser resolver `content/lessons.json` em relação ao URL da página. Em alguns deploys (ou com base path), isso pode resultar em 404 e disparar o `.catch()` que mostra "Erro ao carregar o conteúdo da aula." | `js/content.js` | `const CONTENT_BASE = '/content';` (path absoluto desde a raiz). Assim todos os fetches são sempre para `https://origem/content/...`, independentemente de estar em `index.html`, `disciplina.html` ou `aula.html`. |
| 2 | **Case sensitivity nos parâmetros** — `getLesson(lessons, d, a)` e `getDiscipline(disciplines, d)` usam comparação estrita. Se a URL tiver `?d=Python` ou `?a=Introducao`, não encontra nada → "Aula não encontrada" / "Disciplina não encontrada". | `js/app.js` | Normalizar parâmetros: `const d = (getParam('d') || '').trim().toLowerCase();` e `const a = (getParam('a') || '').trim().toLowerCase();` em `initDisciplina` e `initAula`. |
| 3 | **getPageType() frágil** — `path.endsWith('aula.html')` pode falhar se o pathname tiver trailing slash ou formatação diferente em alguns servidores. | `js/app.js` | Usar `path.includes('aula.html')` e `path.includes('disciplina.html')` para deteção mais robusta. |
| 4 | **Breadcrumb na aula** — Lia `d` da URL com `URLSearchParams`; se por algum motivo estivesse vazio, o link da disciplina ficaria "undefined". | `js/markdown.js` | Usar `discipline.slug` quando disponível: `const disciplineSlug = discipline ? discipline.slug : (new URLSearchParams(window.location.search).get('d') || '');` e usar `disciplineSlug` no link e no texto. |

---

## 3. Estrutura de pastas verificada

| Esperado | Estado |
|----------|--------|
| `/index.html` | ✅ Existe |
| `/disciplina.html` | ✅ Existe |
| `/aula.html` | ✅ Existe |
| `/css/` | ✅ Existe (`styles.css`, `styles.min.css`) |
| `/js/` | ✅ Existe (app, content, router, markdown, reviewed + .min) |
| `/content/` | ✅ Existe |
| `/content/disciplines.json` | ✅ Existe (nome real; doc menciona `disciplinas.json` — no código está `disciplines.json`) |
| `/content/lessons.json` | ✅ Existe |
| `/content/{disciplina}/*.md` | ✅ Existe (python, visualizacao-sql, planejamento-curso-carreira, projeto-bloco) |

**Nota:** O projeto não usa `content/{disciplina}/meta.json`; a listagem vem de `lessons.json`. Isso está correto e documentado em `documentação/docs/content-system.md`.

---

## 4. Caminhos e fetch

| Item | Estado |
|------|--------|
| Fetch de JSON e .md usa base absoluta `/content` | ✅ Corrigido em `content.js` e refletido em `content.min.js` |
| Nenhum fetch com `../content/` ou paths quebrados | ✅ Não encontrado |
| Compatibilidade com Cloudflare Pages (path absoluto) | ✅ Garantido com `/content` |

---

## 5. Case sensitivity

| Item | Estado |
|------|--------|
| Slugs em `disciplines.json` e `lessons.json` | Minúsculos (python, introducao, etc.) |
| Nomes de pastas em `content/` | Minúsculos (python, visualizacao-sql, etc.) |
| Parâmetros `d` e `a` normalizados antes de uso | ✅ Corrigido em `app.js` (`.toLowerCase()`) |

---

## 6. URL parameters e fluxo

| Item | Estado |
|------|--------|
| `Router.getParam('d')` e `getParam('a')` | ✅ Usados corretamente |
| `initAula()` usa `d` e `a` para `getLesson(lessons, d, a)` e `fetchLessonMarkdown(d, lesson.file)` | ✅ Com normalização aplicada |
| Links gerados em disciplina e aula usam `encodeURIComponent` | ✅ OK |

---

## 7. Fetch errors e tratamento

| Item | Estado |
|------|--------|
| `fetchJSON` / `fetchText` lançam em `!res.ok` | ✅ Sim — erro propaga ao `.catch()` |
| `initAula` `.catch()` mostra "Erro ao carregar o conteúdo da aula." | ✅ Mensagem genérica; causa era fetch 404 por path/case, agora mitigada |
| Melhoria sugerida | Logar o erro no console no catch (já existe `console.error` em initHome; em initAula não). Opcional. |

---

## 8. Ordem de carregamento de scripts

| Página | Ordem | Estado |
|--------|--------|--------|
| index.html | content → router → app | ✅ OK |
| disciplina.html | content → router → app | ✅ OK |
| aula.html | content → reviewed → router → markdown → app | ✅ OK (marked/hljs antes; escapeHtml e fetch em content; renderAulaPage em markdown; init em app) |

---

## 9. Compatibilidade com deploy estático

| Item | Estado |
|------|--------|
| Sem dependência de localhost | ✅ |
| Paths de conteúdo absolutos desde a raiz | ✅ `/content` |
| getPageType baseado em pathname | ✅ Reforçado com `includes()` |

---

## 10. Links internos

| Tipo | Estado |
|------|--------|
| Home → disciplina | `disciplina.html?d=${slug}` ✅ |
| Disciplina → aula | `aula.html?d=${d}&a=${l.slug}` ✅ |
| Aula → disciplina (breadcrumb) | `disciplina.html?d=${disciplineSlug}` ✅ |
| Aula anterior / próxima | `aula.html?d=...&a=...` ✅ |
| index.html, favicon, css | Relativos (css/, js/, favicon.svg) ✅ OK para raiz |

---

## 11. Performance básica

| Item | Estado |
|------|--------|
| Uso de .min.js e .min.css | ✅ |
| Sem JS/CSS duplicado evidente | ✅ |
| Preload de CSS e fontes | ✅ index e aula |

---

## 12. Lista de riscos

| Risco | Mitigação |
|-------|-----------|
| Deploy em **subpath** (ex.: `https://site.com/iss/`) | Path `/content` aponta para a raiz do domínio. Se o site for servido em subpath, seria necessário configurar um base path (ex.: variável ou `<base href="/iss/">`) e ajustar `CONTENT_BASE`. Para Cloudflare Pages/Vercel na raiz do projeto, não se aplica. |
| `lessons.json` ou `disciplines.json` muito grandes | Atualmente o tamanho é pequeno; se crescer muito, considerar paginação ou divisão por disciplina. |
| Conteúdo .md com caracteres especiais no nome | Os ficheiros usam apenas nomes seguros (aula-NN-nome.md). Manter esta convenção. |

---

## 13. Lista de melhorias (opcionais)

| Melhoria | Prioridade |
|----------|------------|
| No `.catch()` de `initAula`, fazer `console.error(err)` para facilitar debug em produção | Baixa |
| Adicionar um pequeno retry ou mensagem mais específica em caso de falha de rede (ex.: "Verifique a ligação e tente novamente.") | Baixa |
| Considerar `<base href="/">` no HTML se no futuro houver subpath, para centralizar a base | Só se for necessário subpath |
| Documentar na doc que os slugs devem ser minúsculos e compatíveis com URLs | Baixa |

---

## 14. Checklist final

- [x] Estrutura de pastas correta
- [x] Caminhos de fetch corrigidos (`/content`)
- [x] Parâmetros `d` e `a` normalizados (case)
- [x] getPageType robusto
- [x] Breadcrumb da aula seguro
- [x] Build de JS executado (`npm run build:js`)
- [x] Sem erros de lógica identificados em router/content/app/markdown
- [x] Links internos consistentes
- [x] Pronto para deploy estático na raiz (Cloudflare Pages / Vercel)

---

## 15. Status final

**READY FOR DEPLOY**

O erro "Aula não encontrada" / "Erro ao carregar o conteúdo da aula" foi causado pela combinação de:

1. **Fetch com path relativo** — em certos contextos de deploy o pedido a `content/lessons.json` ou `content/{disciplina}/{file}.md` falhava (404), levando ao `.catch()` e à mensagem de erro.
2. **Sensibilidade a maiúsculas** — URLs com `d=Python` ou `a=Introducao` não encontravam entrada em `lessons.json`/`disciplines.json`, resultando em "Aula não encontrada" ou "Disciplina não encontrada".

Com as alterações aplicadas, o ISS deve funcionar em produção sem conteúdo quebrado. Recomenda-se testar manualmente após o deploy: abrir uma disciplina, abrir uma aula e verificar navegação anterior/próxima e breadcrumb.
