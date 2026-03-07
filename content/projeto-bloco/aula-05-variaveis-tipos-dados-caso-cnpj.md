---
title: "Variáveis, Tipos de Dados e Caso Real (CNPJ)"
slug: "variaveis-tipos-dados-caso-cnpj"
discipline: "projeto-bloco"
order: 5
description: "Tipos de variáveis em Python e SQL, operações, entrada/saída, conversão; caso real mudança CNPJ numérico→caractere e impacto em banco."
reading_time: 8
difficulty: "easy"
concepts:
  - variável Python
  - tipagem dinâmica
  - tipos básicos (int, float, str, bool)
  - atribuição e case-sensitive
  - input e print
  - conversão de tipo (int, float, str)
  - operadores aritméticos e comparação
  - if / elif / else e while
  - indentação e break
  - SQL DDL e DML
  - tipos de campo (INTEGER, VARCHAR, DATE)
  - constraints (PRIMARY KEY, NOT NULL, FOREIGN KEY)
  - plano de execução e índices
prerequisites:
  - aula-04-laboratorio-ide-variaveis
exercises:
  - question: "Por que em Python não é obrigatório declarar o tipo da variável?"
    answer: "Python usa tipagem dinâmica: o interpretador infere o tipo pelo valor atribuído. Basta fazer nome = valor; em linguagens como SQL (DECLARE @x INT) ou Java o tipo é obrigatório na declaração."
  - question: "O que o input() retorna em Python e por que isso exige conversão para números?"
    answer: "input() sempre retorna string (str). Para fazer contas ou comparações numéricas é preciso converter com int() ou float(). Ex.: idade = int(input('Idade: '))."
  - question: "Qual a diferença entre = e == em Python?"
    answer: "= é atribuição (guarda valor na variável). == é comparação de igualdade (retorna True ou False). Um igual atribui; dois iguais comparam."
  - question: "Por que alterar um campo de numérico para caractere (ex.: CNPJ) em produção é complexo?"
    answer: "Exige recriar planos de execução e índices; em tabelas grandes causa lock (ALTER bloqueia); pode exigir nova coluna, migração de dados e renomeação para evitar parada do sistema; volume e transações amplificam o impacto."
  - question: "Em SQL, o que são DDL e DML? Dê exemplos."
    answer: "DDL (definição): CREATE, ALTER, DROP — definem estrutura. DML (manipulação): INSERT, UPDATE, DELETE; consulta: SELECT. DDL altera esquema; DML altera dados."
  - question: "O que é case-sensitive em Python e por que importa?"
    answer: "Python diferencia maiúsculas de minúsculas. contador e Contador são variáveis diferentes. O nome da variável deve ser usado exatamente igual em todo o código."
---
## Resumo

### Mapa da aula

- **Variável**: nome que armazena valor em memória; em Python não é obrigatório declarar tipo (tipagem dinâmica).
- **Tipos básicos Python**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool`</mark>; atribuição com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark>; linguagem case-sensitive.
- **Entrada/saída**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> saída; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retorna sempre <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — converter com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> quando precisar de número.
- **Controle de fluxo**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> (comparação com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark>); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark> loop; bloco definido por indentação (tab); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`break`</mark> sai do loop.
- **SQL**: tabela = estrutura com colunas e tipos; DDL (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CREATE`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DROP`</mark>); DML (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`UPDATE`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DELETE`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark>); tipos de campo (INTEGER, VARCHAR(n), DATE etc.); constraints (PRIMARY KEY, NOT NULL, FOREIGN KEY).
- **Caso CNPJ**: mudança fiscal exige CNPJ como caractere (14 caracteres). Impacto: tipo de campo no banco (numérico → caractere); planos de execução e índices invalidados; tabelas grandes = lock em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER`</mark>; estratégia: tabelas pequenas = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER`</mark> direto (via script); tabelas grandes = nova coluna, migração, renomear, depois remover antiga; backup e testes antes.

**Resumo em 5 linhas**: Variável em Python é tipagem dinâmica; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retorna string — converter com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>. Controle: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark>; bloco por indentação. SQL: DDL/DML e tipos de coluna; mudar tipo em produção exige recriar planos/índices e cuidado com lock em tabelas grandes (caso CNPJ).

**Palavras-chave**: variável, tipagem dinâmica, int, float, str, bool, input, print, int(), float(), ==, if, elif, else, while, break, indentação, DDL, DML, CREATE TABLE, PRIMARY KEY, FOREIGN KEY, plano de execução, ALTER TABLE, CNPJ.

---

## Explicações

### 1. Tema e escopo

- **Tema**: variáveis e tipos em Python (tipagem dinâmica, operações, entrada/saída, conversão, comparações, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark>); noção de tipos e comandos em SQL (DDL, DML, criação de tabelas); caso real de mudança de tipo de campo (CNPJ numérico → caractere) e impacto em banco.
- **Inclui**: definição de variável, atribuição, case-sensitive; tipos básicos; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input`</mark> e conversão; operadores e comparações; estruturas de decisão e repetição; SQL (tabela, coluna, DDL/DML, tipos, constraints); cenário CNPJ e estratégias (ALTER direto vs nova coluna + migração). **Não inclui**: sintaxe completa de todos os bancos; detalhe de ETL ou pipelines.

### 2. Contexto na disciplina

- Quinta aula do Projeto de Bloco; continua a partir da aula 4 (laboratório, IDE, variável Python vs SQL).
- Aprofunda variáveis, tipos, entrada/saída e controle de fluxo em Python e relaciona com tipos de campo em banco; traz caso real (reforma fiscal, CNPJ) para mostrar impacto de mudança de tipo em produção.

### 3. Ideias-chave

1. **Variável = nome que armazena valor em memória** — em Python não se declara tipo; o valor define o tipo (tipagem dinâmica).
2. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> sempre retorna string** — para cálculos ou comparações numéricas usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>.
3. **Um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> atribui; dois <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark> comparam** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if opcao == 0`</mark> testa igualdade.
4. **Bloco em Python = indentação (tab)** — não existe <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`end`</mark>; o tab define o que está dentro do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark>.
5. **Todo sistema = entrada, processamento, saída** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input`</mark> entrada; lógica no meio; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print`</mark> saída.
6. **Alterar tipo de coluna em produção** — invalida planos de execução e índices; em tabelas grandes pode bloquear a tabela; estratégia: script para tabelas pequenas; para grandes: nova coluna, migrar dados, renomear, depois remover antiga.

### 5. Conceitos essenciais

#### 5.1 Variável e tipos em Python

- **Variável**: identificador que armazena valor na memória; em Python não é obrigatório declarar tipo.
- **Atribuição**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x = 10`</mark>; pode alterar valor (e até tipo) depois. Símbolo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> é atribuição.
- **Case-sensitive**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`contador`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Contador`</mark> são variáveis diferentes.
- **Tipos básicos**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> (inteiro), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float`</mark> (decimal), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> (texto), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool`</mark> (True/False). Ver tipo: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type(x)`</mark>.

#### 5.2 Entrada, saída e conversão

- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(valor)`</mark>**: exibe na tela.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input(mensagem)`</mark>**: lê do teclado e **sempre retorna string**. Para número: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`idade = int(input("Idade: "))`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`valor = float(input("Valor: "))`</mark>.
- **Conversão**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark>.

#### 5.3 Controle de fluxo (resumo)

- **Comparação**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark> igual, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`!=`</mark> diferente, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<`</mark> <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>`</mark> <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<=`</mark> <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>=`</mark>; lógicos: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark>**: decisão; bloco por indentação.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while condição:`</mark>**: repete enquanto a condição for verdadeira; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`break`</mark> sai do loop.

#### 5.4 SQL: tipos de campo e comandos

- **Conceitos**: tabela (estrutura com regras); coluna = identificador + tipo; linha = registro; chave primária identifica cada linha; chave estrangeira relaciona tabelas.
- **DDL**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CREATE`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DROP`</mark>. **DML**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INSERT`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`UPDATE`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DELETE`</mark>; consulta: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark>.
- **Tipos comuns**: INTEGER, DECIMAL(10,2), VARCHAR(n), DATE, TIMESTAMP/DATETIME, BOOLEAN (varia por banco).
- **Constraints**: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, CHECK, FOREIGN KEY.

#### 5.5 Caso CNPJ: mudança de tipo em produção

- **Contexto**: obrigatoriedade fiscal — CNPJ passa a ser armazenado como caractere (ex.: 14 caracteres), não numérico.
- **Impacto em banco**: dezenas/centenas de campos em várias bases; alterar tipo invalida **planos de execução** e **índices** ligados ao campo; campo caractere tende a usar mais armazenamento e pode impactar performance em tabelas muito grandes e transacionadas.
- **Estratégia**: tabelas pequenas — script com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER TABLE ... ALTER COLUMN cnpj TYPE VARCHAR(14)`</mark> (ou equivalente); tabelas grandes — criar nova coluna, migrar dados, renomear colunas, depois remover a antiga para evitar lock prolongado; sempre backup e testes (ex.: plano de execução antes/depois, tempo de consulta).

### 5b. Modelo mental

- **Python**: atribuição <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x = valor`</mark> → interpretador reserva memória, infere tipo, associa nome ao valor. Sem declaração explícita.
- **SQL (ex.: PostgreSQL)**: definir coluna com tipo obrigatório; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ALTER`</mark> de tipo pode reescrever tabela e bloquear; planos e índices dependem do tipo — ao mudar, recriar.

### 6. Teste de reconhecimento rápido

**O que imprime?**

```python
x = 10
print(type(x))
```

**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<class 'int'>`</mark> — tipo inferido pelo valor.

---

**Por que o código abaixo pode dar erro em tempo de execução?**

```python
idade = input("Idade: ")
print(idade + 1)
```

**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retorna string; não se soma string com inteiro sem converter: usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(idade) + 1`</mark>.

---

**Verdadeiro ou falso:** "Alterar uma coluna de INTEGER para VARCHAR no PostgreSQL invalida os planos de execução que usam essa coluna."

**Resposta:** Verdadeiro — mudança de tipo exige recriação de planos (e índices envolvidos).

### 7. Erros clássicos de prova

- **Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> como número sem converter** — sempre retorna string; usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>.
- **Confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark>** — um atribui, outro compara.
- **Erro de indentação** — em Python bloco é por tab/espaços; erro em tab quebra o programa.
- **Achar que mudar tipo de campo é “só um ALTER”** — em produção: planos, índices, lock em tabelas grandes; exige estratégia e testes.

### 8. Exemplos de alta densidade

**Python — variável, conversão, saída:**

```python
nome = input("Digite seu nome: ")
idade = int(input("Digite sua idade: "))
print(nome, idade)
```

**Python — comparação e decisão:**

```python
idade = 18
print(idade >= 18)  # True
```

**SQL — criação de tabela com tipos e constraints (exemplo conceitual):**

```sql
CREATE TABLE matriculas (
  id INTEGER PRIMARY KEY,
  aluno_id INTEGER NOT NULL,
  disciplina_id INTEGER NOT NULL,
  data_matricula DATE NOT NULL,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id),
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);
```

### 12b. Regra de prova

- Variável Python: sem declaração de tipo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retorna string; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> atribui, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark> compara; bloco por indentação.
- SQL: DDL altera estrutura; DML altera dados; alterar tipo de coluna em produção afeta planos de execução e índices; tabelas grandes exigem estratégia (nova coluna + migração).

### 15. Síntese operacional

- **Python**: variável por atribuição; tipagem dinâmica; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> → string; converter com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> para número; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark> com indentação; case-sensitive.
- **SQL**: DDL (CREATE, ALTER, DROP); DML (INSERT, UPDATE, DELETE, SELECT); tipo de coluna obrigatório; constraints (PRIMARY KEY, NOT NULL, FOREIGN KEY).
- **Caso CNPJ**: mudança numérico → caractere; recriar planos e índices; tabelas pequenas = ALTER direto (script); tabelas grandes = nova coluna, migrar, renomear, remover antiga; backup e testes obrigatórios.
