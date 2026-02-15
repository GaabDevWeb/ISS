---
title: "Introdução ao Projeto de Bloco e Fundamentos de Processamento de Dados"
slug: "introducao"
discipline: "projeto-bloco"
order: 1
description: "Estrutura do projeto, expectativas, trilha de formação (SQL, Python, visualização) e ferramentas."
exercises:
  - question: "O que caracteriza um projeto (temporário, único, objetivo claro)?"
    answer: "Projeto é temporário e único, possui início, meio e fim, objetivo claro, elaboração progressiva e recursos definidos. Diferencia-se de operação contínua."
  - question: "Qual a diferença entre metodologia tradicional e ágil em termos de requisitos e entregas?"
    answer: "Tradicional: requisitos definidos no início, pouca alteração; etapas em cascata; resultados apenas na conclusão. Ágil: backlog, sprints (2–4 semanas), entregas frequentes; requisitos evoluem; adaptabilidade e colaboração com o cliente."
    hint: "Pense em quando o cliente vê resultado."
  - question: "Por que SQL e Python são centrais na trilha de fundamentos de processamento de dados?"
    answer: "SQL é a linguagem padrão para bancos relacionais (Oracle, SQL Server, MySQL, PostgreSQL, etc.) e é usada em ferramentas de BI e integração. Python integra bancos relacionais e não relacionais, é usado em transformação e migração de dados e em ecossistemas (AWS, Azure, Databricks). Juntos cobrem a maior parte das demandas de dados no mercado."
  - question: "O que é o Live Coding no contexto do projeto de bloco e como funciona na prática?"
    answer: "É uma avaliação em plataforma (ex.: Byte) usada também em processos seletivos. O aluno entra na plataforma, tem tempo limitado (ex.: 1h), desenvolve código ou responde questões sob monitoramento (tela/ambiente controlado). Objetivo: alinhar à realidade de testes técnicos do mercado."
    hint: "Não é desenvolvimento contínuo ao longo do semestre; é prova em janela de tempo."
  - question: "Ao modelar um banco, por que evitar coluna pouco granular como primeiro (ou principal) índice em filtros?"
    answer: "Coluna pouco granular tem poucos valores distintos (ex.: sim/não = 2 valores). Índices em colunas com muitos valores distintos (alta granularidade, ex.: ID) são mais seletivos e tendem a ser mais performáticos. Use colunas mais granulares primeiro no índice."
  - question: "Cite três tipos de conteúdo da trilha 'Projeto Bloco Formação' (mapa mental)."
    answer: "Consultas/Queries (SQL básico a avançado, agregação, JOINs, INSERT/UPDATE/DELETE, CREATE/ALTER/DROP); Converter dados (Looker Studio, dashboards, campos calculados, controles); Programação e introdução em Python (controle de fluxo, listas, funções, variáveis, strings, ambiente tipo Sololearn)."
---
## Resumo

- **Projeto de Bloco Fundamentos**: integra disciplinas do semestre (Python, SQL, visualização); foco em **conceito de projeto** e em como empresas desenvolvem soluções, não só em tecnologia.
- **Estrutura**: etapas gradativas (não um único projeto de 6 meses); avaliação por **Live Coding** (plataforma cronometrada e monitorada, semelhante a testes de seleção).
- **O que é projeto** (mapa Metodologias): temporário, único, início/meio/fim, objetivo claro, elaboração progressiva, recursos definidos.
- **Metodologia tradicional**: cascata, requisitos fixos no início, resultados na conclusão. **Metodologia ágil**: backlog → sprint (2–4 semanas) → entregas frequentes; Manifesto Ágil (satisfação do cliente, mudanças, colaboração, simplicidade, equipe auto-organizada).
- **Trilha de formação** (mapa): Consultas SQL (básico a avançado, DML/DDL, JOINs); Converter dados (Looker Studio, dashboards); Introdução e programação em Python (variáveis, controle de fluxo, listas, funções).
- **Por que SQL + Python**: SQL em praticamente todos os bancos relacionais e em ferramentas de BI; Python em integração, migração e transformação de dados; ambas linguagens abrem portas no mercado (incl. internacional).
- **Ferramentas citadas**: ambientes de BD (SQL Server, PostgreSQL, MySQL, Oracle, DBeaver); desenvolvimento (Python, PyCharm, Anaconda, VS Code); estudo (Sololearn, W3Schools, O’Reilly/Ryder via instituição, DIO bootcamps).
- **Normalização**: redesenhar no papel antes de codar; evitar coluna pouco granular como principal em índice (preferir colunas com mais valores distintos).

**Resumo em 5 linhas**: Projeto de Bloco apoia as disciplinas com foco em projeto e integração Python + SQL. Avaliação inclui Live Coding (prova cronometrada em plataforma). Projeto = temporário, único, objetivo claro; ágil = entregas frequentes e adaptação. Trilha cobre SQL, visualização (Looker Studio) e Python. Ferramentas e links disponíveis em lista da disciplina.

**Palavras-chave**: projeto, metodologia tradicional, metodologia ágil, Manifesto Ágil, Live Coding, SQL, Python, trilha de formação, Looker Studio, normalização, granularidade de índice, ferramentas (DBeaver, W3Schools, Sololearn, DIO).

---

## Explicações

### 1. Tema e escopo

- **Tema**: Introdução ao Projeto de Bloco (Fundamentos de Processamento de Dados): estrutura da disciplina, alinhamento de expectativas, conceito de projeto (tradicional vs ágil), trilha de formação (SQL, Python, conversão/visualização de dados) e ferramentas.
- **Problema que resolve**: deixar claro o que será cobrado, como será avaliado (incl. Live Coding) e por que SQL e Python são centrais; situar o aluno no mapa mental da formação e nas metodologias de projeto.
- **Inclui**: estrutura do projeto de bloco; noção de projeto e metodologias; trilha (consultas SQL, converter dados, Python); ferramentas e links; dica de normalização e índice. **Não inclui**: detalhe de sintaxe SQL/Python (vem nas disciplinas específicas); passo a passo de instalação de cada ferramenta.

### 2. Contexto na disciplina

- Primeira aula do Projeto de Bloco do bloco de entrada; depende apenas de estar matriculado nas disciplinas do semestre (Python, SQL, visualização).
- Pré-requisito conceitual: nenhum técnico; útil ter noção de que haverá Python e SQL em outras disciplinas.
- Dependências futuras: as etapas e o Live Coding usarão conceitos e práticas de SQL e Python vistos nas outras disciplinas.

### 3. Visão conceitual geral

O Projeto de Bloco não é um único projeto longo: são **etapas gradativas** com avaliação que inclui **Live Coding** (prova em plataforma, cronometrada e monitorada). O objetivo é integrar o que se aprende em Python e SQL e reforçar a ideia de **projeto** (como empresas organizam e entregam trabalho), além de expor o aluno a um formato de avaliação próximo a processos seletivos. A trilha de formação explicita três eixos: **consultas/querys** (SQL), **conversão/visualização de dados** (ex.: Looker Studio) e **programação em Python** (introdução e aprofundamento). As ferramentas (bancos, IDEs, plataformas de estudo) são meios; o diferencial está em entender o problema, o projeto e as linguagens centrais (SQL e Python).

### 4. Ideias-chave (máx. 7)

1. **Projeto é temporário, único, com objetivo claro e recursos definidos** — base para distinguir “projeto” de “operação” e para entender planejamento e escopo.
2. **Metodologia tradicional (cascata) x ágil (sprints, entregas frequentes)** — em prova: identificar características (requisitos fixos no início vs adaptação; resultado só no fim vs entregas incrementais).
3. **Live Coding = avaliação em plataforma, tempo limitado, ambiente monitorado** — simula teste técnico de mercado; exige foco e domínio na hora.
4. **SQL + Python como base da trilha** — SQL em bancos relacionais e ferramentas de BI; Python em integração e transformação; juntos cobrem grande parte das demandas de dados.
5. **Trilha de formação tem três pilares: SQL (consultas), conversão/visualização (Looker Studio), Python (introdução e programação)** — reconhecer onde cada tema entra no mapa mental.
6. **Normalização e redesenho antes de codar** — tabela única com dezenas de colunas sugere redesenho; documentar/desenhar a estrutura e normalizar antes de implementar.
7. **Índice: preferir colunas mais granulares (mais valores distintos)** — coluna “sim/não” (poucos valores) é pouco granular; usar como filtro principal ou primeiro na ordem do índice tende a ser menos eficiente que colunas com muitos valores distintos (ex.: ID).

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Projeto (definição operacional)

- **Definição**: empreendimento temporário e único, com início, meio e fim, objetivo claro, elaboração progressiva e recursos definidos.
- **Quando usar**: quando se fala de “projeto” em disciplinas, provas ou contexto empresarial.
- **Quando NÃO usar**: para atividades contínuas e repetitivas (operações).
- **Reconhecer**: presença de prazo, objetivo delimitado e entrega de resultado (não apenas manutenção indefinida).
- **Relação**: base para metodologia tradicional e ágil; escopo e requisitos derivam do “objetivo claro”.

#### 5.2 Metodologia tradicional (cascata)

- **Definição**: etapas encadeadas em cascata, sequenciais; o projeto avança quando uma fase está finalizada; requisitos definidos no início, com pouca alteração; planejamento e estimativa de prazos/custos no início; resultados visíveis sobretudo na conclusão.
- **Quando usar**: em questões que citam “cascata”, “requisitos fixos”, “entrega só no final”.
- **Erro comum**: confundir com ágil (entregas frequentes e mudança de requisitos).
- **Como cai em prova**: “Característica da metodologia tradicional: (a) sprints de 2 semanas (b) requisitos definidos no início e pouca alteração” — (b).

#### 5.3 Metodologia ágil e Manifesto Ágil

- **Definição**: processo para desenvolvimento de produto/serviço com foco em agilizar a entrega; backlog → sprint (2–4 semanas) → reuniões diárias → produto ou funcionalidade concluída; valor em mais interações, mais software em funcionamento, colaboração com o cliente e adaptabilidade.
- **Manifesto (valores/princípios citados no material)**: satisfação do cliente; receptividade a mudanças; entregas frequentes; colaboração diária; motivação individual; comunicação ativa; desenvolvimento sustentável; excelência técnica; simplicidade; equipe auto-organizada; reflexão para melhoria.
- **Quando usar**: quando o enunciado falar em sprints, backlog, entregas frequentes, adaptação a mudanças.
- **Pegadinha**: “Resultados apenas na conclusão” é tradicional, não ágil.

#### 5.4 Live Coding (avaliação)

- **Definição**: avaliação em plataforma (ex.: Byte) em que o aluno, em janela de tempo definida (ex.: 1 hora), resolve questões ou desenvolve código em ambiente monitorado (sem sair da tela, sem consulta livre), análogo a testes de seleção.
- **Quando usar**: para descrever a avaliação do projeto de bloco ou processos seletivos que usam prova técnica em plataforma.
- **Erro comum**: achar que é projeto contínuo desenvolvido ao longo do semestre; na verdade é prova em momento determinado.
- **Sinal de entendimento**: associar “tempo limitado” + “ambiente controlado/monitorado” + “entrega na plataforma”.

#### 5.5 Trilha de formação (mapa “Projeto Bloco Formação”)

- **Consultas/Queries**: consultas básicas em SQL; criar tabelas, inserir dados, agregação; consultas avançadas (AND/OR, IN, LIKE, BETWEEN, ORDER BY); dados em várias tabelas e JOINs; atualizar/excluir e alterar esquema (INSERT, UPDATE, DELETE, CREATE, ALTER, DROP).
- **Converter dados**: ferramenta principal citada — Google Looker Studio; converter dados tabulares em dashboards; adicionar dados, agenda, campos calculados, controles; visualização com Google Maps/Data Studio.
- **Programação Python**: controle de fluxo; listas; funções; aprofundar conceitos, strings, variáveis e estruturas de controle.
- **Introdução Python**: operar em ambiente tipo Sololearn; tarefas simples; operações e desafios matemáticos; strings; variáveis; controle de fluxo.
- **Aplicação**: usar o mapa para localizar onde um tópico (ex.: “JOINs”, “Looker Studio”, “funções em Python”) entra na formação.

#### 5.6 Normalização e redesenho de banco

- **Definição**: reorganizar dados para reduzir redundância e melhorar estrutura; no contexto da aula: redesenhar modelo (no papel ou em ferramenta) antes de alterar código.
- **Passo a passo sugerido na aula**: (1) Reescrever/desenhar o que já existe (tabelas, relações). (2) Identificar repetições e entidades que podem ser separadas (ex.: cidades em tabela própria). (3) Aplicar normalização (1FN, 2FN, 3FN conforme necessário). (4) Pensar no que será consultado/analisado e ajustar a estrutura para essas necessidades. (5) Só então implementar mudanças no banco.
- **Erro típico**: alterar código ou criar novas colunas sem redesenhar; manter “tabelão” com dezenas de colunas sem fragmentar entidades.
- **Granularidade em índice**: coluna com poucos valores distintos (ex.: sim/não, 0/1) é pouco granular; não usar como primeira ou principal coluna de índice; preferir colunas com mais valores distintos (ex.: ID, datas) para melhor desempenho em filtros.

### 6. Procedimento / execução

- **Não há procedimento técnico único nesta aula.** A aula é introdutória e de alinhamento.
- **Para uso das ferramentas**: consultar a lista de links (ex.: ProjetoBL-Links-Ferramentas) para download de SQL Server, SSMS, PostgreSQL, PgAdmin, MySQL, MySQL Workbench, Oracle, SQL Developer, DBeaver, Python, PyCharm, Anaconda, VS Code, Code with Mu. Instalação e configuração ficam a cargo do aluno ou de outras aulas.
- **Lacuna declarada**: passo a passo de instalação e configuração de cada ferramenta não foi coberto na transcrição; apenas referência às ferramentas e aos links.

### 7. Exemplos relevantes

- **Exemplo de projeto**: “Desenvolver um sistema em 6 meses com etapas em cascata” → tradicional; “Backlog, sprints de 2 semanas, entrega a cada sprint” → ágil.
- **Exemplo de trilha**: SQL (consultas + DML/DDL) + Looker Studio (dashboards) + Python (introdução no Sololearn e programação com funções/listas) = eixos do mapa “Projeto Bloco Formação”.
- **Exemplo de normalização**: formulário com muitas classificações e tópicos armazenados em uma única tabela com dezenas de colunas → redesenhar, separar entidades (ex.: classificações em tabela, tópicos em outra), normalizar e depois implementar.
- **Exemplo de granularidade**: coluna “resposta_sim_nao” (0/1 ou S/N) tem 2 valores → pouco granular; coluna “id_processo” tem muitos valores distintos → mais granular; em índice composto, colocar a mais granular antes quando o filtro for por ambas.

### 8. Diferenças e confusões comuns

- **Tradicional x ágil**: tradicional = requisitos no início, resultado no fim, cascata; ágil = backlog, sprints, entregas frequentes, adaptação. Não confundir “entrega no final” com ágil.
- **Live Coding x projeto contínuo**: Live Coding é prova em plataforma em data/janela; projeto contínuo seria desenvolver ao longo do semestre. Nesta edição do projeto de bloco, a avaliação principal inclui Live Coding.
- **SQL como linguagem x SQL Server como produto**: SQL (linguagem) é usada em Oracle, MySQL, PostgreSQL, SQL Server, etc.; SQL Server é um banco específico. A trilha fala em “consultas SQL” como competência aplicável a vários bancos.
- **Granularidade alta x baixa**: alta = muitos valores distintos (ex.: ID); baixa = poucos (ex.: sim/não). Para índice e desempenho, priorizar colunas de alta granularidade nos filtros/ordem do índice.

### 9. Como cai em prova

- **Formato típico**: múltipla escolha ou V/F sobre características de projeto, metodologia tradicional, ágil ou Manifesto Ágil (ex.: “Requisitos definidos no início com pouca alteração” → tradicional).
- **Citação de conceitos**: definir “projeto” (temporário, único, objetivo claro); distinguir cascata de ágil (sprints, entregas frequentes).
- **Armadilha**: enunciado misturando termos (“entregas em sprints” + “resultado apenas na conclusão”) — um é ágil, outro tradicional.
- **Avaliação prática (Live Coding)**: critério é responder/entregar na plataforma dentro do tempo; não há passo a passo de “como fazer a prova” além de estar no ambiente no horário e cumprir o que for solicitado.

### 10. Pontos de atenção

- **Live Coding**: não sair da tela nem usar recursos não permitidos; tempo é limitado; ambiente pode ser monitorado (câmera/controle de abas conforme a plataforma).
- **Trilha bloqueada**: na data da aula, a trilha do “Projeto de Bloco Fundamentos” na plataforma da instituição estava bloqueada para o professor; pode ocorrer liberação posterior — confirmar com coordenação.
- **Nome da plataforma de Live Coding**: na transcrição foi citado “Byte” por aluno; a instituição/coordenador pode usar outro nome ou outra ferramenta — verificar no ambiente oficial.
- **Sololearn**: um aluno informou que, com e-mail da instituição, não era gratuito; condições podem variar — conferir na plataforma.
- **Coluna sim/não (0/1 ou S/N)**: uso é comum; na consulta ou na aplicação será necessário tratar (CASE/DECODE etc.). Para índice: não colocar coluna pouco granular como primeira na ordem do índice.

### 11. Checklist de domínio

- [ ] Sei definir projeto (temporário, único, objetivo claro, recursos definidos).
- [ ] Sei distinguir metodologia tradicional (cascata, requisitos no início) de ágil (sprints, entregas frequentes).
- [ ] Sei citar valores/princípios do Manifesto Ágil (entregas frequentes, colaboração, adaptação, etc.).
- [ ] Sei explicar o que é Live Coding no contexto do projeto de bloco (plataforma, tempo limitado, ambiente monitorado).
- [ ] Sei reconhecer os três eixos da trilha de formação: SQL (consultas), converter/visualizar dados (Looker Studio), Python (introdução e programação).
- [ ] Sei justificar por que SQL e Python são centrais para processamento de dados no mercado.
- [ ] Sei aplicar a dica de redesenho e normalização antes de implementar (e de preferir colunas mais granulares em índice).
