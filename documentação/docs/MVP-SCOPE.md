# ISS (infetStudentsSummary) — Escopo do MVP

## Objetivo do MVP

Lançar uma versão **simples, funcional e bem estruturada** da ISS, focada em:

- Fornecer resumos e exercícios de forma clara e acessível
- Revisão rápida, confiável e fácil de manter
- Zero complexidade de backend, auth, progresso ou colaboração

---

## O que ESTÁ no MVP

### Must have (obrigatório)

| Item | Descrição |
|------|------------|
| **Acesso 100% aberto** | Sem login, autenticação ou bloqueio; conteúdo público. |
| **Navegação** | Home com lista de disciplinas → ao clicar, lista de aulas da disciplina → ao clicar, página da aula. |
| **Página de aula** | Uma página por aula contendo: (1) resumo estruturado, (2) explicações complementares quando houver, (3) exercícios mentais. |
| **Exercícios** | Pergunta visível; resposta sugerida ou dicas em bloco expandível (ex.: details/summary ou componente leve). Sem correção automática, pontuação ou conta. |
| **Conteúdo em Markdown e JSON** | Conteúdo em `content/`: disciplines.json, lessons.json e ficheiros .md por aula (frontmatter + Resumo, Explicações; exercícios no frontmatter). |
| **Stack** | HTML5 + Tailwind CSS + JavaScript + Alpine.js + Marked.js + Highlight.js; site 100% estático; hospedagem em GitHub Pages, Cloudflare Pages ou equivalente. |
| **Layout** | Limpo, legível, responsivo; foco em leitura. |

### Should have (desejável)

| Item | Descrição |
|------|------------|
| **Índice/âncoras na página de aula** | Links no topo para ir direto a Resumo, Explicações e Exercícios. |
| **Ordenação explícita** | Aulas listadas em ordem definida (frontmatter ou convenção de nomes). |

### Could have (se der tempo)

| Item | Descrição |
|------|------------|
| **Filtro ou ordenação** | Ex.: ordenar aulas por data ou número na listagem (se os metadados suportarem). |

---

## O que NÃO está no MVP

| Fora do escopo | Motivo |
|----------------|--------|
| **Login / autenticação** | Acesso aberto é requisito; reduz complexidade. |
| **Banco de dados / Supabase** | Conteúdo 100% estático (Markdown + JSON em `content/`). |
| **Backend / API** | Apenas ficheiros estáticos; conteúdo carregado no cliente via fetch. |
| **Progresso ou pontuação** | Objetivo é reforço, não avaliação. |
| **Colaboração / contribuições** | Curadoria única no MVP. |
| **Comentários / fórum** | Não faz parte do escopo de revisão rápida. |
| **Busca global** | Navegação por disciplinas e aulas é suficiente no lançamento. |
| **Múltiplas instituições** | Um único repositório, contexto INFET. |
| **CMS externo** | Conteúdo editado via Markdown e JSON no projeto. |
| **Frameworks pesados (React, Next, Astro, etc.)** | MVP usa HTML + Tailwind + JS + Alpine; sem build obrigatório. |
| **shadcn/ui obrigatório** | Opcional; prioridade é interface limpa e simples. |

---

## Justificativa das decisões de escopo

- **Estático (HTML + Markdown + JSON):** Alinha com “sem backend, sem DB”; deploy como ficheiros estáticos; conteúdo sob controle direto no repo.
- **Sem auth:** Maximiza adoção e reduz custo de desenvolvimento e manutenção.
- **Exercícios só com expandível:** Reforça aprendizado sem implementar correção ou pontuação.
- **4 disciplinas, ~8–20 aulas cada:** Volume gerenciável pela curadoria única; estrutura permite crescer depois.
- **Sem CMS:** Menos dependências; conteúdo versionado no Git; adequado ao volume inicial.

---

## Hipóteses a validar com o MVP

1. **Uso:** Os estudantes passam a usar a ISS como ponto principal de revisão em vez de material fragmentado.
2. **Formato:** Uma página por aula (resumo + explicações + exercícios) é suficiente e não sobrecarrega.
3. **Expandível:** O padrão “pergunta → expandir resposta sugerida” ajuda no reforço sem necessidade de correção automática.
4. **Sustentabilidade:** Manter 4 disciplinas com ~8–20 aulas cada é viável para a curadoria única.

---

## Métricas de sucesso do MVP

- **Conteúdo publicado:** 4 disciplinas com pelo menos algumas aulas cada (meta: ~8–20 por disciplina ao longo do tempo).
- **Disponibilidade:** Site no ar em GitHub Pages, Cloudflare Pages ou equivalente, estável e rápido.
- **Uso:** Acessos às páginas de aula pelos estudantes (pode ser via analytics opcional posterior).
- **Manutenção:** Novas aulas e ajustes feitos via Markdown/JSON e deploy (push ou upload) sem atrito.

---

## Stack e arquitetura (resumo)

| Aspecto | Decisão |
|---------|---------|
| Páginas | HTML5 (index.html, disciplina.html, aula.html) |
| Estilos | Tailwind CSS |
| Conteúdo | Markdown + JSON em `content/`; Marked.js + Highlight.js no cliente |
| Interatividade | Alpine.js (expandíveis dos exercícios) |
| Hospedagem | GitHub Pages, Cloudflare Pages, Netlify ou servidor estático |
| Arquitetura | Site 100% estático; conteúdo carregado via fetch |
| UI | Limpa, rápida, simples; shadcn/ui opcional |

---

*Documento alinhado ao MVP estático da ISS. Stack: HTML5 + Tailwind + JS + Alpine + Marked + Highlight (documentação/agents/frontEnd.md); sem backend/DB/auth.*
