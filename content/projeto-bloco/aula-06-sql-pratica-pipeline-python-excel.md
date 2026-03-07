---
title: "SQL na Prática, Pipeline de Dados e Integração Python–Excel–SQL"
slug: "sql-pratica-pipeline-python-excel"
discipline: "projeto-bloco"
order: 6
description: "Comandos SQL (SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, WHERE); cuidados com UPDATE/DELETE; pipeline origem–destino com Python (pandas, pyodbc); Excel para SQL Server."
reading_time: 9
difficulty: "easy"
concepts:
  - SELECT e consulta
  - CREATE TABLE e tipos de campo
  - INSERT UPDATE DELETE
  - WHERE e filtro
  - DDL e DML
  - pipeline de dados (origem, processamento, destino)
  - pandas e pyodbc
  - leitura Excel e escrita em banco
  - regras de negócio
  - cuidado UPDATE/DELETE sem WHERE
  - sequência e ID ao recriar tabela
prerequisites:
  - aula-05-variaveis-tipos-dados-caso-cnpj
exercises:
  - question: "Por que UPDATE e DELETE sem WHERE são perigosos?"
    answer: "Sem WHERE o comando afeta todas as linhas da tabela. UPDATE iguala o campo em todos os registros; DELETE apaga tudo. Boa prática: primeiro fazer SELECT com a mesma condição do WHERE para conferir quantas linhas serão afetadas; em produção, backup ou cópia da tabela antes."
  - question: "O que é um pipeline de dados no contexto Python–Excel–SQL?"
    answer: "Origem (ex.: arquivo Excel) → processamento (leitura, transformação opcional) → destino (ex.: tabela no SQL Server). No exemplo: pandas.read_excel, eventual transformação (ex. rename colunas), pyodbc para conexão, INSERT linha a linha (for) ou em lote, commit."
  - question: "Para que servem as bibliotecas pandas e pyodbc no exemplo Excel→SQL?"
    answer: "pandas: leitura e manipulação de dados (read_excel, rename, iterar linhas). pyodbc: conexão do Python com o banco (ODBC); permite executar comandos SQL (INSERT, TRUNCATE) e commit a partir do Python."
  - question: "Ao recriar uma tabela, por que os IDs podem \"zerar\" e como corrigir?"
    answer: "Recriar tabela (DROP + CREATE) ou TRUNCATE reinicia o contador de identidade/sequência. Para manter continuidade: antes de recriar, obter o último ID usado; depois recriar e ajustar a SEQUENCE (Oracle) ou o seed do IDENTITY (SQL Server) para o próximo valor."
  - question: "O que são regras de negócio e onde podem ficar?"
    answer: "São as regras que delimitam como os dados podem ser criados, alterados ou usados (ex.: preço < 100 não considerar; campo obrigatório). Podem estar na aplicação, no banco (constraints, triggers) ou em ambos; hoje muitas ficam mais na aplicação."
  - question: "No SQL, qual a diferença entre DDL e DML? Dê um exemplo de cada."
    answer: "DDL (definição): cria/altera estrutura — CREATE TABLE, ALTER TABLE, DROP. DML (manipulação): altera dados — INSERT, UPDATE, DELETE; SELECT é consulta. DDL mexe no esquema; DML mexe nos registros."
---
## Resumo

### Mapa da aula

- **Revisão rápida Python**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`import`</mark> de bibliotecas; variáveis sem declaração de tipo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print`</mark> saída, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input`</mark> retorna string; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`try`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`except`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`os.system('cls')`</mark> (Windows) ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`clear`</mark> (Linux).
- **SQL na prática**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> consulta; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CREATE TABLE`</mark> com tipo por coluna (VARCHAR, DATE, DECIMAL, INT) e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NOT NULL`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT INTO ... VALUES`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`UPDATE ... SET ... WHERE`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DELETE FROM ... WHERE`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER TABLE`</mark> para adicionar/alterar coluna. **Cuidado**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`UPDATE`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DELETE`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE`</mark> afetam todas as linhas; antes fazer <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> com a mesma condição.
- **Pipeline origem–destino**: atividade típica: Excel (origem) → banco SQL (destino). Passos: ter origem (arquivo, permissão); ter destino (servidor, banco, tabela, usuário/senha); depois automatizar (ex.: Python).
- **Integração Python–Excel–SQL**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pandas`</mark> (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read_excel`</mark>, transformação); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pyodbc`</mark> (conexão ODBC, executar SQL); conexão com string (server, database, user, password, driver); opcional <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TRUNCATE`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT`</mark> com placeholders <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`?`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`for`</mark> nas linhas do DataFrame; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`commit`</mark>. Regras de negócio: podem estar na aplicação ou no banco; transformação (ex.: renomear colunas) é exemplo de regra.
- **Ferramentas**: SSMS (SQL Server), pgAdmin (PostgreSQL), DBeaver, MySQL Workbench — visualizar tabelas, colunas, tipos, relacionamentos (diagrama), DDL.
- **Sequência/ID**: ao recriar tabela, ID/identidade pode zerar; em Oracle ajustar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SEQUENCE`</mark>; em SQL Server ajustar seed do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IDENTITY`</mark>.

**Resumo em 5 linhas**: SQL na prática: SELECT, CREATE TABLE (tipos, NOT NULL), INSERT, UPDATE/DELETE sempre com WHERE; antes de UPDATE/DELETE fazer SELECT com o mesmo WHERE. Pipeline: origem (Excel) → Python (pandas + pyodbc) → destino (SQL); read_excel, opcional transformação, conexão, INSERT com ? em loop, commit. Cuidado: UPDATE/DELETE sem WHERE afeta toda a tabela; em produção backup ou cópia antes. Regras de negócio podem ficar na aplicação ou no banco.

**Palavras-chave**: SELECT, INSERT, UPDATE, DELETE, WHERE, CREATE TABLE, ALTER TABLE, DDL, DML, pipeline, origem, destino, pandas, pyodbc, read_excel, TRUNCATE, commit, regras de negócio, SEQUENCE, IDENTITY.

---

## Explicações

### 1. Tema e escopo

- **Tema**: SQL na prática (SELECT, CREATE TABLE, INSERT, UPDATE, DELETE, WHERE, ALTER); cuidados com UPDATE/DELETE; pipeline de dados (origem → processamento → destino); integração Python–Excel–SQL (pandas, pyodbc); regras de negócio; sequência/ID ao recriar tabela; ferramentas (SSMS, pgAdmin, DBeaver).
- **Inclui**: revisão breve de conceitos Python (import, variáveis, print, input, while, if, try/except, os); comandos DML com WHERE; criação e alteração de tabela; exemplo de pipeline Excel → SQL Server via Python; boas práticas (SELECT antes de UPDATE/DELETE, backup). **Não inclui**: case detalhado do projeto (empresa de cosméticos) — citado como próximo; JOINs e consultas avançadas.

### 2. Contexto na disciplina

- Sexta aula do Projeto de Bloco; continua após aula 5 (variáveis, tipos, caso CNPJ). Equilibra foco: aula 5 Python; aula 6 SQL como código e integração.
- Leva ao mapa mental SQL (comandos, tipos, constraints) e ao fluxo real: origem (Excel) → destino (banco) com Python.

### 3. Ideias-chave

1. **Todo código/sistema = entrada, processamento, saída** — no pipeline: origem (Excel), processamento (leitura, transformação), destino (tabela SQL).
2. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`UPDATE`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DELETE`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE`</mark> afetam todas as linhas** — sempre usar WHERE; antes, fazer SELECT com a mesma condição para conferir.
3. **Bibliotecas = código reutilizável** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pandas`</mark> manipula dados; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pyodbc`</mark> conecta ao banco; não é preciso implementar do zero.
4. **Pipeline simples Excel→SQL**: ler Excel (pandas) → opcional transformar → conectar (pyodbc) → limpar tabela (TRUNCATE) ou não → INSERT linha a linha (for) com placeholders → commit.
5. **Regras de negócio**: delimitações de como tratar dados (ex.: preço &lt; 100 não considerar); podem estar na aplicação, no banco ou em ambos.
6. **Recriar tabela zera contador de ID** — em Oracle: SEQUENCE; em SQL Server: IDENTITY; é preciso ajustar o próximo valor após recriar.

### 5. Conceitos essenciais

#### 5.1 SQL: SELECT, CREATE TABLE, INSERT, UPDATE, DELETE

- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark>**: consulta; traz dados da tabela; pode limitar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TOP n`</mark> (SQL Server) ou equivalente.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CREATE TABLE`</mark>**: nome da tabela + colunas com tipo (ex.: VARCHAR(128), DATE, DECIMAL(10,2), INT); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NULL`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NOT NULL`</mark>.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT INTO tabela (col1, col2, ...) VALUES (v1, v2, ...)`</mark>**: insere uma ou mais linhas.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`UPDATE tabela SET col = valor WHERE condição`</mark>**: atualiza; sem WHERE atualiza todas as linhas.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DELETE FROM tabela WHERE condição`</mark>**: remove linhas; sem WHERE apaga todas.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER TABLE`</mark>**: adicionar/alterar coluna (ex.: botão direito → Design na IDE).

#### 5.2 Cuidados com UPDATE e DELETE

- **Erro clássico**: executar UPDATE ou DELETE sem WHERE — altera ou apaga toda a tabela.
- **Boa prática**: escrever primeiro <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT * FROM tabela WHERE ...`</mark> com a mesma condição; conferir quantidade de linhas; depois trocar por UPDATE/DELETE.
- **Produção**: quando possível, fazer cópia da tabela ou backup antes; em tabelas grandes, cópia apenas dos dados que serão alterados.
- **Integridade**: chaves estrangeiras fazem com que alteração em uma tabela possa impactar outras; cuidado ao deletar ou alterar chaves.

#### 5.3 Pipeline: origem, destino e permissões

- **Origem**: onde estão os dados (ex.: arquivo Excel, CSV); caminho e aba (no Excel) definidos no código.
- **Destino**: servidor, banco, tabela; usuário e senha para acesso; conferir se a tabela existe e se as colunas batem com os dados.
- **Fluxo**: receber origem (ex.: e-mail com Excel); identificar destino (servidor, banco, tabela); obter credenciais; depois automatizar (script Python ou outra ferramenta).

#### 5.4 Integração Python–Excel–SQL (resumo)

- **Bibliotecas**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pandas`</mark> (leitura e manipulação); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pyodbc`</mark> (conexão ODBC ao SQL Server; outros bancos têm drivers específicos).
- **Passos típicos**: (1) importar pandas e pyodbc; (2) criar conexão (server, database, user, password, driver); (3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pd.read_excel(caminho, sheet_name='...')`</mark>; (4) opcional: transformação (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`rename`</mark> colunas); (5) opcional: executar TRUNCATE na tabela; (6) definir string INSERT com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`?`</mark> como placeholders; (7) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`for`</mark> nas linhas do DataFrame, executar INSERT com os valores da linha; (8) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`commit`</mark>.
- **Regras de negócio**: exemplo — “se preço &lt; 100, não considerar”; transformação de nomes de colunas pode ser regra; podem ficar na aplicação ou no banco.

#### 5.5 Sequência e ID ao recriar tabela

- **Problema**: DROP tabela + CREATE ou TRUNCATE reiniciam o contador (ID/IDENTITY/SEQUENCE); novos registros podem voltar a começar de 1.
- **Oracle**: usar SEQUENCE; antes de recriar, obter último valor usado; após recriar, ajustar a SEQUENCE para o próximo valor.
- **SQL Server**: IDENTITY; após recriar, usar comando para definir o seed (próximo valor) com base no último ID que existia.

### 5b. Modelo mental

- **Pipeline**: origem (arquivo) → leitura (pandas) → transformação (opcional) → conexão (pyodbc) → limpeza/INSERT (SQL) → commit. Tudo é “entrada → processamento → saída”.
- **UPDATE/DELETE**: sempre pensar “quantas linhas?”; WHERE define o conjunto; sem WHERE = conjunto = tabela inteira.

### 6. Teste de reconhecimento rápido

**O que acontece ao executar `UPDATE tabela SET quantidade = 10;` (sem WHERE)?**

**Resposta:** Todas as linhas da tabela terão a coluna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`quantidade`</mark> igual a 10.

---

**Qual o papel do `?` no INSERT executado pelo pyodbc em Python?**

**Resposta:** Placeholder: cada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`?`</mark> é substituído, na ordem, pelo valor passado na tupla/lista ao executar o comando; permite inserir valores variáveis (ex.: cada linha do DataFrame) sem concatenar string (evita SQL injection).

---

**Verdadeiro ou falso:** "Regras de negócio podem estar tanto na aplicação quanto no banco de dados."

**Resposta:** Verdadeiro — podem estar em um, no outro ou em ambos; hoje muitas ficam mais na aplicação.

### 7. Erros clássicos de prova

- **UPDATE/DELETE sem WHERE** — afeta todas as linhas; em produção pode exigir restore de backup.
- **Não testar o WHERE** — sempre fazer SELECT com a mesma condição antes de UPDATE/DELETE.
- **Esquecer commit** — em conexão com autocommit desligado, as alterações não são gravadas até o <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`commit`</mark>.
- **Recriar tabela e ignorar ID/sequência** — próximos INSERTs podem gerar IDs duplicados ou quebra de referências; ajustar SEQUENCE/IDENTITY.

### 8. Exemplos de alta densidade

**SQL — SELECT com filtro e DELETE com mesma condição:**

```sql
-- Primeiro: ver quantas linhas
SELECT * FROM vendas WHERE loja = 1520;
-- Depois: deletar
DELETE FROM vendas WHERE loja = 1520;
```

**SQL — UPDATE com WHERE:**

```sql
UPDATE tabela SET quantidade = 10 WHERE loja = 1522 AND quantidade = 6;
```

**SQL — CREATE TABLE com tipos e NULL:**

```sql
CREATE TABLE tabela (
  cidade VARCHAR(128) NULL,
  data_venda DATE NULL,
  valor_venda DECIMAL(10,2) NULL,
  loja INT NULL,
  quantidade INT NULL
);
```

**Python — ideia do pipeline (trecho conceitual):**

```python
import pandas as pd
import pyodbc
df = pd.read_excel(caminho_arquivo, sheet_name='Planilha1')
conn = pyodbc.connect('DRIVER={...};SERVER=...;DATABASE=...;UID=...;PWD=...')
# TRUNCATE ou INSERT em loop com ? e commit
```

### 12b. Regra de prova

- UPDATE/DELETE: sempre WHERE; antes, SELECT com a mesma condição; em produção, cuidado e backup.
- Pipeline: origem → processamento (leitura, transformação) → destino; pandas (leitura/transformação) + pyodbc (conexão e SQL).
- Recriar tabela: ajustar SEQUENCE (Oracle) ou IDENTITY (SQL Server) para não quebrar sequência de IDs.

### 15. Síntese operacional

- **SQL**: SELECT consulta; CREATE TABLE com tipos e NULL/NOT NULL; INSERT, UPDATE (SET + WHERE), DELETE (WHERE); ALTER TABLE para colunas. Nunca UPDATE/DELETE em produção sem WHERE e sem conferir com SELECT.
- **Pipeline**: definir origem (arquivo, caminho, aba) e destino (servidor, banco, tabela, usuário); Python: pandas (read_excel, transformação) + pyodbc (conexão, executar SQL, commit).
- **Integração**: read_excel → opcional rename/transformação → conexão pyodbc → TRUNCATE (opcional) → INSERT com ? em for nas linhas → commit.
- **Regras de negócio**: aplicação e/ou banco; transformação é exemplo. **Sequência/ID**: ao recriar tabela, ajustar SEQUENCE ou IDENTITY para continuidade.
