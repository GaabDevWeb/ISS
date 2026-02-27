---
title: "SQL na Prática: Tipos de Dados, CREATE TABLE, INSERT e SELECT"
slug: "sql-pratica-create-insert-select-deepnote"
discipline: "visualizacao-sql"
order: 9
description: "Primeiros comandos SQL reais: tipos de dados, criação de tabela, inserção e consultas simples no Deepnote com DuckDB e SQLite via linha de comando."
reading_time: 8
difficulty: "medium"
concepts:
  - tipos de dados SQL
  - INT
  - VARCHAR
  - DATE
  - TIMESTAMP
  - CREATE TABLE
  - DROP TABLE IF EXISTS
  - INSERT INTO
  - SELECT
  - DuckDB
  - SQLite
  - Deepnote
prerequisites:
  - "conclusao-dashboard-introducao-sql-banco-dados"
exercises:
  - question: "Por que a ordem dos valores no INSERT INTO é obrigatória?"
    answer: "O banco mapeia cada valor pela posição: o 1º valor vai para a 1ª coluna, o 2º para a 2ª, etc. Trocar a ordem insere dados nos campos errados sem necessariamente gerar erro."
    hint: "Ordem no INSERT deve refletir exatamente a ordem do CREATE TABLE."
  - question: "O que acontece se uma coluna de data for armazenada como VARCHAR?"
    answer: "O dado é lido normalmente como texto, mas operações de data (subtração, adição, comparação por intervalo) não funcionam. É preciso converter com uma função de conversão para DATE antes de operar."
    hint: "VARCHAR lê qualquer texto; DATE permite operações de calendário."
  - question: "Qual a diferença de resultado entre SELECT * e SELECT col1, col2?"
    answer: "SELECT * retorna todas as colunas na ordem da tabela. SELECT col1, col2 retorna apenas as colunas especificadas — na ordem escrita no SELECT, não na ordem de definição da tabela."
    hint: "A ordem no output segue o SELECT, não o CREATE TABLE."
  - question: "Por que usar DROP TABLE IF EXISTS antes de CREATE TABLE?"
    answer: "Para evitar erro ao criar tabela já existente. O IF EXISTS faz o DROP ser executado apenas se a tabela existir — se não existir, o comando é ignorado silenciosamente."
    hint: "Sem IF EXISTS, dropar tabela inexistente gera erro."
  - question: "Qual a diferença entre DuckDB e SQLite?"
    answer: "DuckDB é focado em análise de dados e ciência de dados (suporta CSV, JSON, Parquet; integra com Python e R). SQLite é focado em armazenamento local/embarcado (apps mobile, dispositivos). Ambos são leves e não competem com bancos cliente/servidor como MySQL ou Oracle."
    hint: "DuckDB = análise de dados; SQLite = embarcado/local."
  - question: "Qual o tipo de dado para salário com centavos? Dê exemplo com 10 dígitos e 2 casas decimais."
    answer: "NUMBER(10,2) ou NUMERIC(10,2) — 10 posições totais, 2 reservadas para decimais. Representa valores até 99999999.99. INT perderia as casas decimais."
    hint: "NUMBER(total, decimais)."
  - question: "Qual o comando do cliente SQLite (não SQL) para listar tabelas e para sair?"
    answer: ".tables lista as tabelas existentes; .quit sai do SQLite. Comandos do cliente SQLite sempre começam com ponto (.) — são diferentes dos comandos SQL."
    hint: "Comandos SQLite começam com ponto; comandos SQL não."
---

## Resumo

### Mapa da aula

- Aula técnica: primeiros comandos SQL reais com tabela `Celebrities`
- Tipos de dados: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INT`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`VARCHAR(n)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DATE`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TIMESTAMP`</mark>
- Ambiente: Deepnote usa DuckDB; SQLite disponível via linha de comando
- Erro clássico: ordem errada no INSERT insere dados nos campos errados

**Resumo em 5 linhas:** Esta aula aplica SQL real pela primeira vez. Antes de criar uma tabela, é preciso analisar os dados e definir o tipo de cada coluna. O padrão de segurança é `DROP TABLE IF EXISTS` seguido de `CREATE TABLE`. O `INSERT INTO` exige que os valores sigam exatamente a ordem das colunas. O `SELECT *` retorna tudo; `SELECT col1, col2` controla quais colunas aparecem — e em qual ordem.

**Palavras-chave:** tipos de dados, INT, VARCHAR, DATE, TIMESTAMP, CREATE TABLE, DROP TABLE IF EXISTS, INSERT INTO, SELECT, asterisco, cláusula FROM, coluna, registro, DuckDB, SQLite, Deepnote, dataframe SQL, .tables, .mode, .quit.

---

## Explicações

### 1. Tema e escopo

- **Inclui:** tipos de dados SQL, CREATE TABLE, DROP TABLE IF EXISTS, INSERT INTO, SELECT (com e sem asterisco), ambiente Deepnote + DuckDB, SQLite via linha de comando.
- **Não inclui:** WHERE, ORDER BY, GROUP BY, JOIN, UPDATE, DELETE (próximas aulas).
- Veja também: [[aula-08-conclusao-dashboard-introducao-sql-banco-dados]] — conceitos de SGBD, SQL de 4ª geração e dado vs informação.

### 4. Ideias-chave

1. **Datatype** = tipo do dado de cada coluna; definido na criação da tabela; determina o que pode ser armazenado e operado.
2. **VARCHAR(n)** para data é armadilha: lê, mas não opera. Converter com função de conversão para <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DATE`</mark> antes de subtrair ou comparar datas.
3. **DROP TABLE IF EXISTS** antes de CREATE TABLE = padrão de segurança; evita erro se a tabela já existir.
4. **Ordem no INSERT** é obrigatória e segue a ordem do CREATE TABLE — nenhum erro é gerado por ordem errada, mas os dados ficam nos campos errados.
5. **SELECT col order** no output segue a cláusula SELECT, não a definição da tabela.
6. **DuckDB** = SGBD analítico leve, usado no Deepnote; suporta CSV, JSON, Parquet; integra Python e R.
7. **SQLite** = SGBD embarcado/local; não compete com MySQL/Oracle; usado em apps mobile; acessível via CMD no Windows.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Tipos de dados SQL

| Tipo | Uso | Exemplo |
|---|---|---|
| `INT` | Inteiro sem decimal | idade, código |
| `VARCHAR(n)` | Texto até n caracteres | nome, gênero |
| `DATE` | Data (dia/mês/ano) | data de nascimento |
| `TIMESTAMP` | Data + hora (até ms) | log de transação |
| `NUMBER(p,s)` | Número com decimais | salário NUMBER(10,2) |

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TIMESTAMP`</mark> abrange dia + mês + ano + hora + minuto + segundo (e às vezes milissegundos) em um único campo.
- Analisar o dado antes de definir o tipo: "Female" tem 6 chars → `VARCHAR(6)` para gênero. Nomes podem ser maiores → `VARCHAR(40)` ou mais. Prever entradas futuras — o banco é dinâmico.
- ❌ **Não usar VARCHAR para data quando precisar de operações:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`VARCHAR`</mark> lê qualquer texto; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DATE`</mark> permite subtração, soma de dias e comparação por intervalo. Converter com função de cast quando necessário.

#### 5.2 CREATE TABLE e DROP TABLE IF EXISTS

```bash
-- Segurança: apaga a tabela somente se existir
DROP TABLE IF EXISTS Celebrities;

-- Cria a tabela com tipos definidos
CREATE TABLE Celebrities (
   AGE        INT,
   GENDER     VARCHAR(6),
   NATIONALITY VARCHAR(15),
   FULLNAME   VARCHAR(40)
);
```

- `DROP TABLE IF EXISTS` = se existir, apaga; se não existir, não faz nada.
- Sem o `IF EXISTS`: tentar dropar tabela inexistente gera erro.

#### 5.3 INSERT INTO

```bash
-- Valores na mesma ordem das colunas do CREATE TABLE
INSERT INTO Celebrities VALUES (63, 'Male', 'American', 'Tom Hanks');
INSERT INTO Celebrities VALUES (35, 'Female', 'American', 'Scarlett Johansson');
```

> **Regra crítica:** A ordem dos valores no `INSERT INTO ... VALUES` deve seguir exatamente a ordem das colunas no `CREATE TABLE`. Trocar silenciosamente insere dados errados nos campos errados.

#### 5.4 SELECT — consultas básicas

```bash
-- Todas as colunas, todos os registros
SELECT * FROM Celebrities;

-- Só a coluna AGE
SELECT AGE FROM Celebrities;

-- Duas colunas — ordem no output segue o SELECT
SELECT AGE, GENDER FROM Celebrities;

-- Ordem invertida: NATIONALITY aparece antes de FULLNAME no resultado
SELECT FULLNAME, NATIONALITY FROM Celebrities;
```

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT *`</mark> = todas as colunas na ordem da tabela.
- Separar colunas com vírgula na cláusula <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark>.
- A cláusula <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`FROM`</mark> especifica a tabela; o comando completo chama-se "comando SELECT".

#### 5.5 DuckDB e SQLite

DuckDB
: SGBD open source, leve, rápido; projetado para ciência de dados e análise. Suporta CSV, JSON, Parquet. Integra com Python e R. Usado no Deepnote.

SQLite
: SGBD leve para armazenamento local/embarcado (apps mobile, dispositivos individuais). Ênfase em economia, simplicidade e independência. Não compete com bancos cliente/servidor — são propósitos diferentes.

### 5b. Modelo mental

**Pipeline de um comando SELECT:**
1. `FROM Celebrities` → banco localiza a tabela.
2. `SELECT *` ou `SELECT col1, col2` → banco filtra e ordena colunas.
3. Resultado retornado ao cliente na ordem especificada no SELECT.

**INSERT — modelo de posição:**
- O banco não lê nomes de colunas no `INSERT INTO ... VALUES (...)` — mapeia por posição. Posição 1 → coluna 1 do CREATE TABLE. Sem validação de campo errado.

### 5c. Comparação direta

| Comando | O que retorna |
|---|---|
| `SELECT * FROM Celebrities` | Todas as colunas, todos os 6 registros |
| `SELECT AGE FROM Celebrities` | Só a coluna AGE, todos os 6 registros |
| `SELECT FULLNAME, NATIONALITY FROM Celebrities` | Duas colunas, nessa ordem, todos os 6 registros |

### 5d. Quando usar

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DROP TABLE IF EXISTS`</mark> → sempre antes de `CREATE TABLE` em scripts reutilizáveis.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`VARCHAR`</mark> para data → apenas quando não precisar de operações de data (leitura pura).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DATE`</mark> → quando precisar subtrair datas, somar dias ou filtrar por período.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TIMESTAMP`</mark> → quando precisar registrar data e hora juntos (logs, auditoria).
- **SQLite** → app mobile, armazenamento local, estudo/prototipagem. **Não usar** como banco corporativo compartilhado.
- **DuckDB (Deepnote)** → análise de dados, ciência de dados, leitura de arquivos CSV/JSON/Parquet.

### 6. Teste de reconhecimento rápido

**O que faz `DROP TABLE IF EXISTS Celebrities`?**
**Resposta:** Apaga a tabela Celebrities se ela existir. Se não existir, não faz nada (sem erro).

---

**Qual coluna recebe o valor `'American'` no INSERT abaixo?**
```bash
INSERT INTO Celebrities VALUES (63, 'Male', 'American', 'Tom Hanks');
```
**Resposta:** NATIONALITY (3ª coluna do CREATE TABLE).

---

**Qual o output de `SELECT GENDER, AGE FROM Celebrities`?**
**Resposta:** Duas colunas — GENDER primeiro, AGE segundo — na ordem escrita no SELECT, não na ordem do CREATE TABLE.

---

**Uma coluna de data foi criada como VARCHAR. O analista tenta calcular quantos dias passaram. O que ocorre?**
**Resposta:** A operação falha — VARCHAR não suporta aritmética de datas. É necessário converter para DATE com função de conversão.

### 7. Erros clássicos de prova

- **Ordem errada no INSERT:** trocar posição dos valores insere no campo errado — sem erro de execução, mas dado incorreto.
- **SELECT col order ≠ tabela order:** a saída segue o SELECT, não o CREATE TABLE.
- **VARCHAR para data:** lê, mas não opera. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DATE`</mark> ≠ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`VARCHAR`</mark> para fins de operação.
- **SQLite = banco corporativo:** Falso. SQLite é embarcado/local — não escalável para uso compartilhado.
- **Comentário SQL com `//`:** Falso. Comentário SQL = `--` (dois traços).

### 7b. Armadilhas clássicas

- **"INSERT INTO aceita qualquer ordem"** → engana: não gera erro, mas dado entra no campo errado. A ordem *sempre* importa.
- **"SELECT * e SELECT col1, col2 retornam a mesma ordem"** → engana quando a tabela tem muitas colunas. SELECT col1, col2 pode inverter a exibição se a ordem for trocada.
- **"TIMESTAMP é igual a DATE"** → engana: TIMESTAMP também armazena hora, minuto e segundo. DATE armazena só dia/mês/ano.
- **"DuckDB e SQLite são a mesma coisa"** → engana: DuckDB = análise de dados; SQLite = local/embarcado. Propósitos diferentes.

### 8. Exemplos de alta densidade

```bash
-- Padrão seguro de criação
DROP TABLE IF EXISTS clientes;
CREATE TABLE clientes (
  cod_cliente      INT,
  nome_cliente     VARCHAR(10),
  celular_cliente  VARCHAR(11)
);
```

```bash
-- INSERT na ordem exata do CREATE TABLE
INSERT INTO clientes VALUES (1, 'Maria', '9000');
INSERT INTO clientes VALUES (2, 'João',  '8000');
```

```bash
-- SELECT básico
SELECT * FROM clientes;         -- todas as colunas
SELECT nome_cliente FROM clientes;  -- uma coluna
```

**SQLite via CMD (Windows):**
```bash
sqlite3 teste.db    -- abre/cria banco
.databases          -- lista bancos (rw = leitura+gravação)
.tables             -- lista tabelas
.mode table         -- muda visualização para formato tabela
.quit               -- sai do SQLite
```

### 9. Procedimento — Deepnote com DuckDB

1. Acessar **deepnote.com** → Sign in → Continue with Google (conta Infnet).
2. Workspace → Private Projects → Create new → nomear "Introdução à Visualização de Dados e SQL".
3. Clicar no botão **SQL** → cria bloco "DataFrame SQL" (variável `df_1`).
4. Colar o código SQL no bloco → clicar **Run** (executa só este bloco) ou Run geral (executa todos).
5. Para consultas separadas: criar novo bloco SQL → variável `df_2`, `df_3`, etc.
6. Comentários: `--` antes do texto. Boa prática: comentar cada bloco.

> **Atenção:** O bloco df_1 deve conter o `DROP TABLE IF EXISTS` + `CREATE TABLE` + todos os `INSERT INTO` + o primeiro `SELECT *`. Os blocos seguintes fazem `SELECT` de colunas específicas — eles reutilizam a tabela já populada pelo df_1.

### 12b. Regra de prova

- **INSERT sem lista de colunas → ordem obrigatória** → sempre segue o CREATE TABLE.
- **SELECT col1, col2 → output na ordem do SELECT**, não da tabela.
- **VARCHAR para data = leitura OK, operação não** → convert function necessária.
- **DROP TABLE IF EXISTS = sem erro se tabela não existir** → padrão seguro em scripts.
- **TIMESTAMP = DATE + hora** → mais abrangente que DATE puro.

### 15. Síntese operacional

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DROP TABLE IF EXISTS`</mark> + <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CREATE TABLE`</mark>: padrão seguro; definir tipo correto por coluna antes de criar.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT INTO ... VALUES (...)`</mark>: ordem dos valores segue o CREATE TABLE — erro silencioso se trocado.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT *`</mark> retorna tudo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT col1, col2`</mark> controla colunas e ordem de saída.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`VARCHAR`</mark> para data: lê, mas não opera — converter para <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DATE`</mark> antes de subtrair ou somar dias.
- DuckDB (Deepnote) = analítico leve; SQLite = embarcado/local — ambos ≠ bancos corporativos.
- Comentário SQL = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`--`</mark>; comandos do cliente SQLite = ponto (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.tables`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.quit`</mark>).
