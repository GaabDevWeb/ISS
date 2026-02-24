---
title: "Strings: escape, concatenação e multiplicação"
slug: "strings-escape-concatenacao"
discipline: "python"
order: 6
description: "Caracteres de escape (\\n, \\t, \\\\), raw string, concatenação com +, multiplicação de strings, conversão para evitar TypeError"
reading_time: 7
difficulty: "easy"
concepts:
  - escape
  - raw string
  - concatenação
  - multiplicação de strings
  - tipagem forte
prerequisites: ["aula-05-exercicios-strings", "aula-04-operadores-conversao-tipos"]
exercises:
  - question: "Por que text = 'aqui está um texto sobre a \\' barra invertida' gera SyntaxError e como corrigir?"
    answer: "A aspa simples interna não escapada faz o interpretador entender que a string terminou ali (unterminated string literal). Corrigir escapando: text = 'aqui está um texto sobre a \\'barra invertida\\' - \\\\' para mostrar aspas e barra literal."
    hint: "Aspas que fazem parte do texto precisam ser escapadas quando coincidem com o delimitador."
  - question: "Qual a saída de print(r'Linha 1\\nLinha 2') e por quê?"
    answer: "Saída: Linha 1\\nLinha 2 (uma linha, com \\n visível). Raw string (prefixo r) desativa a interpretação de escapes; \\n é tratado como dois caracteres literais."
  - question: "O que acontece ao executar numero = 123; string = 'abc'; print(numero + string)? Como corrigir para concatenar?"
    answer: "TypeError: unsupported operand type(s) for +: 'int' and 'str'. Python tem tipagem forte: + entre int e str não é permitido. Para concatenar: print(str(numero) + string) → '123abc'."
  - question: "O que retorna 5 * 'Python' e para que serve esse padrão em formatação?"
    answer: "'PythonPythonPythonPythonPython'. Multiplicação string * int repete a string. Usado para separadores: print(30*'-') ou '+' + 30*'-' + '+' para molduras em terminal."
  - question: "numero = 123; numero_em_string = '123'. Por que numero + numero_em_string dá erro e numero + int(numero_em_string) não?"
    answer: "O tipo é verificado, não o conteúdo. numero_em_string é str; int + str → TypeError. int(numero_em_string) converte para int; int + int → soma (246). Para concatenar: str(numero) + numero_em_string."
---
## Resumo

### Mapa da aula

- Escape sequences controlam caracteres especiais em strings (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark>)
- Raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark> desativa interpretação de escape — tudo literal
- Concatenação com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> só entre strings; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int + str`</mark> → TypeError
- Multiplicação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str * int`</mark> repete a string (separadores, molduras)
- Erro clássico: confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> (quebra) com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\n`</mark> (literal) ou concatenar int com str sem conversão

- **Resumo consolidado:** Escape: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> quebra linha, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark> tabulação, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> barra literal, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> aspa dentro de string com aspas simples. Raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark>: nenhum escape interpretado. Concatenação: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> junta strings; converter com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> conforme o objetivo. Multiplicação: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string * n`</mark> repete a string n vezes. Tipagem forte: operação só entre tipos compatíveis.
- **Resumo em 5 linhas:** (1) Escape: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> quebra, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark> tab, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> barra, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> aspa. (2) Raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark> trata tudo como literal. (3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> concatena só str com str; int+str → TypeError; usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>. (4) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str * int`</mark> repete a string. (5) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark> confirma tipo; aspas não escapadas → SyntaxError.
- **Palavras-chave:** escape, raw string, concatenação, multiplicação de strings, tipagem forte, TypeError, SyntaxError, str(), int().

## Explicações

### 1. Tema e escopo

**Tema:** Sexto encontro: caracteres de escape em strings, raw string, concatenação e multiplicação de strings, conversão de tipos para evitar TypeError.

**Problema que resolve:** Inserir quebras de linha e tabulação em strings; exibir barra ou aspa literal; juntar textos e números na saída; criar separadores dinâmicos; evitar erro ao misturar int e str com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>.

**Inclui:** Escape <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark>; raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark>; operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> (concatenação) e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark> (repetição); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> na concatenação ou soma; formatação com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('Name:\t', name)`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(30*'-')`</mark>.

**Não coberto:** Operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> para formatação de string (apenas erro ao usar mal); f-strings e métodos de string (próximas aulas).

### 2. Contexto na disciplina

- Segue à aula 5 (strings básicas, aspas, docstring). Usa conversão de tipos da aula 4.
- Pré-requisito: variáveis, tipos, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>.
- Base para formatação de saída, entrada de usuário e manipulação de texto.

### 3. Visão conceitual geral

Aula **técnica**: dentro de uma string, a barra invertida inicia sequências especiais (escape). Algumas produzem efeito (quebra, tab); para mostrar a barra ou aspa literal é preciso “escapar” (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark>). Raw string desliga essa interpretação. Com strings, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> concatena e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark> repete; tipagem forte exige conversão ao misturar número e texto.

### 4. Ideias-chave (máx. 7)

1. **Escape:** Barra invertida + caractere = sequência especial. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> quebra linha, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark> tabulação; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> para exibir barra e aspa. Cobrado em prova: prever saída de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark>.
2. **Raw string:** Prefixo <code>r</code> antes das aspas: nenhum escape é interpretado; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> vira literal. Usar quando o texto contém muitas barras (ex.: caminhos, regex depois).
3. **Concatenação:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> junta apenas strings. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`nome + ' ' + sobrenome`</mark> → uma string com espaço. Não confundir com soma numérica.
4. **Tipagem forte e +:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int + str`</mark> → **TypeError**. Converter: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(numero) + texto`</mark> para concatenar; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`numero + int(numero_em_string)`</mark> para somar. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark> não inspeciona conteúdo, só tipo.
5. **Multiplicação de strings:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string * int`</mark> repete a string. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`5 * 'Python'`</mark> → <code>'PythonPythonPythonPythonPython'</code>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`30*'-'`</mark> para separador; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'+' + 30*'-' + '+'`</mark> para moldura.
6. **Aspas não escapadas:** String com aspas simples contendo aspa simples sem escape → interpretador “fecha” a string ali → **SyntaxError: unterminated string literal**. Solução: escape <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> ou delimitar com aspas duplas.
7. **Formatação de saída:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('Name:\t', name)`</mark> alinha com tab; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(30*'-')`</mark> padroniza separadores sem “força bruta”.

### 5. Conceitos essenciais — explicação operacional

#### Escape em strings

- **Definição:** Sequência iniciada por <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\`</mark> com significado especial. Principais: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> (nova linha), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark> (tabulação), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> (uma barra literal), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> (aspa simples literal).
- **Exemplo quebra de linha:**
```bash
loren = 'sed do eiusmod tempor\nincididunt ut labore'
print(loren)
```
Saída: duas linhas. Com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\n`</mark> (barra escapada + n): saída em uma linha com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> visível.
- **Exemplo barra literal:** Para mostrar “barra invertida” no texto usando aspas simples: <code>text = '... sobre a \\'</code> — primeira <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\`</mark> escapa a segunda, resultando em uma barra na saída.
- **Quando NÃO usar:** Não usar escape para indentar **código** (if, for); escape é para **conteúdo de string** (texto exibido).

#### Raw string

- **Definição:** Prefixo <code>r</code> antes da string (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark>). Todas as barras são literais; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> não vira quebra.
- **Exemplo:**
```bash
text = r'Lorem ipsum \nconsectetur'
print(text)
```
Saída: <code>Lorem ipsum \nconsectetur</code> (uma linha).
- **Quando usar:** Texto com muitas barras ou quando se quer <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> visível. Quando NÃO usar: quando precisar de quebra real com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>.

#### Concatenação e conversão

- **Regra:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> entre duas strings = concatenação; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int + str`</mark> → **TypeError**.
- **Exemplo correto (concatenar número com texto):**
```bash
numero = 123
string = 'Aqui eh uma string'
concatenar_numero_string = str(numero) + string
print(concatenar_numero_string)
```
Saída: <code>123Aqui eh uma string</code>. A variável <code>numero</code> continua <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark>; a conversão é só na expressão.
- **Soma numérica:** Se <code>numero_em_string = '123'</code> e se quer soma: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`resultado = numero + int(numero_em_string)`</mark> → 246. Tipo da variável importa, não o conteúdo.

#### Multiplicação de strings

- **Regra:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str * int`</mark> repete a string. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int * str`</mark> também (ordem não importa).
- **Exemplo:**
```bash
nome = 'Python'
print(5 * nome)
```
Saída: <code>PythonPythonPythonPythonPython</code>.
- **Uso em formatação:** Separador padronizado: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(30*'-')`</mark>; moldura: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('+' + 30*'-' + '+')`</mark>.

### 5b. Modelo mental

Python processa strings em duas fases: (1) **Interpreta escapes** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> viram caractere de controle ou literal. (2) **Gera a string final** em memória. Raw string (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark>) pula a interpretação de escape — tudo vira caractere literal.

### 6. Teste de reconhecimento rápido

**Qual a saída?**
```bash
print('A\nB')
```
**Resposta:** A (quebra de linha) B.

**Qual a saída?**
```bash
print(r'A\nB')
```
**Resposta:** A\nB (literal, sem quebra).

**O que acontece?**
```bash
numero = 5
texto = 'abc'
resultado = numero + texto
```
**Resposta:** TypeError (int + str não permitido).

**O que imprime?**
```bash
print(3 * '-')
```
**Resposta:** ---.

**String com aspas: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`t = 'barra invertida - \'`</mark> (só uma barra antes do fim). O que ocorre?** **Resposta:** SyntaxError: unterminated string literal (aspa interna não escapada fecha a string).

### 7. Erros clássicos de prova

**Confundir:**
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> (um caractere, quebra linha) com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\n`</mark> (dois caracteres, literal)
- Raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark> com string normal (raw não processa escapes)
- Concatenação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str + str`</mark> com soma <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int + int`</mark> (mesmo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>, comportamentos diferentes)
- Concatenar sem converter: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`numero + 'texto'`</mark> → TypeError; usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(numero) + 'texto'`</mark>

### 8. Exemplos de alta densidade

```bash
print('\\')
```
Saída: <code>\</code>

```bash
print('a\nb')
```
Saída: a (quebra) b

```bash
print(r'a\nb')
```
Saída: a\nb

```bash
'Python' * 3
```
Saída: <code>'PythonPythonPython'</code>

```bash
5 * 'ab\n'
```
Saída: ab (quebra) ab (quebra) ab (quebra) ab (quebra) ab (quebra)

```bash
str(123) + 'abc'
```
Saída: <code>'123abc'</code>

```bash
123 + 'abc'
```
Erro: TypeError

```bash
name = 'Jonh Doe'
address = 'Avenue A'
print('Name:\t', name)
print('Addrs:\t', address)
print(30*'-')
```
Saída: Name e Addrs com tabulação; depois linha de 30 hífens.

### 9. Procedimento / execução

- **Quebra de linha no texto:** Inserir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> onde deve quebrar. Para literal \n: usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\n`</mark> ou raw string.
- **Barra ou aspa no texto:** Escapar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> conforme o delimitador.
- **Concatenar número e texto:** Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(numero)`</mark> na expressão; não altera o tipo da variável original.
- **Separador/moldura:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(n * '-')`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('+' + n*'-' + '+')`</mark>.

### 10. Exemplos relevantes

- **Concatenação nome + sobrenome:**
```bash
nome = 'Python'
sobrenome = 'Programming'
nome_completo = nome + ' ' + sobrenome
print(nome_completo)
```
Saída: Python Programming.

- **Conversão para concatenar vs somar:** <code>numero = 123</code>, <code>numero_em_string = '123'</code>. Concatenar: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(numero) + numero_em_string`</mark> → <code>'123123'</code>. Somar: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`numero + int(numero_em_string)`</mark> → 246.

- **Listagem formatada (transcrição/slides):** <code>name</code> e <code>address</code> reatribuídos; entre cada bloco <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(30*'-')`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('Name:\t', name)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('Addrs:\t', address)`</mark> — execução sequencial: cada print usa o valor atual da variável.

Veja também: [[aula-05-exercicios-strings]] (aspas e docstring), [[aula-04-operadores-conversao-tipos]] (conversão e tipagem forte).

### 11. Diferenças e confusões comuns

- **Escape vs literal:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> em string normal = quebra; em raw string ou como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\n`</mark> = dois caracteres.
- **Tipagem dinâmica vs forte:** Tipo inferido pelo valor (dinâmica); operações só entre tipos compatíveis (forte). <code>'123'</code> é str; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> com int exige conversão explícita.

### 12. Como cai em prova

- Pedir a saída de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print('a\nb')`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(r'a\nb')`</mark>.
- Dar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int + str`</mark> e perguntar o erro e a correção (str() ou int()).
- Verdadeiro/falso: “Raw string interpreta \n como quebra de linha.” (Falso.)
- Código com aspa interna não escapada e perguntar o erro (SyntaxError: unterminated string literal).

### 13. Pontos de atenção

- <mark>Barra no fim da string</mark> sem escape: <code>'texto\'</code> sem segunda aspa → string não terminada. Para terminar com barra: <code>'texto\\\\'</code> (ou usar raw se for só literal).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type(numero_em_string)`</mark> é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> mesmo quando o conteúdo é <code>'123'</code>; o Python não converte automaticamente no <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>.

### 14. Checklist de domínio

- [ ] Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> e quando usar raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark>.
- [ ] Sei concatenar strings com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> e evitar TypeError usando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> conforme o objetivo.
- [ ] Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string * int`</mark> para repetir e criar separadores.
- [ ] Sei prever saída de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> com escapes, raw string e multiplicação.
- [ ] Sei identificar SyntaxError por aspas não escapadas e corrigir.

### 15. Síntese operacional

- Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> em strings e quando usar raw string <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r'...'`</mark>.
- Sei concatenar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> e evitar TypeError: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(numero)`</mark> para texto, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(numero_em_string)`</mark> para soma.
- Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string * int`</mark> para repetir e criar separadores (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`30*'-'`</mark>).
- Sei prever saída de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> com escapes, raw string e multiplicação.
- Sei identificar SyntaxError por aspas não escapadas e corrigir com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\'`</mark> ou delimitador oposto.
- Sei converter tipos com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> e quando cada conversão funciona ou gera erro.
