---
title: "Ordenando resultados em SQL com ORDER BY"
slug: "sql-order-by-ordenacao-resultados"
discipline: "visualizacao-sql"
order: 12
description: "Usando ORDER BY para ordenar resultados de consultas SQL por uma ou mais colunas, em ordem ascendente ou descendente."
reading_time: 30
difficulty: "medium"
concepts:
  - order-by
  - ordenacao-asc-e-desc
  - ordenacao-por-multiplas-colunas
  - ordenacao-por-texto-numero-e-data
  - boas-praticas-de-ordenacao-em-consultas
prerequisites:
  - sql-operadores-logicos-expressoes-select
learning_objectives:
  - "Usar ORDER BY para ordenar resultados de consultas SQL por uma ou mais colunas."
  - "Controlar se a ordenação é ascendente (ASC) ou descendente (DESC)."
  - "Ordenar corretamente por colunas numéricas, textuais e de data."
  - "Combinar ORDER BY com filtros em WHERE para construir consultas mais úteis."
exercises:
  - question: "O que acontece se você não especificar ASC ou DESC em um ORDER BY?"
    answer: "A maioria dos bancos de dados assume ordenação ascendente (ASC) por padrão, ou seja, do menor para o maior ou de A até Z."
    hint: "Relembre a explicação de que o comportamento padrão é ascendente."
  - question: "Por que ORDER BY não é automático quando você faz um SELECT sem essa cláusula?"
    answer: "Porque o banco de dados prioriza eficiência e não garante uma ordem específica sem que você peça; a ordem física ou interna pode variar, então é necessário usar ORDER BY quando a ordem importa."
    hint: "Pense nos exemplos de e-mail, contatos e extrato bancário."
  - question: "Como ORDER BY funciona quando você passa duas colunas, como `ORDER BY age ASC, fullName ASC`?"
    answer: "Ele ordena primeiro por `age`; se houver empates na idade, usa `fullName` como critério de desempate para definir a ordem dentro de cada grupo de mesma idade."
    hint: "Relembre o exemplo das celebridades com mesma idade."
review_after_days:
  - 3
  - 10
---

## Visão Geral do Conceito

Esta lição aprofunda o uso de **ORDER BY** em SQL, mostrando como ordenar resultados de consultas por uma ou mais colunas, em **ordem ascendente ou descendente**.  
Embora muitas interfaces de usuário mostrem listas naturalmente ordenadas (e-mails, contatos, extratos bancários), nos bancos de dados **essa ordenação não é automática**: você precisa pedi-la explicitamente com ORDER BY.

Trabalharemos com exemplos de tabelas de celebridades (`celebrities`), demonstrando como ordenar por idade, nacionalidade e nome completo, incluindo casos em que é necessário usar **mais de uma coluna** como critério.

## Modelo Mental

Pense em ORDER BY como a etapa de **“classificação”** de uma planilha depois que você já filtrou os dados:

- O **SELECT** escolhe quais colunas e linhas você quer ver.  
- O **WHERE** decide **quais linhas entram** no resultado (filtros).  
- O **ORDER BY** decide **em que ordem** essas linhas serão apresentadas (critério de ordenação).

Sem ORDER BY, o banco devolve os registros na ordem que for mais conveniente internamente — não há garantia de estar “bonito” nem previsível.  
Com ORDER BY, você garante que os dados sigam uma lógica clara: do menor para o maior, de A até Z ou o inverso.

## Mecânica Central

### Sintaxe básica de ORDER BY

A forma geral é:

```sql
SELECT colunas
FROM tabela
WHERE condicao_opcional
ORDER BY coluna1 [ASC | DESC], coluna2 [ASC | DESC], ...;
```

Onde:

- `ASC` significa **ascendente** (padrão se omitido).  
- `DESC` significa **descendente**.

Se você não informar `ASC` ou `DESC`, o banco assume normalmente `ASC`.

### Ordenação ascendente e descendente

Para uma tabela `celebrities` com uma coluna `age`:

```sql
-- Idades em ordem ascendente (padrão)
SELECT *
FROM celebrities
ORDER BY age;

-- Idades em ordem descendente
SELECT *
FROM celebrities
ORDER BY age DESC;
```

Em ordem ascendente:

- Números: do menor para o maior (ex.: 24, 29, 35, 48, 63).  
- Texto: de A até Z (conforme a ordem alfabética).  
- Datas: da mais antiga para a mais recente (dependendo do tipo e do formato).

Em ordem descendente, a lógica se inverte.

### Ordenação por texto, número e data

ORDER BY funciona igualmente para diferentes tipos de coluna:

- **Números** (`INT`, `NUMERIC`): ordena pelo valor numérico.  
- **Texto** (`VARCHAR`, `TEXT`): ordena pela ordem alfabética (como em um dicionário).  
- **Datas** (`DATE`, `TIMESTAMP`): ordena cronologicamente.

Exemplos:

```sql
-- Ordenar celebridades por nome completo, A-Z
SELECT *
FROM celebrities
ORDER BY fullName ASC;

-- Ordenar transações bancárias da mais recente para a mais antiga
SELECT *
FROM transacoes
ORDER BY dataTransacao DESC;
```

### Ordenação por múltiplas colunas

Você pode passar mais de uma coluna em ORDER BY.  
Isso é útil quando o primeiro critério empata para algumas linhas.

Exemplo com a tabela `celebrities`:

```sql
-- Ordenar primeiro por idade (crescente), depois por nome completo (crescente)
SELECT *
FROM celebrities
ORDER BY age ASC, fullName ASC;
```

Aqui:

- Primeiro, o resultado é agrupado por idade (24, depois 29, depois 35, etc.).  
- Dentro de cada idade, os registros são ordenados alfabeticamente por `fullName`.

Isso é exatamente o comportamento descrito no exemplo em que duas celebridades têm idade 35: o desempate vem pelo nome completo (`Gal Gadot` antes de `Scarlett Johansson`).

### Fluxo lógico de SELECT + WHERE + ORDER BY

Podemos representar a sequência de operações assim:

```mermaid
flowchart TD
    A[Tabela base<br/>celebrities] --> B[Filtrar com WHERE<br/>(opcional)]
    B --> C[Selecionar colunas com SELECT]
    C --> D[Ordenar linhas com ORDER BY]
    D --> E[Resultado final<br/>ordenado conforme criterio]
```

Mesmo que você escreva ORDER BY no fim, o banco primeiro:

1. Aplica o WHERE (quando presente).  
2. Monta o conjunto de linhas do SELECT.  
3. Ordena o conjunto final segundo os critérios do ORDER BY.

## Uso Prático

### 1. Ordenando por uma única coluna numérica (idade)

Exemplo com a tabela `celebrities`:

```sql
-- Todas as colunas, ordenadas por idade (crescente)
SELECT *
FROM celebrities
ORDER BY age ASC;
```

Resultado (esquemático):

- 24  
- 29  
- 35  
- 35  
- 48  
- 63

Troque para descendente:

```sql
SELECT *
FROM celebrities
ORDER BY age DESC;
```

E observe que a sequência se inverte.

### 2. Ordenando por texto (nacionalidade, nome completo)

Ordenando por `nationality` em ordem descendente:

```sql
SELECT *
FROM celebrities
ORDER BY nationality DESC;
```

- Primeiro vêm as nacionalidades mais “altas” na ordem alfabética (por exemplo, valores iniciados com letras mais próximas de Z).  
- Em seguida, as demais, até chegar às primeiras letras (como A).

Ordenando por `fullName` em ordem ascendente:

```sql
SELECT *
FROM celebrities
ORDER BY fullName ASC;
```

O comportamento é o mesmo de uma lista de nomes em um catálogo ou agenda telefônica.

### 3. Ordenando por múltiplas colunas (idade e nome)

Para aplicar o desempate por nome quando a idade empata:

```sql
SELECT *
FROM celebrities
ORDER BY age ASC, fullName ASC;
```

Passo a passo:

1. Ordena por `age`.  
2. Dentro de cada idade (`35`, por exemplo), ordena por `fullName`.

Você pode misturar direções:

```sql
-- Idade crescente, e dentro da idade, nome decrescente
SELECT *
FROM celebrities
ORDER BY age ASC, fullName DESC;
```

### 4. Combinando ORDER BY com WHERE

Você raramente usa ORDER BY isolado; normalmente ele é combinado com filtros:

```sql
-- Celebridades com mais de 30 anos, ordenadas por idade e nome
SELECT
  fullName,
  age,
  nationality
FROM celebrities
WHERE age > 30
ORDER BY age ASC, fullName ASC;
```

Outro exemplo com transações bancárias:

```sql
SELECT
  dataTransacao,
  descricao,
  valor
FROM transacoes
WHERE valor < 0  -- apenas saídas
ORDER BY dataTransacao DESC;
```

Aqui, ORDER BY garante que os lançamentos mais recentes apareçam primeiro, como em um extrato bancário típico.

## Erros Comuns

- **Assumir ordem “natural” sem ORDER BY**  
  - Problema: confiar que o banco sempre mostrará os dados na mesma ordem (por exemplo, inserção), o que **não é garantido**.  
  - Correção: sempre usar ORDER BY quando a ordem faz diferença para leitura ou lógica de negócio.

- **Esquecer o sentido (ASC vs DESC)**  
  - Problema: esperar ver “mais recentes primeiro” mas usar o padrão ascendente.  
  - Correção: explicitar `DESC` quando quiser dados do maior para o menor (datas mais novas, valores maiores, etc.).

- **Misturar tipos incompatíveis**  
  - Problema: ordenar datas armazenadas como texto em formatos inconsistentes, gerando ordem “alfabética” errada.  
  - Correção: garantir tipos adequados (`DATE`, `TIMESTAMP`) ou normalizar os formatos antes de ordenar.

- **Não aproveitar ordenação por múltiplas colunas**  
  - Problema: ordenar só por um campo e ter resultados “embaralhados” quando há muitos empates.  
  - Correção: adicionar colunas de desempate, como nome, cidade, ID, conforme a necessidade.

## Visão Geral de Debugging

Quando a ordenação parece estranha:

- **1. Verifique o tipo de dado**  
  - Confirme se a coluna usada em ORDER BY é numérica, textual ou de data adequada.  
  - Se for texto e deveria ser data, considere converter.

- **2. Teste sem WHERE**  
  - Execute um `SELECT ... ORDER BY ...` sem filtros para ver a ordenação bruta e compará-la com sua expectativa.

- **3. Adicione colunas auxiliares**  
  - Inclua colunas como `id`, `created_at` ou `fullName` no SELECT para entender melhor como a ordenação está sendo aplicada.

- **4. Revise múltiplos critérios**  
  - Verifique se a ordem das colunas em ORDER BY reflete a prioridade correta (primeiro critério principal, depois desempates).

## Principais Pontos

- ORDER BY é a ferramenta central para controlar a **ordem de exibição** de resultados em SQL.  
- A ordem padrão é ascendente; use DESC para inverter.  
- Você pode ordenar por múltiplas colunas, definindo critérios de desempate.  
- Combinar ORDER BY com WHERE produz consultas que trazem **apenas** os dados relevantes e já **organizados** para leitura.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Escrever consultas com ORDER BY simples e múltiplo (duas ou mais colunas).  
- Escolher corretamente entre ASC e DESC conforme o contexto (alfabético, numérico, data).  
- Depurar resultados de ordenação que não batem com sua expectativa.  
- Aplicar esses conceitos em cenários reais, como listas de contatos, extratos, relatórios de vendas e dashboards.

No Laboratório de Prática, você irá:

- Praticar ORDER BY em tabelas de exemplo (celebridades, transações).  
- Explorar combinações de critérios de ordenação.  
- Preparar consultas pensadas para alimentar relatórios e dashboards.

## Laboratório de Prática

### Easy — Ordenando celebridades por idade e nome

Considere a tabela `celebrities` com colunas `fullName`, `age` e `nationality`.  
Escreva uma consulta que retorne todas as colunas, ordenando:

- Primeiro por `age` em ordem crescente.  
- Dentro de cada idade, por `fullName` em ordem crescente.

```sql
-- TODO: completar com ORDER BY adequado
SELECT
  fullName,
  age,
  nationality
FROM celebrities
ORDER BY
  age ASC,
  fullName ASC;
```

Teste variando a direção (por exemplo, `fullName DESC`) para observar a diferença.

### Medium — Ordenando extrato bancário por data e valor

Suponha uma tabela `extrato` com colunas `data`, `descricao` e `valor`.  
Escreva uma consulta que:

- Mostre apenas lançamentos negativos (`valor < 0`).  
- Ordene os resultados da **data mais recente para a mais antiga**.  

```sql
-- TODO: combinar WHERE com ORDER BY
SELECT
  data,
  descricao,
  valor
FROM extrato
WHERE valor < 0
ORDER BY
  data DESC;
```

Pense em como isso melhora a leitura em comparação com uma consulta sem ORDER BY.

### Hard — Ordenação composta em relatório de clientes

Considere uma tabela `clientes` com colunas:

- `id`.  
- `nomeCompleto`.  
- `idade`.  
- `uf`.  

Escreva uma consulta que:

1. Traga apenas clientes com `idade >= 18`.  
2. Ordene primeiro por `uf` em ordem ascendente.  
3. Dentro de cada `uf`, ordene por `idade` em ordem descendente (mais velhos primeiro).  
4. Em caso de empate de idade, ordene por `nomeCompleto` em ordem ascendente.

```sql
-- TODO: montar ORDER BY com tres criterios
SELECT
  id,
  nomeCompleto,
  idade,
  uf
FROM clientes
WHERE idade >= 18
ORDER BY
  uf ASC,
  idade DESC,
  nomeCompleto ASC;
```

Reflita sobre como essa ordenação seria útil em um relatório de clientes por estado.

<!-- CONCEPT_EXTRACTION
concepts:
  - uso de order by em sql
  - ordenacao ascendente e descendente
  - ordenacao por multiplas colunas
  - ordenacao de resultados apos where
skills:
  - Aplicar order by para controlar a ordem de resultados em consultas
  - Combinar criterios de ordenacao em multiplas colunas
  - Escolher corretamente entre asc e desc para diferentes tipos de dados
  - Depurar problemas de ordenacao inesperada em consultas
examples:
  - celebrities-age-fullname-orderby
  - extrato-data-descendente
  - clientes-uf-idade-nome-orderby
-->

<!-- EXERCISES_JSON
[
  {
    "id": "sql-order-by-easy",
    "slug": "sql-order-by-easy",
    "difficulty": "easy",
    "title": "Ordenar celebridades por idade e nome",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "order-by", "ordenacao"],
    "summary": "Escrever uma consulta que ordena celebridades por idade e, em caso de empate, por nome completo."
  },
  {
    "id": "sql-order-by-medium",
    "slug": "sql-order-by-medium",
    "difficulty": "medium",
    "title": "Ordenar extrato bancario por data",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "order-by", "datas"],
    "summary": "Criar uma consulta que filtra lancamentos negativos e ordena o extrato bancario da data mais recente para a mais antiga."
  },
  {
    "id": "sql-order-by-hard",
    "slug": "sql-order-by-hard",
    "difficulty": "hard",
    "title": "Ordenacao composta em relatorio de clientes",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "order-by", "multiplas-colunas"],
    "summary": "Escrever uma consulta que combina varios criterios de ordenacao (estado, idade, nome) em um relatorio de clientes."
  }
]
-->

