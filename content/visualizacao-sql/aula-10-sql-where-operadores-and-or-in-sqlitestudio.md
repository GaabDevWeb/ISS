---
title: "SELECT com WHERE: operadores de comparação, AND, OR, IN e SQLite Studio"
slug: "sql-where-operadores-and-or-in-sqlitestudio"
discipline: "visualizacao-sql"
order: 10
description: "Etapa 6: cláusula WHERE, operadores =, !=, <>, <, >, <=, >=, AND, OR, IN; expressões e alias no SELECT; SQLite Studio (Aula6a.db, Aula6b.db)."
reading_time: 8
difficulty: "medium"
concepts:
  - WHERE
  - operadores de comparação
  - AND
  - OR
  - IN
  - expressão no SELECT
  - alias AS
  - concatenação
  - SQLite Studio
  - ORDER BY
prerequisites:
  - "sql-pratica-create-insert-select-deepnote"
exercises:
  - question: "Qual a diferença entre = e != no WHERE?"
    answer: "= retorna linhas onde o valor da coluna é igual ao valor dado. != (ou <>) retorna linhas onde o valor é diferente. Ex.: WHERE sport = 'Football' traz só futebol; WHERE sport != 'Football' traz todos os outros."
    hint: "= igual; != diferente."
  - question: "Quando usar AND em vez de OR no WHERE?"
    answer: "AND exige que as duas condições sejam verdadeiras na mesma linha (intersecção). OR retorna a linha se pelo menos uma condição for verdadeira (união). Ex.: career = 'Singer' AND followersMillions > 200 → só cantores com mais de 200M."
    hint: "AND = as duas; OR = uma ou outra."
  - question: "O que faz IN (coluna IN (valor1, valor2, ...))?"
    answer: "Retorna linhas em que o valor da coluna está na lista. Equivalente a vários OR: col IN ('A','B') é o mesmo que (col = 'A' OR col = 'B')."
    hint: "IN = valor está na lista."
  - question: "No SQLite Studio, como abrir o editor SQL se não aparecer a área de consulta?"
    answer: "Ferramentas → Abrir editor SQL, ou atalho Alt+F2 (Alt+F11 em algumas versões). Sem isso, só Tables/Views aparecem, sem campo para digitar comandos."
    hint: "Menu Ferramentas ou atalho Alt."
  - question: "SELECT retorna zero linhas com WHERE yearOfBirth > 2000. Como validar que o filtro está certo?"
    answer: "Executar SELECT yearOfBirth FROM tabela ORDER BY yearOfBirth; e ver o maior ano. Se o maior for 1997, nenhuma linha é > 2000 — resultado correto. Incluir a coluna do filtro no SELECT ajuda a conferir."
    hint: "ORDER BY na coluna filtrada; incluir coluna no SELECT."
  - question: "!= e <> são equivalentes?"
    answer: "Sim. Em SQL ambos significam 'diferente de'. Depende do SGBD e convenção; SQLite aceita os dois."
    hint: "Sinônimos para diferente."
---

## Resumo

### Mapa da aula

- Etapa 6: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE`</mark> para filtrar linhas; operadores =, !=, <>, &lt;, &gt;, &lt;=, &gt;=, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AND`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`OR`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IN`</mark>
- Interface: SQLite Studio (gráfica); bancos Aula6a.db (sportStars) e Aula6b.db (instagram)
- Expressão no SELECT (ex.: preço × 1.07); alias com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AS`</mark>; concatenação com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`||`</mark>
- Erro clássico: confundir AND (as duas condições) com OR (uma ou outra)

- **WHERE:** condição após <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`FROM`</mark>; só retorna linhas onde a condição é verdadeira (True). SELECT = projeção (colunas); FROM = tabela; WHERE = filtro (linhas).
- **Operadores:** = igual; != ou <> diferente; &lt;, &gt;, &lt;=, &gt;= para números/datas. Strings entre aspas simples.
- **AND / OR:** AND exige as duas condições na mesma linha; OR basta uma. IN (valor IN (a, b, c)) equivale a vários OR.
- **SQLite Studio:** Download portable Windows x64; Database → Add database → arquivo .db; executar: selecionar comando → botão Executar. Abrir editor: Ferramentas → Abrir editor SQL (Alt+F2).

**Resumo em 5 linhas:** Etapa 6 introduz a cláusula WHERE para filtrar linhas em SELECT. Operadores de comparação (=, !=, &lt;, &gt;, &lt;=, &gt;=) e lógicos (AND, OR, IN) definem a condição. SELECT pode ter expressões (cálculo, concatenação) e alias (AS). Ambiente usado: SQLite Studio com Aula6a.db (sportStars) e Aula6b.db (instagram). WHERE sem match retorna zero linhas — validar com ORDER BY ou incluindo a coluna no SELECT.

**Palavras-chave:** WHERE, operadores de comparação, AND, OR, IN, expressão, alias, AS, concatenação, ||, ORDER BY, SQLite Studio, sportStars, instagram, Aula6a, Aula6b.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Etapa 6 — recuperar informações com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE`</mark>; operadores de comparação e lógicos; uso do SQLite Studio.
- **Inclui:** WHERE com =, !=, &lt;, &gt;, &lt;=, &gt;=; AND, OR, IN; expressão e alias no SELECT; concatenação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`||`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ORDER BY`</mark> para conferência; criação e uso dos bancos Aula6a e Aula6b no SQLite Studio.
- **Não inclui:** JOIN, GROUP BY, funções de agregação (próximas etapas). Referência O’Reilly: Chapter 4 SELECT, Chapter 5 WHERE.

### 2. Contexto na disciplina

- Pré-requisito: [[aula-09-sql-pratica-create-insert-select-deepnote]] (CREATE TABLE, INSERT, SELECT básico).
- Semana 6 de conteúdo; depois vêm Assessment e TP3. Deepnote/TP vinculado ao Infnet; SQLite Studio é opcional para prática local.

### 4. Ideias-chave (máx. 7)

1. **SELECT / FROM / WHERE:** SELECT = o que mostrar (colunas); FROM = de qual tabela; WHERE = filtro de linhas (condição True).
2. **Operadores de comparação:** =, !=, &lt;, &gt;, &lt;=, &gt;=. Para texto usar aspas simples: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE monthBorn = 'December'`</mark>.
3. **AND vs OR:** AND = as duas condições na mesma linha; OR = pelo menos uma. Erro comum: usar OR quando se quer “e”.
4. **IN:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`col IN (v1, v2, v3)`</mark> equivale a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`col = v1 OR col = v2 OR col = v3`</mark>.
5. **Expressão no SELECT:** pode-se usar cálculo (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Price * 1.07`</mark>) ou concatenação; não cria coluna na tabela, só no resultado. Alias com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AS`</mark> (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Price * 1.07 AS TaxPrice`</mark>).
6. **SQLite Studio:** interface gráfica para SQLite; sem autocomplete de comandos; editor SQL: Ferramentas → Abrir editor SQL (ou Alt+F2). INSERT em lote: selecionar vários <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT`</mark> e executar de uma vez.
7. **Zero linhas:** WHERE com condição que nenhuma linha satisfaz retorna conjunto vazio; validar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ORDER BY`</mark> na coluna usada no filtro ou incluindo essa coluna no SELECT.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Cláusula WHERE e operadores de comparação

- **WHERE** vem depois de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`FROM tabela`</mark>. Só entram no resultado as linhas para as quais a condição é verdadeira (True).
- Igualdade: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE monthBorn = 'December'`</mark>. Diferente: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE sport != 'Football'`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE sport <> 'Football'`</mark> — mesmo efeito.
- Numéricos: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE yearOfBirth > 1992`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE yearOfBirth >= 1991`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE followersMillions <= 155`</mark>.

Exemplo (sportStars):

```bash
SELECT firstName, surname FROM sportStars WHERE monthBorn = 'June';
-- Lionel Messi, Michael Phelps

SELECT * FROM sportStars WHERE yearOfBirth >= 1991;
-- Simone Biles, Laura Muir, Lucy Bronze
```

- **Quando NÃO usar:** não usar WHERE quando quiser todas as linhas; não misturar tipo (ex.: comparar número com string sem conversão).

#### 5.2 AND, OR e IN

- **AND:** as duas condições na mesma linha. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE career = 'Singer' AND followersMillions > 200`</mark> → só cantores com mais de 200M seguidores.
- **OR:** uma ou outra condição. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE career = 'Footballer' OR followersMillions < 150`</mark>.
- **IN:** valor na lista. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE sport IN ('Football', 'Track and field')`</mark> equivale a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE sport = 'Football' OR sport = 'Track and field'`</mark>.

Exemplo (instagram — Etapa 6):

```bash
SELECT * FROM instagram WHERE career = 'Singer' AND followersMillions > 200;
-- Ariana Grande (203M)

SELECT * FROM instagram WHERE followersMillions > 200;
-- seguidores estritamente acima de 200M
```

- ❌ **Erro:** usar OR quando a pergunta pede “X e Y” (ex.: “cantores com mais de 200M” → AND, não OR).

#### 5.3 Expressão no SELECT e alias (AS)

- **Expressão:** coluna calculada ou concatenada no resultado, sem alterar a tabela. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT Price, Price * 1.07 AS TaxPrice FROM product`</mark> — TaxPrice só aparece no resultado.
- **Concatenação (SQLite):** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`||`</mark> junta strings. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT City || ', ' || State AS Location FROM customer`</mark>. MySQL usa <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CONCAT()`</mark>.
- **AS** opcional em vários SGBDs mas recomendado para clareza. Em referências posteriores (ex.: ORDER BY) alguns bancos exigem o nome original da coluna, não o alias.

#### 5.4 SQLite Studio — procedimento resumido

1. Download: sqlitestudio.pl → Download → GitHub releases → Windows x64, Portable.
2. Descompactar → executar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SQLiteStudio.exe`</mark>; primeira vez: escolher idioma.
3. Database → Add a database → escolher pasta → nome do arquivo (ex.: Aula6a.db) → Test connection → OK.
4. Dois cliques no banco → expande Tables/Views. Abrir editor: Ferramentas → Abrir editor SQL (atalho Alt+F2 ou Alt+F11).
5. Colar CREATE TABLE + INSERTs; selecionar o bloco desejado → Executar. Vários INSERT: selecionar todos e executar de uma vez.

### 5b. Modelo mental

- **SELECT:** “quais colunas”; **FROM:** “de qual tabela”; **WHERE:** “só as linhas em que a condição é True”.
- O motor avalia a condição para cada linha; só inclui no resultado as linhas com True. Zero linhas = condição nunca verdadeira (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`yearOfBirth > 2000`</mark> quando o maior ano é 1997).

### 5c. Comparação direta

| Operador | Significado | Exemplo |
|----------|-------------|---------|
| = | Igual | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE sport = 'Football'`</mark> |
| != ou <> | Diferente | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE career != 'Footballer'`</mark> |
| &lt;, &gt;, &lt;=, &gt;= | Menor, maior, menor ou igual, maior ou igual | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE followersMillions >= 200`</mark> |
| AND | As duas condições | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE A AND B`</mark> |
| OR | Uma ou outra | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE A OR B`</mark> |
| IN (lista) | Valor na lista | <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE col IN (1,2,3)`</mark> |

### 5d. Quando usar

- **WHERE = :** filtro por valor exato (texto, número, data).
- **WHERE != ou <>:** excluir um valor.
- **WHERE &lt; / &gt; / &lt;= / &gt;=:** intervalos numéricos ou datas.
- **AND:** quando o enunciado pede “que satisfaça X e também Y”.
- **OR:** quando “X ou Y” (pelo menos um).
- **IN:** quando “valor está em uma lista fixa” — evita repetir vários OR.
- **Incluir a coluna do filtro no SELECT:** para conferir o resultado (ex.: mostrar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`yearOfBirth`</mark> junto ao nome quando filtrar por ano).

### 6. Teste de reconhecimento rápido

**Quantas linhas retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT * FROM sportStars WHERE yearOfBirth > 2000`</mark> (dados Etapa 6)?**  
**Resposta:** Zero. O maior ano na tabela é 1997; nenhuma linha satisfaz > 2000.

---

**O que retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE sport != 'Football'`</mark> na sportStars?**  
**Resposta:** Todas as linhas em que o esporte não é Football (ex.: Usain Bolt, LeBron James, Tiger Woods, etc.).

---

**<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE career = 'Singer' AND followersMillions > 200`</mark> na instagram — quem aparece?**  
**Resposta:** Só cantores com mais de 200M (ex.: Ariana Grande 203M). Cantores com menos ou não-cantores não entram.

### 7. Erros clássicos de prova

- **Confundir AND com OR:** “cantores com mais de 200M” → AND. “cantores ou perfis com mais de 200M” → OR.
- **Esquecer aspas em texto:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE monthBorn = December`</mark> errado; certo: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE monthBorn = 'December'`</mark>.
- **Achar que zero linhas é erro:** resultado vazio pode ser correto se nenhuma linha satisfaz o WHERE.
- **&gt; vs &gt;=:** “depois de 1992” = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`yearOfBirth > 1992`</mark> (1993 em diante); “a partir de 1991” = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`yearOfBirth >= 1991`</mark>.

### 7b. Armadilhas clássicas

- **“Mostre quem não é de futebol”** → WHERE sport != 'Football' ou &lt;&gt;. Não usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`= 'Football'`</mark>.
- **“Cantores com mais de 200 milhões”** → AND (cantor E &gt; 200). Se usar OR, entra qualquer um com &gt; 200M ou qualquer cantor.
- **Prova pergunta “quantas linhas?” com WHERE impossível** → resposta pode ser 0; não assumir que sempre há resultado.

### 8. Exemplos de alta densidade

```bash
SELECT * FROM sportStars WHERE monthBorn = 'December';
-- LeBron James, Tiger Woods

SELECT firstName, surname FROM sportStars WHERE yearOfBirth = 1993;
-- Laura Muir

SELECT * FROM instagram WHERE followersMillions > 200;
-- linhas com 203, 239, 371 milhões etc.

SELECT * FROM instagram WHERE career = 'Singer' AND followersMillions > 200;
-- Ariana Grande

SELECT * FROM instagram WHERE followersMillions <= 155;
-- vários; 155 incluso
```

### 9. Procedimento — SQLite Studio e Etapa 6

1. Criar Aula6a.db → Database → Add database → pasta → nome Aula6a.db → Test → OK. Dois cliques no banco.
2. Ferramentas → Abrir editor SQL (ou Alt+F2). Colar CREATE TABLE sportStars (firstName, surname, monthBorn, yearOfBirth, sport) + INSERTs do material Etapa 6. Selecionar CREATE + todos INSERT → Executar.
3. Na mesma aba ou nova: SELECT firstName FROM sportStars; depois SELECT firstName, surname FROM sportStars WHERE monthBorn = 'December'; etc.
4. Criar Aula6b.db (Add database → Aula6b.db). CREATE TABLE instagram + INSERTs do Etapa 6. Praticar WHERE com !=, &lt;, &gt;, &lt;=, &gt;=, AND (e OR/IN conforme material).
5. Validar “zero linhas”: ex. SELECT yearOfBirth FROM sportStars ORDER BY yearOfBirth; conferir maior valor.

### 12b. Regra de prova

- **WHERE = condição True** → só linhas que satisfazem; zero linhas é válido.
- **AND = as duas; OR = uma ou outra** → não trocar na interpretação do enunciado.
- **Texto no WHERE** → aspas simples: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'December'`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'Football'`</mark>.
- **!= e <>** → sinônimos para “diferente”.
- **IN (a,b,c)** → equivalente a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`col = a OR col = b OR col = c`</mark>.

### 15. Síntese operacional

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`WHERE`</mark> filtra linhas; condição avaliada por linha; só entra resultado onde True.
- Operadores: =, !=, &lt;&gt;, &lt;, &gt;, &lt;=, &gt;=; texto entre aspas simples. AND (as duas), OR (uma ou outra), IN (valor na lista).
- Expressão no SELECT (cálculo, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`||`</mark>) e alias <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AS`</mark> não alteram a tabela.
- SQLite Studio: Add database → .db; editor SQL via Ferramentas (Alt+F2); executar bloco selecionado; INSERT em lote permitido.
- Zero linhas com WHERE → condição nunca True; conferir com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ORDER BY`</mark> ou incluindo coluna do filtro no SELECT.
