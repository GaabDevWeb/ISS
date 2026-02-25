---
title: "Conclusão do Dashboard 3.0 e Introdução a Banco de Dados e SQL"
slug: "conclusao-dashboard-introducao-sql-banco-dados"
discipline: "visualizacao-sql"
order: 8
description: "Completa o Dashboard 3.0 (passos 6–12: gráficos + Lista Suspensa) e introduz conceitos fundamentais de banco de dados, SGBD e SQL como linguagem de 4ª geração."
reading_time: 7
difficulty: "medium"
concepts:
  - filtros interativos
  - lista suspensa
  - dashboard interativo
  - dado vs informação
  - banco de dados vs arquivo
  - SGBD
  - modelo relacional
  - SQL linguagem de 4ª geração
  - tipos de banco de dados
prerequisites:
  - dashboards-comparacao-campos-calculados-filtros
exercises:
  - question: "O que diferencia dado de informação?"
    answer: "Dado é um valor isolado sem contexto (ex.: '5' — não sabemos o que representa). Informação é o dado contextualizado (ex.: 'saldo de R$5 na conta' — o dado '5' ganhou significado com o atributo da coluna)."
    hint: "Dado = valor sem contexto; informação = valor com contexto."
  - question: "Por que bancos de dados são preferíveis a arquivos para armazenar dados de sistemas?"
    answer: "O SGBD gerencia automaticamente integridade, concorrência e segurança. Com arquivo, o programador é responsável por toda essa gestão — qualquer problema no arquivo é responsabilidade do desenvolvedor, não do banco."
    hint: "SGBD gerencia automaticamente; arquivo = responsabilidade manual do programador."
  - question: "SQL é linguagem de qual geração? O que isso significa na prática?"
    answer: "SQL é linguagem de 4ª geração — acima de Python/Java/C (3ª), Assembly (2ª) e linguagem de máquina (1ª). Quanto maior o número, mais próximo da linguagem humana. Na prática: SQL é mais simples de usar para acessar dados do que Python."
    hint: "4ª geração > 3ª (Python). Mais alto = mais próximo do humano."
  - question: "Qual a diferença entre SQL (linguagem) e SQL Server (SGBD)?"
    answer: "SQL (Structured Query Language) é uma linguagem padrão para consultar bancos de dados relacionais. SQL Server é um produto (SGBD) da Microsoft que usa SQL internamente. Oracle também usa SQL. Um é a linguagem; o outro é o software."
    hint: "SQL = linguagem padrão; SQL Server = produto da Microsoft."
  - question: "Cite três modelos de banco de dados e um SGBD de cada."
    answer: "Relacional: Oracle, MySQL, SQL Server, PostgreSQL. Documental: MongoDB. Chave-valor: Redis. Série temporal: InfluxDB. MongoDB tem interface SQL por conveniência, mas o modelo continua sendo documental."
    hint: "Relacional (Oracle/MySQL), Documental (MongoDB), Chave-valor (Redis)."
  - question: "Como configurar os três controles Lista Suspensa do Dashboard 3.0?"
    answer: "1) Memo — campo: Memo; métrica: ABS Amount; dimensão período: vazia. 2) Transaction Type — campo: Transaction Type; sem métrica; sem dim. período; Estilo: tamanho fixo + desativar caixa de pesquisa. 3) Category — campo: Category; métrica: ABS Amount; sem dim. período; Classificar: ABS Amount decrescente; Estilo: tamanho fixo + desativar pesquisa."
    hint: "Memo: com busca. Transaction Type e Category: tamanho fixo, sem busca."
  - question: "O que acontece ao clicar em uma fatia do gráfico de pizza no modo leitura do Dashboard 3.0? Como desfazer?"
    answer: "Todos os gráficos da página são filtrados automaticamente para mostrar apenas os dados daquela fatia. Para desfazer: duplo clique na cor selecionada ou usar a seta ← 'Redefinir' que aparece no cabeçalho do gráfico."
    hint: "Filtro interativo afeta toda a página; desfazer = seta Redefinir ou duplo clique."
---

## Resumo

### Mapa da aula

- Aula híbrida: conclui Dashboard 3.0 (passos 6–12) + inicia Etapa 5 (SQL e BD)
- Dashboard 3.0: pizza, barras empilhadas, linhas, tabela, 3 controles Lista Suspensa
- Filtros interativos: qualquer seleção (gráfico ou controle) filtra toda a página
- SQL = 4ª geração; SGBD gerencia o que arquivo exigiria programação manual
- Erro clássico: confundir SQL (linguagem) com SQL Server (SGBD da Microsoft)

- **Conclusão do 3.0:** gráfico de pizza (Transaction Type / ABS Amount) → barras empilhadas (Category / Transaction Type / ABS Amount) → cores de dimensão (Withdrawal = vermelho, Deposit = verde) → linhas (Date Ano-Mês / Category / ABS Amount) → tabela (Transaction Type + Memo + Category) → 3 Lista Suspensa (Memo com busca; Transaction Type e Category com tamanho fixo sem busca).
- **Filtros interativos:** ao clicar em qualquer elemento, todos os gráficos atualizam simultaneamente; redefinir com seta ← ou duplo clique na cor.
- **Dado vs informação:** dado = valor isolado sem contexto; informação = dado com atributo/contexto.
- **Banco de dados vs arquivo:** SGBD gerencia automaticamente; arquivo exige gestão manual pelo programador.
- **SQL = Structured Query Language:** 4ª geração (acima de Python 3ª); vinculado ao modelo relacional.

**Resumo em 5 linhas:** Esta aula finaliza o Dashboard 3.0 com 4 gráficos e 3 controles Lista Suspensa — filtros interativos que afetam todos os gráficos ao mesmo tempo. Em seguida inicia a Etapa 5: banco de dados. Dado é valor isolado sem contexto; informação é dado contextualizado. SGBD gerencia dados automaticamente (Oracle, MySQL, PostgreSQL); arquivo exige gestão manual pelo programador. SQL é linguagem de 4ª geração — mais próxima do humano que Python (3ª) — vinculada ao modelo relacional.

**Palavras-chave:** Dashboard 3.0, lista suspensa, filtros interativos, gráfico de pizza, barras empilhadas, dado, informação, arquivo, banco de dados, SGBD, modelo relacional, documental, chave-valor, SQL, 4ª geração, SQL Server, Oracle, MySQL, MongoDB, Redis, Transaction Type, ABS Amount.

---

## Explicações

### 1. Tema e escopo

- **Parte 1:** Conclusão do Dashboard 3.0 (Etapa 4 — passos 6 a 12): pizza, barras, linhas, tabela, 3 controles Lista Suspensa; demonstração de filtros interativos.
- **Parte 2:** Introdução a banco de dados (Etapa 5 — início): dado vs informação, arquivo vs BD, SGBD, modelos de BD, SQL como linguagem de 4ª geração.
- **Não inclui:** comandos SQL (próximas aulas); modelagem de tabelas (próxima disciplina); TP2 (entregável, não conteúdo de revisão).

### 2. Contexto na disciplina

- Pré-requisito: [[aula-07-dashboards-comparacao-campos-calculados-filtros]] (Dashboard 3.0 início + campos calculados Transaction Type e ABS Amount).
- Esta aula encerra o ciclo Looker Studio → inicia ciclo SQL/banco de dados (Etapas 5–9).
- Próxima disciplina (2º trimestre): criação de tabelas e modelagem de banco de dados.

### 4. Ideias-chave

1. **Filtros interativos:** qualquer elemento (gráfico, controle, período) filtra todos os gráficos da página simultaneamente — comportamento central do Dashboard 3.0.
2. **Lista Suspensa com busca (Memo):** muitas entradas → caixa de pesquisa ativa (padrão). Lista Suspensa sem busca (Transaction Type, Category): poucas opções → tamanho fixo + desativar pesquisa.
3. **Redefinir filtro:** seta ← que aparece no cabeçalho do gráfico; se cabeçalho estiver oculto ("Não mostrar"), o botão fica invisível.
4. **Dado vs informação:** dado = `5` (sem contexto). Informação = `Balance: R$5` (com coluna/atributo). Tabela em BD estrutura informação em linhas × colunas.
5. **SGBD vs arquivo:** SGBD (Oracle, MySQL) gerencia automaticamente; arquivo = programador gerencia. Banco de dados extrai a responsabilidade do desenvolvedor.
6. **Gerações de linguagem:** máquina (1ª) → Assembly (2ª) → Python/Java (3ª) → SQL (4ª) → Prolog/IA (5ª). Quanto maior o número, mais próximo do humano.
7. **SQL ≠ SQL Server:** SQL é linguagem padrão; SQL Server é produto da Microsoft. MongoDB usa interface SQL mas seu modelo é documental, não relacional.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Filtros interativos e controles Lista Suspensa

- **Comportamento padrão ao carregar:** todos os filtros selecionam todos os itens.
- **Gráfico como filtro:** clicar em fatia (pizza) ou barra → isola aquele valor em toda a página.
- **Lista Suspensa com busca (Memo):** Configuração → Campo controle = Memo; Métrica = ABS Amount; Dimensão período = vazio.
- **Lista Suspensa sem busca:** Estilo → Controle → marcar **"Tamanho fixo"** + desmarcar **"Ativar caixa de pesquisa"**. Usar em Transaction Type (2 opções) e Category (poucas opções visíveis).
- **Redefinir:** seta ← no cabeçalho do gráfico volta ao estado com tudo selecionado.
- ❌ **Erro:** cabeçalho configurado como "Não mostrar" → botão Redefinir fica invisível ao usuário.
- **Quando NÃO usar Lista Suspensa sem busca:** quando o campo tem muitas entradas que o usuário precisa localizar por texto (Memo).

#### 5.2 Dado, informação e armazenamento

Dado
: Valor isolado sem contexto. Exemplo: `5` — sem saber a coluna, não tem significado.

Informação
: Dado com contexto (coluna/atributo). Exemplo: `Saques: 5` → "5 saques realizados".

- **Tabela** = estrutura principal do banco de dados relacional. Linhas (registros) × colunas (atributos) — visualmente similar a uma planilha eletrônica.
- **Arquivo:** programador cria e gerencia manualmente. Qualquer falha = responsabilidade do desenvolvedor.
- **Banco de dados:** SGBD gerencia automaticamente integridade, concorrência, segurança e backup.
- ⚠️ **Atenção:** banco de dados usa arquivos internamente (ex.: Oracle tem arquivos físicos embaixo), mas quem gerencia esses arquivos é o próprio SGBD — não o programador.

#### 5.3 SGBD e modelos de banco de dados

| Modelo | Exemplos de SGBD |
|---|---|
| Relacional | Oracle, MySQL, SQL Server, PostgreSQL |
| Documental | MongoDB |
| Chave-valor | Redis |
| Série temporal | InfluxDB |
| Colunar | (vários) |
| Grafo | (vários) |
| Espacial (geográfico) | (vários) |

- **SQL vinculado ao modelo relacional:** SGBDs relacionais usam SQL como linguagem padrão — são diretamente associados.
- **MongoDB + interface SQL:** MongoDB é documental, mas adicionou suporte a SQL para facilitar acesso; o modelo continua sendo documental.
- **Referência:** DB-Engines Ranking (db-engines.com) — classifica e descreve centenas de bancos de dados com modelo, versão e histórico.

#### 5.4 SQL como linguagem de 4ª geração

```bash
1ª geração: Linguagem de máquina (binário)
2ª geração: Assembly (Assembler)
3ª geração: Python, Java, C, JavaScript, Go
4ª geração: SQL (Structured Query Language)
5ª geração: Prolog, ALGOL (IA)
```

> **Regra crítica:** Quanto maior o número de geração, mais próximo da linguagem humana e mais fácil de usar. SQL (4ª) é mais simples para acessar dados do que Python (3ª). Para usar SQL em banco de dados relacional, não é necessário saber Python.

- **Quando usar SQL diretamente:** usuário com acesso ao SGBD da empresa (usuário + senha + privilégios) — consulta dados sem precisar de linguagem de programação.
- ❌ **Não confundir:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQL`</mark> (linguagem padrão ANSI) ≠ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQL Server`</mark> (produto da Microsoft). Oracle usa SQL; MySQL usa SQL; SQL Server usa SQL — a linguagem é compartilhada, os produtos são diferentes.

### 5b. Modelo mental

**Dashboard 3.0 — pipeline de filtros:**
1. Página carregada → todos os filtros selecionam tudo por padrão.
2. Qualquer seleção (clique em gráfico, Lista Suspensa, período) → Looker envia filtro à página.
3. Todos os gráficos recebem e aplicam o filtro simultaneamente.
4. Redefinir → remove o filtro → todos os gráficos voltam ao estado padrão.

**Banco de dados — modelo de camadas:**
1. Usuário/aplicação → acessa banco de dados via SQL.
2. SGBD (Oracle, MySQL) → recebe o comando SQL e gerencia os dados.
3. Arquivos físicos → camada mais baixa, invisível ao usuário, gerenciada pelo SGBD.

### 6. Teste de reconhecimento rápido

**O que é SGBD? Cite dois exemplos relacionais.**
**Resposta:** Sistema Gerenciador de Banco de Dados. Exemplos relacionais: Oracle, MySQL, SQL Server, PostgreSQL.

---

**SQL é de qual geração? E Python?**
**Resposta:** SQL = 4ª geração; Python = 3ª geração. SQL está mais próximo da linguagem humana para acesso a dados.

---

**O que acontece ao carregar o Dashboard 3.0 no modo leitura?**
**Resposta:** Todos os filtros (Lista Suspensa, período, gráficos) começam com todos os itens selecionados por padrão.

---

**MongoDB é relacional? Por que tem suporte a SQL?**
**Resposta:** Não — MongoDB é documental. Adicionou interface SQL apenas por conveniência, pois SQL é mais fácil de usar que os comandos nativos do MongoDB.

### 7. Erros clássicos de prova

- **SQL ≠ SQL Server:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQL`</mark> é linguagem padrão ANSI; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQL Server`</mark> é produto da Microsoft. Usar como sinônimos → errado.
- **Arquivo tem gestão automática:** Falso. Arquivo exige gestão manual; SGBD é que gerencia automaticamente.
- **MongoDB é relacional:** Falso. É documental. Ter interface SQL não muda o modelo.
- **SQL requer Python:** Falso. SQL é 4ª geração — acessa banco de dados diretamente, sem Python.
- **Lista Suspensa Memo sem busca:** Errado. Memo tem muitas entradas → caixa de pesquisa deve estar ativa.
- **Cabeçalho "Não mostrar" no gráfico:** oculta o botão Redefinir — usuário não consegue limpar o filtro visualmente.

### 8. Exemplos de alta densidade

**Configuração gráfico de pizza (Dashboard 3.0):**
- Dimensão: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Type`</mark> | Métrica: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ABS Amount`</mark>

**Configuração gráfico de barras empilhadas:**
- Dim Y: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Category`</mark> | Dim detalhada: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Type`</mark> | Métrica X: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ABS Amount`</mark>
- Estilo: Barras = 20 | Barras empilhadas ✓ | Eixo Y fonte = 8 | Cabeçalho = Não mostrar

**Configuração gráfico de linhas:**
- Dim X: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Date`</mark> → Tipo: Ano e Mês | Dim detalhada: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Category`</mark> | Métrica Y: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ABS Amount`</mark> | Classificar: Date Ano e Mês Crescente

**Modelos de BD:**

```bash
Relacional  → Oracle, MySQL, SQL Server, PostgreSQL
Documental  → MongoDB
Chave-valor → Redis
Série temp. → InfluxDB
```

### 9. Procedimento — Dashboard 3.0, passos 6–12

1. **Pizza:** Adicionar gráfico → Grupo Pizza; Config: Dim = Transaction Type; Métrica = ABS Amount; colocar abaixo do cabeçalho à esquerda.
2. **Barras:** Adicionar gráfico → Grupo Barras; Config: Dim Y = Category; Dim detalhada = Transaction Type; Métrica X = ABS Amount; Estilo: Barras = 20; marcar Barras empilhadas; Eixo Y fonte = 8; Cabeçalho = Não mostrar.
3. **Cores:** Recurso → Gerenciar cores de valor de dimensão → Withdrawal = vermelho; Deposit = verde.
4. **Linhas:** Adicionar gráfico → Grupo Linhas; Config: Dim X = Date (editar: Tipo → Data e hora → Ano e Mês); Dim detalhada = Category; Métrica Y = ABS Amount; Classificar: Date Ano e Mês Crescente.
5. **Tabela:** Adicionar gráfico → Tabela; Config: Dim = Transaction Type, Memo, Category; Métrica = ABS Amount; Nº linhas = N principais (apagar número); Exibir linha de resumo ✓; Classificar: Transaction Type Asc + ABS Amount Desc; Estilo: desmarcar Números de linhas.
6. **Lista Suspensa 1 (Memo):** Adicionar controle → Lista Suspensa; Campo = Memo; Métrica = ABS Amount; Dim período = vazio.
7. **Lista Suspensa 2 (Transaction Type):** Copiar LS1; Campo = Transaction Type; Métrica = vazio; Dim período = vazio; Estilo: tamanho fixo + desativar caixa de pesquisa.
8. **Lista Suspensa 3 (Category):** Copiar LS2; Campo = Category; Métrica = ABS Amount; Classificar = ABS Amount Desc; Estilo: tamanho fixo + desativar pesquisa.
9. **Modo leitura:** Clicar "Leitura" → explorar filtros interativos; todos os itens selecionados por padrão.

### 15. Síntese operacional

- Dashboard 3.0 completo: pizza + barras empilhadas + linhas + tabela + 3 Lista Suspensa (Memo com busca; Transaction Type e Category: tamanho fixo, sem busca).
- Filtros interativos: qualquer clique em gráfico filtra toda a página; redefinir com seta ← (visível apenas se cabeçalho estiver ativo).
- Dado = valor sem contexto; informação = dado com atributo; tabela = linhas × colunas (estrutura base do BD relacional).
- SGBD gerencia dados automaticamente (Oracle, MySQL, PostgreSQL, SQL Server); arquivo exige gestão manual pelo programador.
- SQL = 4ª geração — mais próximo da linguagem humana que Python (3ª); vinculado ao modelo relacional; não requer Python para uso.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQL`</mark> ≠ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQL Server`</mark>: SQL é linguagem padrão; SQL Server é produto da Microsoft.
