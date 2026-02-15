---
title: "Pipeline de Dados, Bancos Relacionais e Não Relacionais e Ferramentas"
slug: "pipeline-dados-bancos"
discipline: "projeto-bloco"
order: 3
description: "Origem–processamento–destino, ETL, Looker no destino, SQL padrão vs dialetos, cache vs persistência, ferramentas por banco."
exercises:
  - question: "No pipeline de dados (ciclo de vida), onde entram a 'origem', o 'processamento' e o 'destino'? Onde o Looker Studio se encaixa?"
    answer: "Origem: onde os dados são armazenados (bancos como SQL Server, Oracle, MySQL, Postgres, MongoDB). Processamento: carga, transformação, preparação (ETL). Destino: onde os dados ficam disponíveis para consumo (dashboards, relatórios). Looker Studio é ferramenta de destino — consome dados já preparados para visualização."
  - question: "Qual a diferença entre SQL padrão (ANSI) e T-SQL ou PL/SQL?"
    answer: "SQL padrão (ANSI) é a linguagem comum que funciona em todos os bancos relacionais. T-SQL (Transact-SQL) é a extensão da Microsoft para SQL Server; PL/SQL é a da Oracle. Cada fabricante adiciona funções e construções próprias. O essencial é dominar o SQL padrão para se mover entre bancos; depois aprender o dialeto do banco do projeto."
  - question: "Quando escolher banco relacional e quando não relacional (ex.: MongoDB)?"
    answer: "Relacional: dados estruturados, regras de negócio e relacionamentos bem definidos (CRM, ERP). Não relacional (ex.: MongoDB): quando a estrutura/esquema precisa de flexibilidade, dados semiestruturados ou não estruturados; armazenamento em documentos (JSON/BSON). Requisitos do projeto mandam na escolha."
  - question: "Cache e persistência em disco são a mesma coisa? Por que 'dados em cache' reduzem tempo de resposta?"
    answer: "Não. Persistência = dados gravados em disco, permanentes. Cache = cópia em memória (ex.: RAM) de dados acessados com frequência; acesso à memória é mais rápido que ao disco. Reduzir tempo de resposta: menos acesso a disco (I/O); Redis é exemplo de tecnologia de cache. Volumes e custos: cache costuma ser menor e mais caro por GB; disco para volume grande."
  - question: "Posso usar uma única ferramenta (ex.: DBeaver) para acessar vários bancos no mesmo projeto?"
    answer: "Sim. DBeaver e ferramentas multi-banco permitem conectar em SQL Server, Oracle, MySQL, Postgres etc. Por tecnologia, costuma-se usar a ferramenta do fabricante (SSMS para SQL Server, SQL Developer para Oracle). Usar vários bancos no mesmo projeto é possível, mas tem custo e complexidade; o core da solução em geral fica em uma tecnologia."
---
## Resumo

- **Pipeline de dados**: **origem** (onde os dados são armazenados — bancos) → **processamento** (carga, transformação, ETL) → **destino** (onde são consumidos — dashboards, relatórios). **Looker Studio** = ferramenta de destino (visualização); projeto de bloco foca na **origem** (SQL, Python) e no fluxo até o destino.
- **Bancos relacionais** (SQL Server, Oracle, MySQL, PostgreSQL): estrutura rígida, relações entre tabelas; linguagem padrão = **SQL** (ANSI). **Bancos não relacionais** (ex.: MongoDB): documentos (JSON/BSON), esquema flexível; linguagem própria.
- **SQL padrão** permite desenvolver para todos os relacionais; **T-SQL** (Microsoft), **PL/SQL** (Oracle), etc. são extensões por fabricante. Aprender primeiro o SQL padrão; depois o dialeto do banco do projeto.
- **Escolha do banco**: requisitos do projeto mandam; dados estruturados e relacionamentos → relacional; flexibilidade de esquema → não relacional. É possível adaptar características (ex.: guardar JSON em relacional), mas cada banco é “especialista” no seu modelo.
- **Cache vs persistência**: **persistência** = gravar em disco (dados permanentes); **cache** = dados em memória para acesso rápido (ex.: Redis); são coisas distintas. Cache reduz tempo de resposta porque evita I/O em disco; volume em cache costuma ser menor; em cenários atuais, memória pode estar cara.
- **Ferramentas**: **motor** (serviço do banco) + **ferramenta de acesso** (cliente). Ex.: SQL Server + SSMS; Oracle + SQL Developer; Postgres + pgAdmin; **DBeaver** acessa vários bancos. Analogia: banco = Instagram; ferramenta = app (celular ou PC).
- **Múltiplos bancos no projeto**: possível (ex.: transacional em um, analítico em outro); tem custo; consultor precisa conhecer vários. **Linguagens (Python)** acessam bancos; Python pode rodar dentro de alguns bancos (Postgres com extensões, SQL Server); movimento “dado para aplicação” vs “código para o dado” (ex.: processar no Databricks perto dos dados).
- **Live Coding**: primeira entrega em **02/03**; acesso por link no e-mail; tempo limitado (ex.: 1h); concentrar na tela; professor vai verificar com coordenação material/simulado para treino. **Presença**: registro automático; aula anterior passou das 22h sem prejudicar ninguém.

**Resumo em 5 linhas**: Pipeline = origem (bancos) → processamento (ETL) → destino (Looker, etc.). Relacionais usam SQL padrão; cada fabricante tem dialeto (T-SQL, PL/SQL). Cache ≠ persistência; cache acelera acesso. Ferramenta por banco ou DBeaver; motor + cliente. Live Coding 02/03; link por e-mail.

**Palavras-chave**: pipeline de dados, origem, processamento, destino, ETL, Looker Studio, banco relacional, banco não relacional, SQL padrão, T-SQL, PL/SQL, MongoDB, JSON/BSON, cache, persistência, Redis, SSMS, DBeaver, Live Coding.

---

## Explicações

### 1. Tema e escopo

- **Tema**: Pipeline de dados (origem, processamento, destino), papel do Looker e do projeto de bloco; bancos relacionais vs não relacionais; SQL padrão vs dialetos; cache vs persistência; ferramentas de acesso por banco; primeira entrega Live Coding.
- **Inclui**: ciclo de vida dos dados; escolha relacional vs não relacional; SQL ANSI e extensões (T-SQL, PL/SQL); cache e persistência; motor + ferramenta; DBeaver multi-banco; uso de vários bancos no mesmo projeto; Python e bancos; data da Live Coding. **Não inclui**: sintaxe detalhada de SQL ou Python; instalação passo a passo de cada SGBD.

### 2. Contexto na disciplina

- Terceira aula do Projeto de Bloco; depende das aulas 1 e 2 (projeto, metodologias, ferramentas de banco).
- Pré-requisito: noção de que haverá Python, SQL e visualização nas outras disciplinas.
- Live Coding (02/03) integra disciplinas; foco em não repetir só código das disciplinas, mas casos próximos ao mercado.

### 3. Visão conceitual geral

Os dados têm um **ciclo de vida**: **origem** (armazenamento em bancos), **processamento** (carga, transformação — ETL) e **destino** (consumo por relatórios, dashboards). O **Looker Studio** é ferramenta de **destino** (visualização). O projeto de bloco enfatiza a **origem** e o processamento (SQL, Python, como preparar dados para ferramentas como o Look). **Bancos relacionais** usam **SQL** (padrão + dialetos por fabricante); **não relacionais** (ex.: MongoDB) usam modelo de documentos. **Cache** e **persistência** são distintos: um é acesso rápido em memória, outro é gravação em disco. Ter **ferramentas certas** (motor do banco + cliente de acesso) e entender **qual banco usar** conforme requisitos do projeto é parte do trabalho profissional.

### 4. Ideias-chave (máx. 7)

1. **Pipeline: origem → processamento → destino** — origem = bancos; processamento = ETL; destino = dashboards/relatórios (Looker é destino).
2. **Relacional = SQL (estrutura rígida, relações); não relacional = documentos (ex.: MongoDB, esquema flexível)** — requisitos do projeto definem a escolha.
3. **SQL padrão (ANSI) serve para todos os relacionais; T-SQL, PL/SQL são extensões** — aprender primeiro o padrão; depois o dialeto do banco.
4. **Cache ≠ persistência** — cache = memória, acesso rápido; persistência = disco, dados permanentes; cache reduz tempo de resposta.
5. **Ferramenta de acesso ≠ banco** — instala-se motor (serviço) + ferramenta (cliente); uma ferramenta (DBeaver) pode acessar vários bancos.
6. **Vários bancos no mesmo projeto** — possível (ex.: um transacional, outro analítico); custo e complexidade; consultor precisa conhecer mais de um.
7. **Live Coding 02/03** — primeira entrega; link por e-mail; tempo limitado; manter foco na tela; simulado/material de treino a confirmar com coordenação.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Pipeline de dados (origem, processamento, destino)

- **Origem**: onde os dados são armazenados (SQL Server, Oracle, MySQL, Postgres, MongoDB, DB2, etc.); depende do projeto.
- **Processamento**: carga, transformação, preparação (ETL — Extract, Transform, Load); pode ser feito com Python, ferramentas de integração, etc.
- **Destino**: onde os dados ficam disponíveis para consumo — dashboards (Looker, Power BI, etc.), relatórios, outras aplicações.
- **Looker Studio**: ferramenta de **destino**; consome dados já preparados; não é ferramenta de transformação pesada.
- **Projeto de bloco**: foco na **origem** (como acessar e preparar dados com SQL e Python) e no fluxo até o destino; visualização (Looker) é vista na disciplina específica.
- **Quando usar**: para explicar onde cada ferramenta ou disciplina se encaixa no ciclo de vida dos dados.
- **Erro comum**: achar que Looker “processa” ou “origina” os dados; ele consome no destino.

#### 5.2 Bancos relacionais e SQL

- **Relacionais**: SQL Server, Oracle, MySQL, PostgreSQL (e outros); dados em tabelas com relações; estrutura definida (esquema).
- **Linguagem padrão**: SQL (convenção ANSI); permite desenvolver para todos os relacionais com a mesma base.
- **Quando usar relacional**: dados estruturados, regras de negócio claras, relacionamentos (CRM, ERP, sistemas transacionais).
- **Reconhecer**: “consultas em tabelas relacionadas”, “JOINs”, “esquema fixo” → relacional.

#### 5.3 Bancos não relacionais (MongoDB como exemplo)

- **MongoDB**: armazenamento em **documentos** (JSON; internamente BSON); esquema **flexível**; linguagem própria (não SQL).
- **Quando usar não relacional**: quando a estrutura pode variar, dados semiestruturados ou não estruturados, necessidade de flexibilidade de esquema.
- **Meio termo**: não existe “meio termo” oficial; é possível ter características de um modelo no outro (ex.: coluna JSON em tabela relacional), mas cada banco é otimizado para o seu modelo.
- **Requisitos do projeto** mandam na escolha entre relacional e não relacional; depois, entre tecnologias do mesmo tipo (qual relacional, qual não relacional).

#### 5.4 SQL padrão vs T-SQL, PL/SQL

- **SQL padrão (ANSI)**: base comum; funciona em todos os bancos relacionais; prioridade no aprendizado.
- **T-SQL (Transact-SQL)**: extensão Microsoft para SQL Server; só no SQL Server.
- **PL/SQL**: extensão Oracle; só na Oracle.
- **MySQL, PostgreSQL**: têm suas próprias extensões/comandos adicionais.
- **PostgreSQL**: permite extensões (ex.: rodar Python, Java dentro do banco); comunidade ativa.
- **Aplicação**: em projeto Oracle → aprender PL/SQL quando necessário; em projeto Microsoft → T-SQL; para trocar de banco, o SQL padrão facilita.
- **Como cai em prova**: “Linguagem comum a todos os bancos relacionais?” → SQL (padrão). “T-SQL é de qual fabricante?” → Microsoft.

#### 5.5 Cache vs persistência

- **Persistência**: dados gravados em disco; permanentes; volume grande; “persistir” = gravar de forma duradoura.
- **Cache**: dados em memória (ex.: RAM, Redis) para acesso rápido; normalmente menor volume; acesso mais frequente; reduz tempo de resposta porque evita leitura em disco (I/O).
- **Redis**: tecnologia de cache muito usada.
- **Não são a mesma coisa**: cache não substitui persistência; complementam (persistir para guardar, cache para acelerar).
- **Custo**: em cenários atuais, memória (cache) pode ser mais cara por GB; disco para volume massivo. Comparar “o que é mais barato” depende de volume e tecnologia; na aula foi dito que são coisas distintas e que, por volume, cache costuma ser mais caro quando a memória está em alta.
- **Objetivo do cache**: reduzir tempo de resposta de consulta; banco também usa buffer/cache internamente para performance.
- **Como cai em prova**: “Cache e persistência são a mesma coisa?” (F). “Por que cache reduz tempo de resposta?” (acesso à memória é mais rápido que ao disco).

#### 5.6 Ferramentas: motor e cliente

- **Motor**: serviço do banco de dados (ex.: SQL Server, Oracle, Postgres); instala-se no servidor ou local.
- **Ferramenta de acesso (cliente)**: aplicação para conectar ao motor, executar consultas, administrar. Ex.: SSMS (SQL Server), SQL Developer (Oracle), pgAdmin (Postgres), DBeaver (vários).
- **Analogia da aula**: banco = Instagram; ferramenta = forma de acessar (celular ou computador); mesmo banco, ferramentas diferentes.
- **DBeaver**: multi-banco; uma ferramenta para conectar em MySQL, Postgres, SQL Server, Oracle etc.; útil para quem atende vários projetos.
- **Preferência**: ferramenta do fabricante costuma ter mais recursos para aquela tecnologia; mas pode-se usar DBeaver para várias.
- **Instalação**: primeiro o motor (serviço do banco); depois a(s) ferramenta(s) de acesso.
- **Versões gratuitas**: SQL Server Express, Oracle Express, MySQL e Postgres open source; adequadas para desenvolvimento e até produção em cenários limitados.

#### 5.7 Múltiplos bancos no mesmo projeto

- **Possível**: usar, por exemplo, um banco para transacional e outro para analítico (Postgres); ou migrar dados de um para outro.
- **Custo e complexidade**: licenças, integração, manutenção; muitas vezes o **core** da solução fica em **uma** tecnologia e a outra é exceção (ex.: analítico separado).
- **Consultor**: precisa conhecer mais de um banco; cliente pode pedir Oracle, MySQL, etc.; generalista resolve a maioria; casos muito complexos podem exigir especialista ou consultoria.
- **Ramon (aluno)**: no trabalho usam Oracle, MySQL e Postgres; DBeaver para se mover entre eles; tabela com 1,5 bilhão de registros (TJ) — migração entre bancos é complexa em grande escala.
- **Marcos (aluno)**: “posso interligar bancos em um projeto?” — sim, mas normalmente para funções distintas (um transacional, outro analítico); não “misturar” aleatoriamente; requisito de negócio define.

#### 5.8 Linguagens de programação e bancos

- **Python (e outras)** acessam bancos: conexão, consultas, CRUD; frameworks ajudam na camada de aplicação.
- **Sentido contrário**: rodar código (ex.: Python) **dentro** do banco — PostgreSQL com extensões (Python, Java); SQL Server com Python; prova de conceito citada na aula.
- **Movimento dado vs código**: em geral, dados vão para a aplicação (Python, R) para análise; em cenários de big data, processar “perto dos dados” (MapReduce, Spark, Databricks) evita mover volume gigante; Giovanni (aluno) comentou Databricks: movimento de código para o dado, não do dado para a aplicação, para não limitar volumetria.
- **Não detalhado na aula**: sintaxe de conexão Python–banco; fica para disciplina de Python e projeto.

#### 5.9 Live Coding (primeira entrega)

- **Data**: 02/03 (informação da aula 3).
- **Acesso**: link enviado por e-mail; período para realizar a atividade.
- **Regras**: tempo limitado (ex.: 1h); concentrar na tela; ferramenta pode captar movimentações; não acessar outras coisas fora da prova.
- **Conteúdo**: integração das disciplinas (SQL e Python); coordenação/faculdade elabora as questões; professor não elabora mais os testes.
- **Simulado/material**: aluno perguntou se há como treinar (questões parecidas); professor vai verificar com coordenação; LeetCode foi citado (nível pode ser mais difícil); objetivo é conseguir orientação e, se possível, material para treino.
- **Lacuna declarada**: não há passo a passo de “como fazer a prova” além de acessar no período pelo link e respeitar o tempo e o ambiente.

### 6. Procedimento / execução

- **Escolher banco e ferramenta**: (1) Definir requisitos do projeto (estruturado? flexível?). (2) Escolher relacional ou não relacional. (3) Escolher tecnologia (SQL Server, Postgres, MongoDB, etc.). (4) Instalar motor (e versão Express/open source se for o caso). (5) Instalar ferramenta de acesso (SSMS, pgAdmin, DBeaver, Compass, etc.). (6) Conectar e começar a usar.
- **Pipeline**: (1) Garantir origem (banco populado). (2) Definir processamento (ETL com Python, ferramentas, etc.). (3) Definir destino (Looker, Power BI, etc.) e conectar às fontes preparadas.
- **Instalação detalhada** de cada motor não foi feita na aula; links em ProjetoBL-Links-Ferramentas.

### 7. Exemplos relevantes

- **Pipeline**: origem = SQL Server na empresa; processamento = ETL em Python ou ferramenta; destino = Looker Studio consome os dados para dashboards.
- **Relacional**: CRM, ERP, sistema transacional → SQL Server, Oracle, MySQL, Postgres.
- **Não relacional**: dados de eventos, logs, esquema variável → MongoDB.
- **SQL padrão**: SELECT, JOIN, INSERT, UPDATE, DELETE funcionam em todos; funções de data ou string podem variar (T-SQL vs PL/SQL).
- **Ferramenta**: mesmo banco SQL Server acessado por SSMS ou por DBeaver; banco = Instagram, ferramenta = app.
- **Múltiplos bancos**: transacional em MySQL; dados transformados enviados para Postgres para analíticos; DBeaver conectado nos dois.

### 8. Diferenças e confusões comuns

- **Looker “processa” dados** — não; Looker consome no destino; processamento é ETL/origem.
- **SQL e T-SQL são iguais** — não; T-SQL é extensão da Microsoft; SQL é o padrão comum.
- **Cache = persistência** — não; cache = memória, rápido; persistência = disco, permanente.
- **Um banco por projeto** — não é regra; pode haver mais de um, com custo e requisito claro.
- **SQLite** — SQL “local”, mais simples; não é substituto de SQL Server/Oracle em produção robusta; útil para protótipo ou aplicação local.

### 9. Como cai em prova

- **Pipeline**: “Onde o Looker se encaixa?” (destino/consumo). “O que é ETL?” (extrair, transformar, carregar).
- **Relacional vs não relacional**: “MongoDB é relacional?” (não; documentos). “Quando usar relacional?” (dados estruturados, relações).
- **SQL**: “Linguagem padrão dos bancos relacionais?” (SQL/ANSI). “T-SQL é de qual fabricante?” (Microsoft).
- **Cache**: “Cache e persistência são a mesma coisa?” (F). “Por que cache reduz tempo?” (acesso à memória mais rápido que ao disco).
- **Ferramenta**: “DBeaver serve para quê?” (acessar vários bancos). “SSMS é para qual banco?” (SQL Server).

### 10. Pontos de atenção

- **Presença**: aula anterior (2) passou das 22h; coordenação informou que ninguém seria prejudicado; registro de presença tende a ser automático; em caso de dúvida, falar com secretaria.
- **Live Coding 02/03**: confirmar no e-mail o link e o período; preparar ambiente (conexão, concentração); simulado ou material de treino a ser confirmado com coordenação.
- **LeetCode**: citado como possível treino; nível pode ser mais difícil que a prova; professor vai verificar com coordenação se há material alinhado.
- **Tomem o tempo de vocês**: comentário da aula sobre ritmo de aprendizado; cada um tem seu tempo; não confundir com “não precisar se preparar” para o Live Coding — preparar é importante.

### 11. Checklist de domínio

- [ ] Sei desenhar o pipeline (origem → processamento → destino) e dizer onde o Looker entra.
- [ ] Sei diferenciar banco relacional (SQL, estrutura) de não relacional (documentos, flexibilidade).
- [ ] Sei explicar SQL padrão vs T-SQL/PL/SQL e por que aprender primeiro o padrão.
- [ ] Sei diferenciar cache e persistência e por que cache reduz tempo de resposta.
- [ ] Sei explicar motor vs ferramenta de acesso e dar exemplos (SSMS, DBeaver, pgAdmin).
- [ ] Sei dizer que é possível usar mais de um banco no projeto, com custo e requisito.
- [ ] Sei a data da primeira entrega Live Coding (02/03) e que o acesso é por link no e-mail.
