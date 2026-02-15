---
title: "Metodologias de Projeto (Ágil e Tradicional) e Ferramentas de Trabalho"
slug: "metodologias-ferramentas"
discipline: "projeto-bloco"
order: 2
description: "Scrum, Kanban, papéis (Scrum Master, PO), etapas tradicionais, CMMI, e ferramentas de banco de dados no dia a dia."
exercises:
  - question: "Qual a função do Scrum Master na Squad e como ele se diferencia do Product Owner?"
    answer: "Scrum Master: facilita o ritual ágil, remove impedimentos, ajuda a equipe quando está enroscada; não é gestor. Product Owner (PO): ligação da Squad com o mercado/cliente; traz demandas e prioridades; pode mudar prioridades do backlog; perfil mais 'comercial'."
    hint: "Um ajuda a destravar; o outro traz o que construir."
  - question: "Dentro de uma sprint de duas semanas, o que precisa caber além do desenvolvimento?"
    answer: "Além do desenvolvimento: análise daquele trecho, testes (tester precisa testar), deploy/entrega no fim da sprint. O time combina (ex.: uma semana dev, outra teste) para entregar algo válido no prazo."
  - question: "Quando a metodologia tradicional é obrigatória ou preferível ao ágil?"
    answer: "Quando há regras de formalidade, segurança, governança ou certificação: software de segurança, área militar, projetos com CMMI ou exigência de documentação/assinaturas formais (termo de abertura, proposta, aceitação). Empresas que prestam serviço internacional podem exigir CMMI."
  - question: "Cite três ferramentas de acesso a banco de dados citadas na aula para montar o 'laboratório' de trabalho."
    answer: "DBeaver (multi-banco), pgAdmin (PostgreSQL), SQL Server Management Studio (SQL Server), MongoDB Compass (MongoDB). A ideia é ter as ferramentas abertas e alternar conforme o projeto."
  - question: "Como o DBA se posiciona em relação a Engenharia de Dados e Cientista de Dados?"
    answer: "DBA pode atuar em perfis de infraestrutura, arquitetura ou desenvolvimento. A nomenclatura moderna tende a 'engenheiro de dados' (pipeline, infra, arquitetura) e 'cientista de dados' (valor, algoritmos, análise). O foco do DBA em muitos projetos é só o banco em si; engenheiro de dados pode abranger mais o pipeline."
---
## Resumo

- **Metodologia ágil (visão de mercado)**: histórias de usuário → requisitos → **backlog**; equipe em **Squad** (devs, DBAs, testers, Scrum Master, PO); **daily** (~15 min): o que fez ontem, impedimentos, o que fará hoje; **sprints** de 2–4 semanas com entrega ao final; dentro da sprint cabem análise, desenvolvimento, teste e deploy.
- **Scrum Master**: remove impedimentos, ajuda a equipe, não é gestor; **PO (Product Owner)**: ligação com mercado/cliente, traz prioridades e pode mudar backlog.
- **Scrum** (certificação comum) e **Kanban** (quadro: backlog, desenvolvimento, teste, deploy); **Scrumban** = uso combinado (citado na aula).
- **Ferramentas de gestão**: Jira (muito usada, custo alto), Trello (também utilizada).
- **Metodologia tradicional**: etapas formais — termo de abertura, proposta de projeto, requisitos, planejamento, análise, modelagem, construção, teste, implantação, validação, aceitação; usada onde há obrigatoriedade (segurança, governança, **CMMI**).
- **CMMI**: níveis de maturidade de fábrica de software (1 a 5); níveis altos exigem documentação e formalidade forte.
- **Laboratório de trabalho**: ter ferramentas de banco abertas (DBeaver, pgAdmin, SSMS, MongoDB Compass) e alternar conforme o projeto; MongoDB = banco não relacional, armazenamento em documentos (JSON/BSON).
- **Perfis**: DBA pode ser infra, arquitetura ou desenvolvimento; nomenclatura atual tende a engenheiro de dados / cientista de dados; consultor generalista vs especialista por tecnologia.

**Resumo em 5 linhas**: Ágil usa backlog, Squad, daily e sprints (2–4 semanas) com entrega ao final; Scrum Master tira impedimentos, PO liga ao cliente. Tradicional usa etapas formais e CMMI quando exigido. Ferramentas: Jira/Trello para gestão; DBeaver, pgAdmin, SSMS, Compass para bancos. Montar laboratório com as ferramentas que for usar no dia a dia.

**Palavras-chave**: backlog, Squad, Scrum Master, Product Owner (PO), daily, sprint, Scrum, Kanban, Scrumban, Jira, Trello, metodologia tradicional, CMMI, DBeaver, pgAdmin, SSMS, MongoDB Compass, MongoDB, DBA, engenheiro de dados, cientista de dados.

---

## Explicações

### 1. Tema e escopo

- **Tema**: Metodologias de projeto (ágil em detalhe e tradicional com etapas formais) e ferramentas de trabalho para quem atua com dados/banco (laboratório de ferramentas).
- **Inclui**: papéis na ágil (Scrum Master, PO), rituais (daily, sprints), Scrum/Kanban/Scrumban; etapas da metodologia tradicional e CMMI; ferramentas de gestão (Jira, Trello) e de banco (DBeaver, pgAdmin, SSMS, MongoDB Compass); noção de MongoDB e de perfis (DBA, engenheiro/cientista de dados). **Não inclui**: sintaxe SQL ou Python; passo a passo de instalação de cada ferramenta.

### 2. Contexto na disciplina

- Segunda aula do Projeto de Bloco; depende da aula 1 (conceito de projeto, tradicional vs ágil em macro).
- Pré-requisito: ter visto na aula 1 a diferença entre metodologia tradicional e ágil.
- Dependências futuras: aula 3 aprofunda pipeline de dados, bancos relacionais vs não relacionais e ferramentas de acesso.

### 3. Visão conceitual geral

No mercado, a maior parte dos projetos de desenvolvimento usa **metodologia ágil**: backlog, Squad, daily e sprints curtas (2–4 semanas) com entrega ao final de cada sprint. O **Scrum Master** cuida do ritual e dos impedimentos; o **PO** traz a voz do cliente e as prioridades. A **metodologia tradicional** continua em uso onde há exigência de formalidade (segurança, CMMI, contratos). Para atuar em projetos, é essencial montar um **laboratório**: as ferramentas de banco que você usa no dia a dia (por tecnologia ou multi-banco), além de ferramentas de gestão quando a equipe usar (Jira, Trello).

### 4. Ideias-chave (máx. 7)

1. **Backlog + Squad + daily + sprints** — backlog é o que será feito; Squad é a equipe; daily alinha o dia; sprint é o ciclo de 2–4 semanas com entrega.
2. **Scrum Master remove impedimentos; PO liga ao cliente e prioriza** — não confundir: um é suporte à execução, o outro é voz do negócio.
3. **Dentro da sprint entram análise, desenvolvimento, teste e deploy** — não são “duas semanas só de código”; o time combina divisão (ex.: dev + teste).
4. **Metodologia tradicional com etapas formais** — termo de abertura, proposta, requisitos, planejamento, análise, modelagem, construção, teste, implantação, validação, aceitação; usada onde a formalidade é obrigatória.
5. **CMMI** — níveis de maturidade para fábricas de software; níveis altos exigem documentação e processo muito formal.
6. **Laboratório = ferramentas de banco abertas e prontas** — DBeaver, pgAdmin, SSMS, Compass (MongoDB); quem trabalha com vários bancos pode usar DBeaver ou uma ferramenta por tecnologia.
7. **MongoDB = banco não relacional, documentos (JSON/BSON)** — mais flexibilidade de esquema; linguagem própria, não SQL.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Backlog, Squad e rituais ágeis

- **Backlog**: lista do que precisa ser desenvolvido/entregue na solução; itens priorizados; pode vir de histórias de usuário e requisitos.
- **Squad**: equipe multidisciplinar (devs, DBAs, testers, etc.) com papéis definidos; tamanho nem muito grande nem muito pequeno.
- **Daily**: reunião curta (~15 min), em pé se presencial; cada um diz o que fez ontem, se teve impedimento e o que fará hoje.
- **Sprint**: ciclo de 2–4 semanas (time define); ao final deve haver entrega (release, tela, funcionalidade); dentro da sprint: análise, desenvolvimento, teste e deploy daquele trecho.
- **Erro comum**: achar que na sprint “só desenvolve”; tester precisa testar; deploy também entra no prazo da sprint.
- **Como cai em prova**: identificar papel (Scrum Master vs PO); dizer o que ocorre na daily; duração típica de sprint (2–4 semanas).

#### 5.2 Scrum Master e Product Owner (PO)

- **Scrum Master**: facilita o ritual da metodologia ágil; ajuda a remover impedimentos; não é gestor; levanta bandeira quando há bloqueio para a gestão tratar.
- **PO (Product Owner)**: representa o interesse do produto/cliente; ligação da Squad com o mercado; pode trazer mudanças de prioridade no backlog; perfil muitas vezes “comercial”; pode gerar tensão (mudar prioridades) com o Scrum Master (que protege o ritmo).
- **Reconhecer**: “Quem tira impedimento?” → Scrum Master. “Quem traz demanda do cliente?” → PO.

#### 5.3 Scrum, Kanban e Scrumban

- **Scrum**: metodologia ágil com sprints, backlog, papéis (Scrum Master, PO), reuniões de planejamento e revisão da sprint; certificação comum (ex.: Scrum.org).
- **Kanban**: quadro de fluxo (backlog, em desenvolvimento, teste, deploy); trabalho puxado; reuniões diárias possíveis; foco em fluxo contínuo.
- **Scrumban**: combinação de Scrum e Kanban; na aula, aluno comentou que na empresa usam a mistura e funciona bem.
- **Quando usar**: em prova, distinguir “quadro com colunas de fluxo” (Kanban) de “sprints com entrega a cada X semanas” (Scrum).

#### 5.4 Ferramentas de gestão (Jira, Trello)

- **Jira**: ferramenta muito usada para gestão de projetos ágeis; custo alto; empresa pode migrar para Jira quando atinge limite em outra ferramenta; boa para gestão e indicadores.
- **Trello**: também utilizada; alternativa; quadro tipo Kanban.
- **Aplicação**: não é procedimento técnico; é escolha da equipe/empresa para onde registrar backlog e acompanhar sprint.

#### 5.5 Metodologia tradicional e etapas formais

- **Etapas citadas na aula**: termo de abertura (assinaturas), proposta de projeto, desenvolvimento de requisitos, planejamento, análise, modelagem, construção, teste, implantação, validação, aceitação.
- **Quando é usada**: projetos com exigência de formalidade (Polícia Federal, Sebrae, Senac, software de segurança, área militar); empresas com certificação CMMI.
- **Metodologia ágil reutiliza muitas dessas etapas, mas comprimidas em cada sprint** — análise, modelagem, construção, teste, deploy dentro de 2–4 semanas.
- **Erro comum**: dizer que metodologia tradicional “não se usa mais”; ainda é obrigatória em vários contextos.

#### 5.6 CMMI

- **Definição**: modelo de maturidade de processos para desenvolvimento (fábricas de software); níveis de 1 a 5; cada nível exige formalidade e documentação crescentes.
- **Uso**: empresas que prestam serviço internacional ou para clientes que exigem certificação; auditorias; custo de projeto maior.
- **Não coberto em detalhe na aula**: quais critérios exatos de cada nível; apenas a ideia de formalidade e nível de maturidade.

#### 5.7 Ferramentas de banco e laboratório

- **Ideia**: montar o “laboratório” — ao iniciar o dia, abrir as ferramentas de banco que usa (DBeaver, pgAdmin, SSMS, MongoDB Compass, etc.) e alternar conforme o projeto.
- **DBeaver**: multi-banco; conecta em vários SGBDs a partir de uma única ferramenta.
- **pgAdmin**: específica para PostgreSQL.
- **SQL Server Management Studio (SSMS)**: específica para SQL Server (Microsoft).
- **MongoDB Compass**: específica para MongoDB.
- **Quando usar qual**: preferência e política da empresa; ferramenta oficial do fabricante costuma ser mais completa para aquela tecnologia; DBeaver serve para quem atende vários bancos.
- **MongoDB**: banco não relacional; armazenamento em documentos (JSON/BSON); mais flexível para dados não estruturados ou esquema variável; linguagem própria, não SQL padrão.

#### 5.8 DBA, Engenharia de Dados e Cientista de Dados

- **DBA**: pode ter perfil de infraestrutura (instalar, configurar, alta disponibilidade), arquitetura (desenhar bancos) ou desenvolvimento (código SQL/PL-SQL, etc.).
- **Nomenclatura atual**: “Engenharia de dados” (pipeline, infra, arquitetura) e “Cientista de dados” (valor dos dados, algoritmos, análise); “DBA” tende a soar mais antigo, mas a função continua.
- **Em projetos grandes**: pode haver engenheiro de dados, arquiteto, DBA; cada um com foco; DBA muitas vezes foca só no banco; arquiteto desenha a solução.
- **Consultor**: frequentemente generalista (várias tecnologias); casos muito complexos podem exigir especialista ou consultoria externa.

### 6. Procedimento / execução

- **Montar laboratório**: (1) Instalar os SGBDs que for usar (SQL Server, PostgreSQL, MySQL, Oracle Express, MongoDB, etc.). (2) Instalar as ferramentas de acesso (SSMS, pgAdmin, DBeaver, Compass, SQL Developer conforme o banco). (3) Deixar abertas ou acessíveis no dia a dia e fazer checklist/rotina de conexão nos servidores que atende.
- **Não há procedimento passo a passo de instalação na transcrição** — apenas a lista de ferramentas e a ideia de “abrir e trabalhar”; links de download em ProjetoBL-Links-Ferramentas.

### 7. Exemplos relevantes

- **Squad**: 3–4 devs, 2 DBAs, 3 testers, Scrum Master; backlog grande; priorização em reunião; cada um pega itens e entrega na sprint.
- **Daily**: “Ontem fiz X; tive impedimento em Y; hoje vou fazer Z.”
- **Metodologia tradicional**: projeto para Polícia Federal ou Sebrae com termo de abertura, proposta, requisitos assinados, depois planejamento, análise, modelagem, construção, teste, implantação, aceitação.
- **Laboratório**: professor abre DBeaver, pgAdmin, SSMS, Compass e alterna entre eles conforme o projeto (Oracle, Post, SQL Server, MongoDB).

### 8. Diferenças e confusões comuns

- **Scrum Master vs PO**: Scrum Master = ritmo e impedimentos; PO = cliente e prioridades. Não confundir.
- **Sprint = período fixo com entrega** vs **Kanban = fluxo contínuo com colunas**.
- **Metodologia tradicional “obsoleta”** — não; ainda obrigatória em segurança, governança, CMMI.
- **DBA só infra** — não; DBA pode ser dev ou arquiteto; depende do projeto.
- **MongoDB usa SQL** — não; usa linguagem própria; armazenamento em documentos (JSON/BSON).

### 9. Como cai em prova

- **Múltipla escolha**: “Quem remove impedimentos na Squad?” (Scrum Master); “Quem representa o cliente?” (PO); “O que acontece na daily?” (o que fez ontem, impedimentos, o que fará hoje); “Duração típica de sprint?” (2–4 semanas).
- **V/F**: “Metodologia tradicional não é mais utilizada” (F); “Dentro da sprint entram apenas desenvolvimento e teste” (F — entram análise, dev, teste, deploy).

### 10. Pontos de atenção

- **Live Coding**: na data da aula 2 ainda não estava liberado; trilha do projeto de bloco também comentada como sem trilha única por ser integração de disciplinas.
- **Freelance**: professor comentou que vai passar plataformas de freelance em momento posterior; não foi detalhado na aula 2.
- **Presença/horário**: aula 2 se estendeu além do horário; coordenação informou que ninguém seria prejudicado; confirmar com secretaria em caso de dúvida.

### 11. Checklist de domínio

- [ ] Sei explicar o papel do Scrum Master e do PO.
- [ ] Sei descrever o que ocorre na daily e o que deve ser entregue ao final de uma sprint.
- [ ] Sei citar Scrum, Kanban e Scrumban e a diferença de foco (sprint vs fluxo).
- [ ] Sei listar etapas da metodologia tradicional e quando ela é obrigatória ou preferível.
- [ ] Sei dizer o que é CMMI (níveis de maturidade, formalidade).
- [ ] Sei citar ferramentas de banco para montar o laboratório (DBeaver, pgAdmin, SSMS, Compass).
- [ ] Sei diferenciar banco relacional (SQL) de MongoDB (documentos, não relacional) em uma frase.
