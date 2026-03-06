---
title: "SELECT com WHERE: BETWEEN, NOT IN, LIKE e contexto do TP3"
slug: "sql-between-not-in-like-weather-stations-tp3"
discipline: "visualizacao-sql"
order: 11
description: "Etapa 6 (continuação): operadores BETWEEN, NOT IN, LIKE com curingas; referência station_data/weather_stations.db; TP3 como aplicação de SELECT/WHERE."
reading_time: 7
difficulty: "medium"
concepts:
  - BETWEEN
  - NOT IN
  - LIKE
  - curinga percentual
  - curinga underscore
  - filtro por intervalo
  - filtro por data
  - TP3
prerequisites:
  - "sql-where-operadores-and-or-in-sqlitestudio"
exercises:
  - question: "Qual a diferença entre BETWEEN e dois comparadores com AND?"
    answer: "BETWEEN valor1 AND valor2 é equivalente a coluna >= valor1 AND coluna <= valor2 — inclui os extremos. Ex.: year BETWEEN 2005 AND 2010 traz 2005, 2006, …, 2010. Mesmo resultado que year >= 2005 AND year <= 2010."
    hint: "BETWEEN é inclusivo nos dois lados."
  - question: "O que retorna WHERE mes NOT IN (3, 6, 9, 12)?"
    answer: "Linhas em que o valor da coluna mes não está na lista — ou seja, meses 1, 2, 4, 5, 7, 8, 10, 11. NOT nega o IN."
    hint: "NOT IN = excluir os valores da lista."
  - question: "Para que serve o curinga % no LIKE?"
    answer: "Representa zero ou mais caracteres. Ex.: report_code LIKE 'A%' retorna códigos que começam com A; o que vem depois pode ser qualquer coisa (AB, A1, AXYZ)."
    hint: "% = qualquer sequência de caracteres."
  - question: "Posso comparar coluna de data com string no formato '2024-01-20' no WHERE?"
    answer: "Sim. Em SQL é comum usar comparações como data_pedido >= '2024-01-20'. O SGBD interpreta a string no formato ISO (ano-mês-dia) para comparação cronológica."
    hint: "Formato ISO: ano-mês-dia."
  - question: "No TP3, como entregar cada questão?"
    answer: "Criar um bloco (dataframe) por comando; escrever o SELECT/WHERE; executar; fazer print/captura do resultado. Mostrar o comando e a execução — sem uso de IA no exercício propriamente dito."
    hint: "Um bloco por questão; comando + resultado visível."
---

## Resumo

### Mapa da aula

- Extensão de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE`</mark>: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`BETWEEN`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NOT IN`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`LIKE`</mark>
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`BETWEEN`</mark> = intervalo inclusivo; equivalente a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>=`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<=`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AND`</mark>
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`LIKE`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> (qualquer sequência) e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark> (um caractere)
- Referência: livro O’Reilly, <em>station_data</em> / <em>weather_stations.db</em>; TP3 aplica tudo em clientes, pedidos, vendedores
- Erro clássico: usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`BETWEEN`</mark> com ordem trocada (menor valor primeiro)

- **BETWEEN:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`col BETWEEN a AND b`</mark> inclui <em>a</em> e <em>b</em>. Equivalente a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`col >= a AND col <= b`</mark>. Para intervalo exclusivo em um lado usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<`</mark> com AND.
- **NOT IN:** nega a lista; retorna linhas cujo valor <strong>não</strong> está em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`(v1, v2, ...)`</mark>.
- **LIKE:** padrão em texto. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> = zero ou mais caracteres; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark> = exatamente um. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`report_code LIKE 'A%'`</mark> — começa com A.
- **Data no WHERE:** comparar coluna tipo data com string no formato <code>'YYYY-MM-DD'</code> (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`data_pedido >= '2024-01-20'`</mark>).

**Resumo em 5 linhas:** Esta aula estende o WHERE com BETWEEN (intervalo inclusivo), NOT IN (excluir lista) e LIKE com curingas (% e _). BETWEEN equivale a >= e <= com AND. LIKE serve para “começa com”, “termina com” ou padrões. Referência: station_data/weather_stations.db (O’Reilly). TP3 aplica SELECT/WHERE em tabelas clientes, pedidos, vendedores — um bloco por questão, comando + execução visível.

**Palavras-chave:** BETWEEN, NOT IN, LIKE, %, _, curinga, intervalo inclusivo, station_data, weather_stations, data no WHERE, TP3.

---

## Explicações

### 1. Tema e escopo

- **Inclui:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`BETWEEN`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NOT IN`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`LIKE`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark>; filtro por data (string ISO); referência ao material com <em>station_data</em>; contexto do TP3 (tabelas clientes, pedidos, vendedores, produtos).
- **Não inclui:** JOIN, GROUP BY, funções de agregação. Pré-requisito: [[aula-10-sql-where-operadores-and-or-in-sqlitestudio]].

### 2. Contexto na disciplina

- Continuação da Etapa 6 (SELECT com WHERE). Livro de referência: O’Reilly, Chapter 4 SELECT e Chapter 5 WHERE; dataset <em>weather_stations.db</em> com tabela <em>station_data</em> (ano, mês, etc.).
- TP3 avalia competência de extrair informações com SQL (SELECT e filtros); questões sobre clientes, pedidos, vendedores.

### 4. Ideias-chave

1. **BETWEEN** — intervalo fechado: os dois extremos entram. Ordem obrigatória: menor valor primeiro (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year BETWEEN 2005 AND 2010`</mark>).
2. **NOT IN** — negação do IN: linhas cujo valor não está na lista. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`month NOT IN (3, 6, 9, 12)`</mark> → meses 1, 2, 4, 5, 7, 8, 10, 11.
3. **LIKE** — padrão em texto. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> = qualquer sequência (inclusive vazia); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark> = exatamente um caractere.
4. **Data no WHERE** — coluna de data comparável com string no formato <code>'YYYY-MM-DD'</code> (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`data_pedido >= '2024-01-20'`</mark>).
5. **TP3** — um bloco por questão; mostrar comando e resultado; não usar IA na resolução do exercício.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 BETWEEN

- Sintaxe: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`coluna BETWEEN valor1 AND valor2`</mark>. Inclui valor1 e valor2.
- Equivalente: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`coluna >= valor1 AND coluna <= valor2`</mark>.

Exemplo (station_data):

```bash
SELECT * FROM station_data WHERE year BETWEEN 2005 AND 2010;
-- 2005, 2006, 2007, 2008, 2009, 2010 (todos inclusos)
```

- Para “entre 2006 e 2009” exclusivo em um lado: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year > 2005 AND year < 2010`</mark> (ou ajustar conforme enunciado).
- ❌ **Erro:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year BETWEEN 2010 AND 2005`</mark> — ordem errada; pode retornar zero linhas dependendo do SGBD.

#### 5.2 NOT IN

- Sintaxe: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`coluna NOT IN (v1, v2, v3)`</mark>. Retorna linhas em que o valor da coluna não é v1, nem v2, nem v3.

Exemplo:

```bash
SELECT * FROM station_data WHERE month NOT IN (3, 6, 9, 12);
-- meses 1, 2, 4, 5, 7, 8, 10, 11
```

- **Quando usar:** excluir um conjunto fixo de valores. **Quando NÃO usar:** quando quiser “está na lista” → usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IN`</mark>.

#### 5.3 LIKE e curingas

- **LIKE** = “como” (padrão). Curingas: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> (zero ou mais caracteres), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark> (um caractere).

Exemplos:

```bash
-- Códigos que começam com A
SELECT * FROM station_data WHERE report_code LIKE 'A%';

-- Termina com 9
WHERE col LIKE '%9';

-- Exatamente 3 caracteres, sendo o do meio 'x'
WHERE col LIKE '_x_';
```

- ⚠️ **Atenção:** em alguns SGBDs <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`LIKE`</mark> é case-sensitive conforme collation; em SQLite comparação padrão é case-insensitive para ASCII em muitos contextos — conferir documentação.

#### 5.4 Data no WHERE

- Coluna do tipo data (ou string em formato data) pode ser comparada com literal no formato ISO: <code>'YYYY-MM-DD'</code>.

Exemplo (TP3 — pedidos):

```bash
SELECT * FROM pedidos
WHERE data_pedido >= '2024-01-20'
  AND (valor_total < 200 OR status = 'Processando');
```

### 5b. Modelo mental

- **BETWEEN:** o SGBD avalia “coluna >= a e coluna <= b”; uma única expressão para intervalo fechado.
- **NOT IN:** para cada linha, verifica se o valor da coluna está na lista; se não estiver, inclui no resultado.
- **LIKE:** comparação por padrão: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark> são interpretados como curingas, não como literal.

### 5c. Comparação direta

| Construção | Exemplo | Equivalente |
|------------|--------|-------------|
| BETWEEN | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year BETWEEN 2005 AND 2010`</mark> | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year >= 2005 AND year <= 2010`</mark> |
| IN | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`month IN (3, 6, 9, 12)`</mark> | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`month = 3 OR month = 6 OR ...`</mark> |
| NOT IN | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`month NOT IN (3, 6, 9, 12)`</mark> | meses que não são 3, 6, 9 nem 12 |
| LIKE 'A%' | começa com A | padrão texto, não igualdade exata |

### 5d. Quando usar

- **BETWEEN:** intervalo numérico ou de datas com extremos inclusos; deixa a query mais legível que dois comparadores com AND.
- **NOT IN:** excluir lista fixa de valores (ex.: planos que não são Free; meses que não são trimestrais).
- **LIKE:** busca por prefixo/sufixo/padrão (ex.: códigos que começam com letra, nomes que contêm um trecho). Para igualdade exata usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark>.

### 6. Teste de reconhecimento rápido

**O que retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year BETWEEN 2006 AND 2009`</mark> em relação a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`year >= 2006 AND year <= 2009`</mark>?**  
**Resposta:** O mesmo conjunto: anos 2006, 2007, 2008, 2009 (ambos inclusos).

---

**<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`report_code LIKE 'A%'`</mark> — quais linhas entram?**  
**Resposta:** Linhas em que <code>report_code</code> começa com a letra A; o que vem depois pode ser qualquer coisa (AB, A1, AXYZ).

---

**Enunciado: “pedidos a partir de 20/01/2024”. Qual comparação usar?**  
**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`data_pedido >= '2024-01-20'`</mark> (formato ISO).

### 7. Erros clássicos de prova

- **BETWEEN com ordem trocada:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`BETWEEN 2010 AND 2005`</mark> — sempre o menor à esquerda.
- **Achar que BETWEEN é exclusivo:** entre 2005 e 2010 inclui 2005 e 2010.
- **Confundir NOT IN com IN:** NOT IN exclui os valores da lista; IN inclui só os da lista.
- **Usar = para padrão de texto:** “começa com A” exige <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`LIKE 'A%'`</mark>, não <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`= 'A'`</mark>.

### 7b. Armadilhas clássicas

- **“Entre 2006 e 2009” sem incluir 2006 e 2009** → usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`> 2005 AND < 2010`</mark> (ou equivalente), não BETWEEN se o enunciado for exclusivo.
- **“Todos exceto cancelado”** → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`status != 'Cancelado'`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`status NOT IN ('Cancelado')`</mark>.
- **Data em formato brasileiro no SQL** → preferir <code>'YYYY-MM-DD'</code> para evitar ambiguidade.

### 8. Exemplos de alta densidade

```bash
SELECT * FROM station_data WHERE year BETWEEN 2005 AND 2010;
SELECT * FROM station_data WHERE month IN (3, 6, 9, 12);
SELECT * FROM station_data WHERE month NOT IN (3, 6, 9, 12);
SELECT * FROM station_data WHERE report_code LIKE 'A%';
SELECT * FROM pedidos WHERE data_pedido >= '2024-01-20' AND valor_total < 200;
SELECT nome_vendedor, regiao FROM vendedores WHERE meta_atingida = 1 AND regiao != 'Sudeste';
```

### 12b. Regra de prova

- **BETWEEN a AND b** → extremos inclusos; equivalente a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>= a AND <= b`</mark>; menor valor primeiro.
- **NOT IN (lista)** → retorna linhas cujo valor não está na lista.
- **LIKE 'A%'** → começa com A; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> = qualquer sequência.
- **Data no WHERE** → usar string <code>'YYYY-MM-DD'</code> para comparação.

### 15. Síntese operacional

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`BETWEEN valor1 AND valor2`</mark> = intervalo inclusivo; ordem: menor primeiro; equivale a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>=`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<=`</mark> com AND.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NOT IN (v1, v2, ...)`</mark> exclui os valores da lista; IN inclui só os da lista.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`LIKE`</mark>: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> = zero ou mais caracteres; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`_`</mark> = um caractere; ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`col LIKE 'A%'`</mark> para “começa com A”.
- Comparar data no WHERE com string <code>'YYYY-MM-DD'</code> (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`data_pedido >= '2024-01-20'`</mark>).
- TP3: um bloco por questão; mostrar comando e execução; não usar IA na resolução.
