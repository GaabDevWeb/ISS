---
title: "Consultas SQL na tabela de clientes: prática com filtros e ordenação"
slug: "consultas-sql-tabela-clientes-pratica"
discipline: "visualizacao-sql"
order: 13
description: "Praticando SELECT, WHERE e ORDER BY em uma tabela de clientes criada no SQLiteStudio."
reading_time: 30
difficulty: "medium"
concepts:
  - select-tabela-clientes
  - filtros-com-where
  - ordenacao-com-order-by
  - pratica-no-sqlitestudio
  - analise-de-dados-tabulares-simples
prerequisites:
  - criandos-tabelas-sqlite-dml-basica
  - sql-order-by-ordenacao-resultados
learning_objectives:
  - "Executar consultas SELECT básicas sobre uma tabela de clientes criada no SQLiteStudio."
  - "Aplicar filtros com WHERE usando operadores de comparação para selecionar subconjuntos de clientes."
  - "Ordenar resultados por idade e UF usando ORDER BY com uma ou mais colunas."
  - "Entender o fluxo completo: criar tabela, inserir dados e explorar com consultas."
exercises:
  - question: "Qual é a vantagem de testar `SELECT * FROM cliente;` logo após criar a tabela e antes de inserir dados?"
    answer: "Permite verificar se a tabela foi criada corretamente (nomes de colunas, tipos, existência) antes de popular com dados, facilitando a detecção precoce de erros de definição."
    hint: "Pense na ideia de \"conferir a estrutura\" antes de carregar conteúdo."
  - question: "Como você escreveria uma condição WHERE para selecionar apenas clientes com idade maior que 30 e UF igual a 'SP'?"
    answer: "Usando `WHERE idade_cliente > 30 AND uf_cliente = 'SP'` (ajustando os nomes das colunas conforme o esquema)."
    hint: "Combine operadores de comparação com o operador lógico AND."
  - question: "Por que é útil ordenar uma lista de clientes primeiro por UF e depois por idade?"
    answer: "Porque agrupa os clientes por estado (UF) e, dentro de cada grupo, mostra dos mais velhos para os mais novos ou vice-versa, facilitando análises regionais e de faixa etária."
    hint: "Relembre o exemplo de ordenação composta visto com outras tabelas."
review_after_days:
  - 3
  - 10
---

## Visão Geral do Conceito

Esta lição consolida o que você já aprendeu sobre **criação de tabelas**, **INSERT**, **SELECT**, **WHERE** e **ORDER BY** usando um exemplo simples e didático: a tabela `Cliente` criada no **SQLiteStudio**.  
Em vez de focar em novos comandos, o objetivo é **praticar** escrever consultas em cima de um conjunto pequeno de clientes, entendendo melhor filtros e ordenação.

Partiremos de uma tabela com colunas como código, nome, idade e UF, usando o SQLiteStudio como ambiente para criar a tabela, inserir registros e executar consultas.

## Modelo Mental

Pense na tabela `Cliente` como uma **agenda de clientes**:

- Cada linha é uma pessoa (cliente).  
- As colunas representam atributos: código, nome, idade, estado (UF).

As consultas SQL são diferentes **formas de folhear essa agenda**:

- `SELECT *` sem filtros: ver toda a agenda.  
- `WHERE idade_cliente > 30`: ver apenas quem está acima de uma certa idade.  
- `ORDER BY uf_cliente, idade_cliente`: organizar a agenda por estado e idade para facilitar comparações.

O SQLiteStudio funciona como um “caderno interativo” em que você:

1. Define a estrutura da agenda (`CREATE TABLE`).  
2. Preenche com contatos (`INSERT`).  
3. Faz buscas e ordenações (`SELECT` com WHERE e ORDER BY).

## Mecânica Central

### Estrutura da tabela Cliente

A aula cria uma tabela com a seguinte ideia de colunas:

- `Cod_Cliente` — código do cliente (texto de 3 caracteres).  
- `Nome_Cliente` — nome do cliente (texto de até 20 caracteres).  
- `Idade_Cliente` — idade (inteiro).  
- `UF_Cliente` — unidade federativa (texto de 2 caracteres).

Um esquema SQL equivalente:

```sql
CREATE TABLE Cliente (
  Cod_Cliente   TEXT(3),
  Nome_Cliente  TEXT(20),
  Idade_Cliente INTEGER,
  UF_Cliente    TEXT(2)
);
```

Depois de criar a tabela, é comum verificar:

```sql
SELECT *
FROM Cliente;
```

No início, o resultado mostra apenas o cabeçalho das colunas, sem linhas, confirmando que a estrutura foi criada corretamente.

### Inserindo registros na tabela Cliente

A aula mostra vários comandos `INSERT` para popular a tabela com clientes de diferentes estados e idades.  
Um exemplo representativo:

```sql
INSERT INTO Cliente VALUES ('001', 'Maria Flor', 25, 'MG');
INSERT INTO Cliente VALUES ('002', 'Alex Alves', 19, 'MG');
INSERT INTO Cliente VALUES ('003', 'Joana Pinho', 35, 'SP');
INSERT INTO Cliente VALUES ('004', 'João Batista', 36, 'SP');
INSERT INTO Cliente VALUES ('005', 'Livia Amaral', 22, 'SP');
INSERT INTO Cliente VALUES ('006', 'Ivo Paiva', 45, 'ES');
INSERT INTO Cliente VALUES ('007', 'Tais Souza', 21, 'RJ');
INSERT INTO Cliente VALUES ('008', 'Celso Costa', 31, 'RJ');
INSERT INTO Cliente VALUES ('009', 'Renata Neves', 44, 'RJ');
INSERT INTO Cliente VALUES ('010', 'Omar Silva', 29, 'RJ');
```

Após executar os `INSERTs`, um novo `SELECT * FROM Cliente;` deve mostrar todas as linhas inseridas.

### Consultas SELECT básicas

Com a tabela populada, você pode:

- Ver todas as colunas:

```sql
SELECT *
FROM Cliente;
```

- Selecionar apenas colunas específicas (por exemplo, nome e idade):

```sql
SELECT
  Nome_Cliente,
  Idade_Cliente
FROM Cliente;
```

- Selecionar UF e nome:

```sql
SELECT
  UF_Cliente,
  Nome_Cliente
FROM Cliente;
```

### Filtros com WHERE

Você pode aplicar filtros por idade ou UF, usando operadores de comparação (já estudados):

```sql
-- Clientes com idade maior que 25
SELECT
  Nome_Cliente,
  Idade_Cliente
FROM Cliente
WHERE Idade_Cliente > 25;

-- Clientes de SP
SELECT
  Nome_Cliente,
  UF_Cliente
FROM Cliente
WHERE UF_Cliente = 'SP';
```

Também pode combinar condições:

```sql
-- Clientes com idade maior que 30 E da UF 'RJ'
SELECT
  Nome_Cliente,
  Idade_Cliente,
  UF_Cliente
FROM Cliente
WHERE Idade_Cliente > 30
  AND UF_Cliente = 'RJ';
```

### Ordenação com ORDER BY

Você pode ordenar resultados por uma ou mais colunas:

```sql
-- Ordenar por UF e, dentro de cada UF, por nome
SELECT
  UF_Cliente,
  Nome_Cliente,
  Idade_Cliente
FROM Cliente
ORDER BY
  UF_Cliente ASC,
  Nome_Cliente ASC;
```

Ou focar em idade:

```sql
-- Clientes ordenados da maior para a menor idade
SELECT
  Nome_Cliente,
  Idade_Cliente,
  UF_Cliente
FROM Cliente
ORDER BY
  Idade_Cliente DESC;
```

### Fluxo completo no SQLiteStudio

O fluxo que a aula exercita pode ser representado assim:

```mermaid
flowchart TD
    A[Criar banco aula7.db no SQLiteStudio] --> B[CREATE TABLE Cliente]
    B --> C[INSERT INTO Cliente VALUES (...)]
    C --> D[SELECT * FROM Cliente]
    D --> E[SELECT com WHERE e ORDER BY<br/>filtros por idade e UF]
```

Essa sequência é a base da maioria dos exercícios iniciais de SQL: modelagem simples + carga de dados + exploração por consultas.

## Uso Prático

### 1. Conferindo a estrutura e o conteúdo

Depois de criar a tabela `Cliente` e inserir registros:

```sql
SELECT *
FROM Cliente;
```

Permite conferir rapidamente:

- Se as colunas aparecem com os nomes esperados.  
- Se todos os registros foram inseridos.  
- Se os tipos parecem coerentes (idades numéricas, UFs com 2 letras, etc.).

### 2. Produzindo uma “lista de contatos” por UF

Uma consulta útil:

```sql
SELECT
  UF_Cliente,
  Nome_Cliente
FROM Cliente
ORDER BY
  UF_Cliente ASC,
  Nome_Cliente ASC;
```

Gera uma lista agrupada por estado, em que os nomes dentro de cada UF aparecem ordenados alfabeticamente.

### 3. Encontrando clientes em faixas de idade

Você pode segmentar clientes por faixa etária:

```sql
-- Clientes com idade entre 20 e 30 anos
SELECT
  Nome_Cliente,
  Idade_Cliente,
  UF_Cliente
FROM Cliente
WHERE Idade_Cliente >= 20
  AND Idade_Cliente <= 30
ORDER BY
  Idade_Cliente ASC;
```

Essas consultas são típicas em relatórios de marketing e segmentação de público.

## Erros Comuns

- **Esquecer o esquema exato da tabela**  
  - Problema: usar nomes de colunas errados em WHERE ou ORDER BY.  
  - Correção: executar `SELECT * FROM Cliente;` ou ver a definição da tabela antes de escrever consultas mais complexas.

- **Misturar maiúsculas/minúsculas em valores de texto**  
  - Problema: escrever `WHERE uf_cliente = 'sp'` quando os dados foram inseridos como `'SP'`.  
  - Correção: padronizar a inserção (sempre maiúsculas) e/ou usar funções de normalização quando disponíveis.

- **Esquecer ORDER BY ao esperar uma ordem específica**  
  - Problema: contar com uma ordem “natural” que o banco não garante.  
  - Correção: usar ORDER BY explicitamente sempre que a ordem importar.

## Visão Geral de Debugging

Quando uma consulta na tabela `Cliente` não retorna o esperado:

- **1. Rode um SELECT simples sem WHERE**  
  - Veja se os dados estão mesmo na tabela, com os valores esperados.

- **2. Teste a condição WHERE isoladamente**  
  - Tente consultas mais simples (por exemplo, só `WHERE UF_Cliente = 'SP'`) para verificar qual parte da condição está filtrando demais.

- **3. Remova temporariamente o ORDER BY**  
  - Para focar apenas na seleção de linhas; depois volte a ordenar.

- **4. Verifique erros de nomes e grafia**  
  - Confirme se `Cliente` está com a grafia correta, assim como `Idade_Cliente`, `UF_Cliente`, etc.

## Principais Pontos

- A tabela `Cliente` é um cenário simples e poderoso para praticar SELECT, WHERE e ORDER BY.  
- `SELECT *` é uma ferramenta útil para conferir tanto estrutura quanto conteúdo.  
- Filtros com WHERE permitem extrair subconjuntos significativos (por idade, UF, faixa etária).  
- ORDER BY organiza esses subconjuntos, melhorando a legibilidade e a utilidade das consultas.

## Preparação para Prática

Após esta lição, você deve ser capaz de:

- Replicar no seu ambiente a tabela `Cliente` com dados de exemplo.  
- Escrever consultas SELECT com filtros e ordenações úteis para análise.  
- Depurar consultas simples nessa tabela quando os resultados não forem os esperados.  
- Transferir esse padrão de prática para outras tabelas e domínios (produtos, pedidos, transações).

No Laboratório de Prática, você irá:

- Escrever e rodar consultas variadas sobre a tabela `Cliente` para fixar o uso de WHERE e ORDER BY.  
- Criar variações de filtros por faixa etária e por estado.  
- Preparar consultas com ordenação composta.

## Laboratório de Prática

### Easy — Listar todos os clientes ordenados por nome

Usando a tabela `Cliente`, escreva uma consulta que retorne:

- `Cod_Cliente`, `Nome_Cliente`, `Idade_Cliente`, `UF_Cliente`.  
- Ordenados por `Nome_Cliente` em ordem alfabética.

```sql
-- TODO: selecionar todas as colunas e ordenar por nome
SELECT
  Cod_Cliente,
  Nome_Cliente,
  Idade_Cliente,
  UF_Cliente
FROM Cliente
ORDER BY
  Nome_Cliente ASC;
```

Experimente trocar para `DESC` para ver a ordem invertida.

### Medium — Filtrar clientes por idade mínima e ordenar por idade

Escreva uma consulta que:

- Retorne apenas clientes com `Idade_Cliente >= 30`.  
- Mostre `Nome_Cliente`, `Idade_Cliente` e `UF_Cliente`.  
- Ordene primeiro por `Idade_Cliente` em ordem decrescente.

```sql
-- TODO: aplicar filtro por idade e ordenar em ordem decrescente
SELECT
  Nome_Cliente,
  Idade_Cliente,
  UF_Cliente
FROM Cliente
WHERE Idade_Cliente >= 30
ORDER BY
  Idade_Cliente DESC;
```

Opcional: adicione `UF_Cliente` como segundo critério de ordenação.

### Hard — Relatório de clientes por UF e faixa etária

Crie uma consulta que:

1. Traga `Cod_Cliente`, `Nome_Cliente`, `Idade_Cliente` e `UF_Cliente`.  
2. Filtre apenas clientes com `Idade_Cliente` entre 20 e 40 anos (inclusive).  
3. Ordene os resultados:
   - Primeiro por `UF_Cliente` em ordem ascendente.  
   - Depois por `Idade_Cliente` em ordem ascendente.  
   - Em caso de empate, por `Nome_Cliente` em ordem ascendente.

```sql
-- TODO: combinar filtro de faixa etaria com ordenacao composta
SELECT
  Cod_Cliente,
  Nome_Cliente,
  Idade_Cliente,
  UF_Cliente
FROM Cliente
WHERE Idade_Cliente BETWEEN 20 AND 40
ORDER BY
  UF_Cliente ASC,
  Idade_Cliente ASC,
  Nome_Cliente ASC;
```

Pense em como esse relatório poderia ser usado em uma apresentação ou dashboard simples sobre a distribuição de clientes por estado e idade.

<!-- CONCEPT_EXTRACTION
concepts:
  - consultas select em tabela de clientes
  - filtros com where por idade e uf
  - ordenacao com order by em multiplas colunas
  - pratica de sql no sqlitestudio
skills:
  - Escrever consultas select basicas para explorar uma tabela de clientes
  - Aplicar filtros com where usando operadores de comparacao
  - Ordenar resultados com order by usando uma ou mais colunas
  - Validar estrutura e conteudo de tabelas recem-criadas via select
examples:
  - cliente-select-todos
  - cliente-filtro-idade-uf
  - cliente-relatorio-ordenado-por-uf-idade-nome
-->

<!-- EXERCISES_JSON
[
  {
    "id": "consultas-sql-clientes-easy",
    "slug": "consultas-sql-clientes-easy",
    "difficulty": "easy",
    "title": "Listar clientes ordenados por nome",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "select", "order-by"],
    "summary": "Escrever uma consulta que lista todos os clientes ordenados alfabeticamente pelo nome."
  },
  {
    "id": "consultas-sql-clientes-medium",
    "slug": "consultas-sql-clientes-medium",
    "difficulty": "medium",
    "title": "Filtrar clientes por idade minima",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "where", "order-by"],
    "summary": "Criar uma consulta que retorna apenas clientes com idade a partir de 30 anos, ordenando por idade decrescente."
  },
  {
    "id": "consultas-sql-clientes-hard",
    "slug": "consultas-sql-clientes-hard",
    "difficulty": "hard",
    "title": "Relatorio de clientes por UF e faixa etaria",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "where", "order-by", "multiplas-colunas"],
    "summary": "Montar uma consulta que filtra clientes por faixa etaria e ordena por UF, idade e nome para uso em relatorios."
  }
]
-->

