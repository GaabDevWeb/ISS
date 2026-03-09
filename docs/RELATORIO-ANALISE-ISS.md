# Relatório de Análise — ISS (Interactive Study System)

**Objetivo:** Avaliar o projeto sob as dimensões de produto educacional, UX/UI, arquitetura técnica e escalabilidade de conteúdo, e propor melhorias que elevem o ISS de *site de resumos e exercícios* para *plataforma completa de aprendizado de programação*.

---

## 1. Diagnóstico geral do projeto

O ISS é uma **LXP estática** (Learning Experience Platform) front-end only: aulas em Markdown, metadados em JSON, persistência em `localStorage`. A estrutura atual cobre bem o ciclo **ler aula → marcar lida → praticar com exercícios no editor** e oferece estatísticas agregadas (funil aula×exercício, atividade, maior lacuna). O valor educacional está na **revisão guiada** (resumos, checklists, exercícios sugeridos por aula) e na **prática fora do site** (copiar enunciado, resolver no editor, marcar concluído).

**Conclusão:** O projeto já entrega valor claro para revisão e prática; as maiores oportunidades estão em **recomendação inteligente**, **feedback no ciclo de estudo** e **escalabilidade do conteúdo** sem aumentar a complexidade operacional.

---

## 2. Pontos fortes atuais

| Área | Pontos fortes |
|------|----------------|
| **Conteúdo** | Aulas com estrutura padronizada (Resumo, Explicações, Exercícios no frontmatter), conceitos no frontmatter onde existem, exercícios com enunciado + solução colapsável e vínculo por disciplina/conceito. |
| **UX** | Pesquisa em tempo real, “Continuar a ler”, progresso na home e na disciplina, filtros por conceito/dificuldade/resolvido, exercício aleatório (priorizando não resolvidos), modo foco na aula, índice “Nesta página”, checklists persistidas, confirmação antes de mostrar solução. |
| **Arquitetura** | Sem build: Markdown + JSON + fetch; fácil de hospedar (GitHub Pages); estado concentrado em poucas chaves de `localStorage`; Router simples e previsível. |
| **Dados** | `disciplines.json`, `lessons.json`, `exercises.json`, `search-index.json` bem definidos; exercícios com `concepts`, `difficulty`, `discipline` permitem filtros e sugestões. |
| **Estatísticas** | Métricas de impacto (maior lacuna, taxa de abandono, tempo estimado), gráficos (atividade 30 dias, dificuldade, radar por disciplina, funil), diagnóstico (“Mentalidade de Tubarão” / “zona de conforto”) e alertas de dívida prática. |

---

## 3. Principais limitações

### 3.1 Produto educacional
- **Nenhum vínculo explícito aula ↔ exercício no modelo de dados:** a sugestão “Chega de teoria. Hora de codar!” usa só `frontmatter.concepts` da aula; muitas aulas não têm `concepts` no frontmatter, então a recomendação fica incompleta ou vazia.
- **Exercícios “gerados automaticamente”:** são os Q&A no frontmatter das aulas (question/answer/hint), exibidos na própria aula; não há geração dinâmica de exercícios a partir do conteúdo.
- **“Treino de conceitos fracos” e “níveis de prática”:** não existem como fluxos dedicados; há “exercício aleatório” e estatísticas (maior lacuna, abandono), mas não há uma página ou modo “treinar conceitos fracos” nem níveis (ex.: iniciante/intermediário) além de easy/medium/hard por exercício.
- **Sem spaced repetition nem “próxima revisão”:** não há lógica de repetição espaçada nem sugestão do tipo “revisar esta aula / estes conceitos daqui a X dias”.

### 3.2 UX/UI
- **Inconsistência de tema:** `stats.html` usa `style="background-color: #1a1a1a"` e `#242424` inline em vez dos tokens CSS (`--color-background`, `--color-surface`), quebrando a manutenção do tema.
- **Home com lógica de cards frágil:** `initHome()` monta um grid fixo (dashboard, continuar, 2 disciplinas, placeholder, mais 2 disciplinas, placeholder, exercícios) com `slice(0,2)` e `slice(2,4)`; ao aumentar o número de disciplinas, o layout não escala de forma semântica.
- **Navegação para estatísticas:** só a partir do card “Seu progresso” na home; não há link no header para Estatísticas, o que reduz descoberta.
- **Exercícios:** não há indicação de “exercícios sugeridos para esta aula” na lista de exercícios (só na própria aula); falta atalho “treinar conceitos desta aula” a partir da página de exercícios.

### 3.3 Arquitetura
- **Duplicação de lógica:** `getReadLessonIds`, `getCompletedExerciseSlugs`, `formatDurationMinutes` existem em mais de um ficheiro (`app.js`, `stats.js`, `exercises.js`, `read-lessons.js`); qualquer mudança de contrato exige tocar em vários sítios.
- **Sem camada de dados unificada:** não há um módulo “state” ou “progress” que centralize leitura/escrita de `localStorage` e exponha uma API única para home, disciplina, aula, exercícios e stats.
- **Dependências globais:** `escapeHtml`, `getParam`, `Router`, `fetchDisciplines`, `fetchLessons`, `getLesson`, `getDiscipline`, etc. são assumidos como globais; em páginas que não carregam todos os scripts (ex.: stats não carrega `read-lessons.js` nem `exercises.js`), há risco de referência indefinida se o HTML mudar.
- **README desatualizado:** não documenta `exercises.html`, `exercise.html`, `stats.html`, nem as chaves `iss-exercises-completed` e `iss-checklist`; descreve apenas 3 páginas e 3 chaves de estado.

### 3.4 Escalabilidade de conteúdo
- **Conceitos nas aulas inconsistentes:** só parte das aulas tem `concepts` no frontmatter; sem isso, sugestões de exercícios por aula e futuras features (ex.: “treino por conceito”) ficam limitadas.
- **search-index.json:** precisa ser gerado/atualizado à mão ou por script; não há pipeline documentado para “nova aula → atualizar índice”.
- **Exercícios só Python:** `exercises.json` tem apenas `discipline: "python"`; disciplinas como visualizacao-sql e projeto-bloco não têm exercícios de programação no mesmo formato, o que limita o funil e o radar por disciplina.

---

## 4. Sugestões de melhoria priorizadas

Cada sugestão segue o formato: **Nome**, **Descrição**, **Problema que resolve**, **Impacto**, **Complexidade**, **Prioridade**.

---

### 4.1 Treino por “conceitos fracos” (Maior Lacuna + conceitos)

**Descrição:** Nova página ou secção “Treino focado” (acessível da home e das estatísticas) que, com base em “Sua Maior Lacuna” e nos conceitos das aulas já lidas, sugira exercícios não resolvidos cujos conceitos tenham menos prática (ex.: mais aulas lidas que exercícios feitos por aquele conceito).

**Problema que resolve:** Hoje “Maior Lacuna” aponta só a disciplina; o utilizador não tem um fluxo claro “treinar exatamente onde estou fraco”. Esta feature fecha o ciclo: estatística → ação de estudo.

**Impacto no projeto:** Alto (diferencia o ISS como plataforma que guia a prática).

**Complexidade de implementação:** Média (requer conceitos por aula consistentes, agregação por conceito e UI de lista/atalho).

**Prioridade recomendada:** Curto prazo.

---

### 4.2 Vínculo explícito aula ↔ exercícios no conteúdo

**Descrição:** No frontmatter das aulas, adicionar campo opcional `linkedExercises: [slug1, slug2, ...]` (ou em `lessons.json`: `exercises: [slug1, ...]`). Na aula, “Chega de teoria. Hora de codar!” usa essa lista quando existir; senão, fallback para a lógica atual por `concepts`. Nos exercícios, permitir `linkedLessons: [discipline/slug]` para “Ver aula relacionada”.

**Problema que resolve:** A recomendação de exercícios por aula deixa de depender só de `concepts` (que falta em várias aulas) e passa a ser controlada por quem edita o conteúdo; bidirecionalidade melhora navegação aula ↔ exercício.

**Impacto no projeto:** Alto (melhora aprendizado direcionado e escalabilidade do conteúdo).

**Complexidade de implementação:** Média (esquema de dados + atualização de aulas/exercícios existentes + JS para resolver links).

**Prioridade recomendada:** Curto prazo.

---

### 4.3 Camada de estado/progresso unificada

**Descrição:** Criar um módulo (ex.: `js/state.js` ou `js/progress.js`) que seja a única fonte de verdade para: aulas lidas, exercícios concluídos (com timestamp), checklists, última visita. Todas as páginas e scripts leem/escrevem via essa API. Constantes de chaves de `localStorage` e formatos ficam num só lugar.

**Problema que resolve:** Elimina duplicação e inconsistência entre `app.js`, `stats.js`, `exercises.js`, `read-lessons.js`; facilita evoluções (ex.: export/import de progresso, ou futura sincronização opcional).

**Impacto no projeto:** Médio (menos bugs, manutenção mais simples).

**Complexidade de implementação:** Média (refactor sem quebrar páginas atuais).

**Prioridade recomendada:** Curto prazo.

---

### 4.4 Estatísticas acessíveis pelo header + tema unificado

**Descrição:** Adicionar link “Estatísticas” no header de todas as páginas (ao lado ou perto do GitHub). Remover estilos inline de `stats.html` e usar as mesmas classes e tokens do `styles.css` (ex.: `--color-background`, `--color-surface`) para fundo e cards.

**Problema que resolve:** Estatísticas ficam descobertas e o tema escuro fica consistente e fácil de manter.

**Impacto no projeto:** Baixo a médio (UX e consistência visual).

**Complexidade de implementação:** Baixa.

**Prioridade recomendada:** Agora.

---

### 4.5 Atalho “Treinar desta aula” na lista de exercícios

**Descrição:** Na página de exercícios, quando o utilizador chega com parâmetros (ex.: `?d=python&a=variaveis-tipos`), mostrar um banner ou secção “Exercícios sugeridos para a aula atual” no topo, com os mesmos exercícios que aparecem no final da aula, e link “Abrir aula” para contexto.

**Problema que resolve:** Quem está na lista de exercícios mas queria praticar o que viu numa aula ganha um caminho direto sem voltar à aula.

**Impacto no projeto:** Médio (reduz fricção no ciclo aula → prática).

**Complexidade de implementação:** Baixa (reutilizar lógica de sugestão por aula + query params).

**Prioridade recomendada:** Agora.

---

### 4.6 Preencher `concepts` em todas as aulas

**Descrição:** Auditar aulas sem `concepts` no frontmatter e preencher com lista de conceitos (alinhada aos tags usados nos exercícios). Pode ser feito por script (extração a partir de títulos e resumo) ou manualmente com guia; o importante é deixar o campo presente e coerente com `exercises.json`.

**Problema que resolve:** Permite que sugestões por conceito, “treino por conceitos fracos” e futuras features baseadas em conceitos funcionem em todas as disciplinas.

**Impacto no projeto:** Alto (habilita várias melhorias de recomendação).

**Complexidade de implementação:** Média (trabalho de conteúdo + possível automação).

**Prioridade recomendada:** Curto prazo.

---

### 4.7 Revisão espaçada (Spaced repetition) opcional

**Descrição:** Para aulas e/ou conceitos, guardar “última revisão” (e opcionalmente “próxima revisão sugerida”). Na home ou numa secção “Revisar”, mostrar itens que passaram X dias desde a última leitura ou que estão “vencidos” segundo um algoritmo simples (ex.: 1, 3, 7 dias). Sem backend: tudo em `localStorage`.

**Problema que resolve:** Aumenta retenção ao sugerir *quando* revisar, não só *o quê*.

**Impacto no projeto:** Alto (valor educacional forte).

**Complexidade de implementação:** Alta (modelo de dados, UI, regras de intervalo).

**Prioridade recomendada:** Médio prazo.

---

### 4.8 Home escalável (grid por dados)

**Descrição:** Construir o grid da home a partir dos dados: sempre “Seu progresso”; “Continuar a ler” se houver; depois todos os cards de disciplinas em loop; por fim card de Exercícios. Remover placeholders fixos e slices hardcoded (0–2, 2–4).

**Problema que resolve:** Ao adicionar novas disciplinas, a home reflete a lista sem alterar código.

**Impacto no projeto:** Médio (escalabilidade e clareza do código).

**Complexidade de implementação:** Baixa.

**Prioridade recomendada:** Agora.

---

### 4.9 Pipeline para search-index e consistência de metadados

**Descrição:** Documentar (e se possível automatizar) o fluxo “nova aula ou alteração de aula → atualizar `search-index.json`” (ex.: script Node que lê `lessons.json` e os `.md`, gera excerpt e escreve o índice). Opcional: script que valida `concepts` das aulas contra os conceitos usados em `exercises.json`.

**Problema que resolve:** Reduz risco de pesquisa desatualizada e de inconsistência entre aulas e exercícios.

**Impacto no projeto:** Médio (escalabilidade e qualidade do conteúdo).

**Complexidade de implementação:** Média (scripts + docs).

**Prioridade recomendada:** Médio prazo.

---

### 4.10 Modo “só exercícios” (treino contínuo)

**Descrição:** Na página de exercícios, opção “Modo treino”: ao marcar um exercício como resolvido, avançar automaticamente para o próximo (aleatório ou por ordem) sem voltar à lista, com opção de encerrar o treino. Persistir “sessão de treino” (quantos fez na sessão) para exibir na home ou em stats.

**Problema que resolve:** Quem quer “sessão de prática” sem cliques repetidos na lista ganha um fluxo contínuo e sensação de progresso (ex.: “5 exercícios nesta sessão”).

**Impacto no projeto:** Médio (aumenta engajamento na prática).

**Complexidade de implementação:** Média (nova UX na página de exercício + estado de sessão).

**Prioridade recomendada:** Médio prazo.

---

### 4.11 Exercícios de outras disciplinas (SQL, etc.)

**Descrição:** Estender o formato de exercícios (enunciado + solução em Markdown) para disciplinas como visualizacao-sql e projeto-bloco (ex.: exercícios de SQL, perguntas de revisão com resposta no frontmatter). Incluir em `exercises.json` com `discipline` correspondente.

**Problema que resolve:** Estatísticas e funil passam a refletir todas as disciplinas; alunos dessas disciplinas também têm “prática” no ISS.

**Impacto no projeto:** Alto (plataforma multi-disciplina).

**Complexidade de implementação:** Alta (conteúdo novo + eventual adaptação de UI por tipo de exercício).

**Prioridade recomendada:** Médio a longo prazo.

---

### 4.12 Documentação (README e Sobre) atualizada

**Descrição:** Atualizar README com: todas as páginas (incl. `exercises.html`, `exercise.html`, `stats.html`), tabela de chaves de `localStorage` (incl. `iss-exercises-completed`, `iss-checklist`), fluxo aula → exercícios sugeridos e onde as estatísticas são calculadas. Opcional: secção “Como adicionar uma aula” / “Como adicionar um exercício” com exemplos.

**Problema que resolve:** Novos contribuidores e utilizadores entendem o sistema completo; menos dúvidas e erros ao tocar em estado ou conteúdo.

**Impacto no projeto:** Médio (onboarding e manutenção).

**Complexidade de implementação:** Baixa.

**Prioridade recomendada:** Agora.

---

## 5. Roadmap sugerido de evolução

| Fase | Foco | Entregas |
|------|------|----------|
| **Imediato** | Consistência e descoberta | Estatísticas no header; tema unificado em `stats.html`; home escalável por dados; atalho “Treinar desta aula” na lista de exercícios; README e docs atualizados. |
| **Curto prazo** | Dados e recomendação | Camada de estado unificada; vínculo explícito aula ↔ exercícios; preencher `concepts` em todas as aulas; feature “Treino por conceitos fracos” (página ou secção). |
| **Médio prazo** | Retenção e fluxo de prática | Revisão espaçada (aulas/conceitos); modo “só exercícios” (treino contínuo); pipeline para `search-index` e validação de metadados. |
| **Longo prazo** | Conteúdo e plataforma | Exercícios para outras disciplinas (SQL, etc.); possíveis melhorias de acessibilidade e performance (ex.: lazy load de listas grandes). |

---

## 6. Resumo executivo

- **Pontos fortes:** Conteúdo estruturado, boa UX de revisão e prática, arquitetura simples e estática, estatísticas úteis.
- **Gaps principais:** Vínculo aula↔exercício frágil, conceitos ausentes em várias aulas, ausência de “treino por conceitos fracos” e de revisão espaçada, duplicação de lógica de estado, README desatualizado.
- **Prioridades imediatas:** Link Estatísticas no header, tema unificado, home escalável, atalho “Treinar desta aula”, documentação.
- **Próximo salto de valor:** Estado unificado, vínculos explícitos e `concepts` completos; em seguida “Treino por conceitos fracos” e revisão espaçada para aproximar o ISS de uma **plataforma completa de aprendizado de programação** com foco em retenção e prática guiada.

---

*Relatório gerado com base na análise do código e do conteúdo do repositório ISS.*
