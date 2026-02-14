# ISS (infetStudentsSummary) — Product Requirements Document

## 1. Visão geral do produto

A ISS é uma plataforma web **100% estática** de revisão rápida para estudantes universitários. Ela centraliza, por disciplina e por aula:

- Resumos estruturados do conteúdo
- Explicações complementares quando necessário
- Exercícios mentais simples com pergunta visível e resposta sugerida/dicas em formato expandível

Tudo em **uma única página por aula**, sem login, sem progresso, sem pontuação. O objetivo é ser um repositório confiável, fácil de manter e de acessar, focado em reforço do entendimento.

**Stack e arquitetura (MVP):**

- **Páginas:** HTML5 (index.html, disciplina.html, aula.html)
- **Estilos:** Tailwind CSS
- **Conteúdo:** Markdown em `content/` + JSON (disciplines.json, lessons.json); renderização no cliente com Marked.js; syntax highlight com Highlight.js
- **Interatividade:** Alpine.js (expandir/recolher exercícios)
- **Hospedagem:** GitHub Pages, Cloudflare Pages, Netlify ou qualquer servidor de ficheiros estáticos
- **Arquitetura:** site 100% estático; conteúdo carregado via fetch; sem backend, banco de dados ou autenticação

---

## 2. Personas

### Persona principal: Estudante em revisão

- **Contexto:** Curso no INFET (ou instituição de origem); precisa revisar após a aula.
- **Objetivo:** Reforçar conceitos em pouco tempo, sem ter que reunir anotações, slides e PDFs.
- **Comportamento:** Acessa de qualquer dispositivo, sem criar conta; navega por disciplina → aula → lê resumo e faz exercícios mentais.
- **Resultado esperado:** Entender melhor os pontos principais e ter uma referência clara (resposta sugerida) para validar o próprio raciocínio.

### Persona secundária: Curador de conteúdo (você)

- **Contexto:** Produz resumos e exercícios a partir das aulas.
- **Objetivo:** Manter a ISS atualizada e consistente com esforço sustentável.
- **Comportamento:** Edita conteúdo via ficheiros Markdown e JSON em `content/`; deploy como site estático (push para repo ou upload).
- **Resultado esperado:** Plataforma simples de manter, sem CMS nem backend.

---

## 3. User stories

- Como **estudante**, quero **ver uma lista de disciplinas disponíveis** para **escolher o que revisar**.
- Como **estudante**, quero **ver a lista de aulas de uma disciplina** para **acessar uma aula específica**.
- Como **estudante**, quero **ler o resumo estruturado da aula** para **relembrar os conceitos principais**.
- Como **estudante**, quero **ler explicações complementares** para **aprofundar onde necessário**.
- Como **estudante**, quero **ver apenas a pergunta dos exercícios primeiro** para **testar meu entendimento**.
- Como **estudante**, quero **expandir e ver a resposta sugerida ou dicas** para **confirmar se pensei corretamente**.
- Como **curador**, quero **editar conteúdo em Markdown e JSON** para **manter a ISS atualizada sem depender de CMS**.

---

## 4. Requisitos funcionais

### 4.1 Navegação

| ID | Requisito | Critério de aceitação |
|----|-----------|------------------------|
| RF-01 | Home/listagem de disciplinas | Página inicial exibe todas as disciplinas disponíveis; cada uma leva à listagem de aulas da disciplina. |
| RF-02 | Listagem de aulas por disciplina | Ao escolher uma disciplina, o usuário vê a lista de aulas (título e, se aplicável, ordem/número); cada item leva à página da aula. |
| RF-03 | URL estável e legível | Cada disciplina e cada aula possuem URL previsível (ex.: `/disciplina.html?d=python`, `/aula.html?d=python&a=introducao` ou equivalente). |

### 4.2 Página de aula

| ID | Requisito | Critério de aceitação |
|----|-----------|------------------------|
| RF-04 | Resumo estruturado | A página exibe o resumo da aula com hierarquia clara (títulos, tópicos, listas). |
| RF-05 | Explicações complementares | Bloco(s) de explicação adicional quando o conteúdo Markdown assim definir. |
| RF-06 | Exercícios mentais | Seção de exercícios; cada exercício mostra primeiro apenas a pergunta. |
| RF-07 | Resposta sugerida expandível | Cada exercício possui controle (ex.: botão/link “Ver resposta sugerida”) que expande para mostrar resposta sugerida ou pontos principais a considerar. |
| RF-08 | Conteúdo em uma única página | Resumo, explicações e exercícios estão na mesma página; pode haver âncoras/índice para facilitar navegação interna. |

### 4.3 Conteúdo e dados

| ID | Requisito | Critério de aceitação |
|----|-----------|------------------------|
| RF-09 | Conteúdo em Markdown e JSON | Todo o conteúdo está em `content/`: disciplinas e listagem de aulas em JSON; corpo das aulas em ficheiros .md com frontmatter. |
| RF-10 | Metadados por disciplina e aula | Disciplinas em disciplines.json; aulas em lessons.json e frontmatter do .md (título, slug, ordem). |
| RF-11 | Site estático | Sem build obrigatório; conteúdo carregado no cliente via fetch a ficheiros estáticos; não há API nem banco. |

### 4.4 Acesso e uso

| ID | Requisito | Critério de aceitação |
|----|-----------|------------------------|
| RF-12 | Acesso aberto | Não há login, autenticação ou bloqueio; qualquer pessoa com o link acessa todo o conteúdo. |
| RF-13 | Responsividade | Layout utilizável em desktop e mobile (leitura confortável). |

---

## 5. Requisitos não-funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | **Performance:** Páginas estáticas devem carregar rápido; uso mínimo de JS no cliente. |
| RNF-02 | **Disponibilidade:** Hospedagem em Cloudflare Pages ou Vercel com alta disponibilidade. |
| RNF-03 | **Manutenibilidade:** Estrutura de pastas e formato Markdown/JSON clara para facilitar adição/edição de disciplinas e aulas. |
| RNF-04 | **Acessibilidade:** Estrutura semântica e contraste adequados para leitura; expandíveis acessíveis por teclado. |

---

## 6. Integrações

No MVP **não há integrações**. Não há:

- Autenticação (Supabase Auth ou outro)
- Banco de dados (Supabase ou outro)
- CMS externo
- Analytics obrigatório (pode ser adicionado depois via script opcional)

---

## 7. Casos de borda e edge cases

- **Disciplina sem aulas:** Se uma disciplina não tiver aulas em lessons.json, a listagem pode exibir mensagem amigável ou não exibir a disciplina na home até haver pelo menos uma aula.
- **Aula muito longa:** Uma única página pode ficar extensa; garantir hierarquia clara e, se necessário, índice/âncoras no topo.
- **Ordem de aulas:** Ordenação pelo campo `order` em lessons.json (e no frontmatter do .md); usar consistentemente na listagem.
- **Expandível:** Preferir Alpine.js para expandir/recolher; alternativa `<details>/<summary>` para funcionar sem JS; acessível por teclado.

---

## 8. Critérios de aceitação por feature

- **Home:** Exibe lista de disciplinas (a partir de disciplines.json); links para disciplina.html com parâmetro; sem erros.
- **Listagem de aulas:** Exibe aulas da disciplina na ordem definida (lessons.json); links levam à aula.html com parâmetros.
- **Página de aula:** Carrega o .md correspondente; renderiza resumo e explicações com Marked.js; exercícios (do frontmatter) com pergunta visível e bloco expandível (Alpine.js ou details/summary).
- **Expandíveis:** Funcionam com Alpine.js (ou details/summary); acessíveis por teclado.
- **Deploy:** Site estático (HTML + JS + CSS + content/) disponível em GitHub Pages, Cloudflare Pages ou equivalente.

---

*Documento alinhado ao MVP estático da ISS. Stack: HTML5 + Tailwind + JavaScript + Alpine.js + Marked.js + Highlight.js; sem backend, DB ou auth. Ver documentação/agents/frontEnd.md.*
