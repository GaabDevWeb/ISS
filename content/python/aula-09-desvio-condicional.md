---
title: "Desvio Condicional"
slug: "desvio-condicional"
discipline: "python"
order: 9
description: "Estruturas if/else e if/elif/else para desvio de fluxo; blocos de código por indentação; testes lógicos e notação de intervalo"
reading_time: 7
difficulty: "medium"
concepts: "if/else, if/elif/else, operador módulo %, notação de intervalo, comparação"
prerequisites: ["aula-08-strings-formatacao-input"]
exercises:
  - question: "Qual a diferença entre else e elif?"
    answer: "else executa quando todas as condições anteriores são falsas — sem teste adicional. elif executa somente se a condição anterior for False E a sua própria condição for True. elif permite múltiplos testes encadeados; else é o caso padrão final."
  - question: "Por que o bloco de código usa indentação em Python? O que acontece sem ela?"
    answer: "Em Python, a indentação define o bloco — não há chaves {}. Sem indentação correta (Tab ou 2 espaços), o interpretador não reconhece o bloco e gera IndentationError."
    hint: "Python usa espaço/tab para delimitar blocos, diferente de C e Java que usam {}."
  - question: "Como verificar se um número é par usando Python? Escreva o código."
    answer: "Usar o operador %, que retorna o resto da divisão: if numero % 2 == 0: → par. Se o resto for diferente de zero (numero % 2 != 0), o número é ímpar."
  - question: "O que é notação de intervalo em Python? Escreva a condição para IMC entre 18.5 e 24.9."
    answer: "Python permite encadear operadores relacionais como em matemática: 18.5 <= imc <= 24.9. É equivalente a imc >= 18.5 and imc <= 24.9. Testa se imc está dentro do intervalo."
  - question: "Se media = 6.5, qual bloco executa em: if media >= 7: ... elif media >= 5: ... else: ...?"
    answer: "O elif (media >= 5). O if falha porque 6.5 < 7. O elif testa 6.5 >= 5 — verdadeiro, executa esse bloco. O else nunca é avaliado."
    hint: "if/elif são testados em ordem; o primeiro True vence e os demais são ignorados."
  - question: "Qual erro ocorre ao escrever: if numero = 2: ?"
    answer: "SyntaxError: invalid syntax. O operador de atribuição = não é válido em condição. A condição exige operador relacional ==: if numero == 2:"
---
## Resumo

### Mapa da aula

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/else`</mark> desvia o fluxo de execução com base em teste lógico (True/False)
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> encadeia múltiplos testes — apenas o primeiro verdadeiro executa
- Bloco de código definido por indentação (Tab ou 2 espaços) — obrigatório em Python
- Python aceita notação de intervalo matemático: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`18.5 <= imc <= 24.9`</mark>
- Erro clássico: usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> em vez de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark> na condição → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>

- **Resumo consolidado:** Desvio condicional muda o fluxo do algoritmo com base em um teste lógico (booleano). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> testa uma condição; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> é o caso contrário; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> permite múltiplos testes encadeados. Blocos de código são definidos por indentação. Notação de intervalo (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a <= x <= b`</mark>) é válida em Python.
- **Resumo em 5 linhas:** (1) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if condição:`</mark> executa bloco se True. (2) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else:`</mark> executa se False. (3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif condição:`</mark> novo teste, só alcançado se o anterior for False. (4) Bloco = indentação obrigatória após <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`:`</mark>. (5) Primeiro <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> verdadeiro executa; restantes ignorados.
- **Palavras-chave:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark>, teste lógico, bloco de código, indentação, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>, notação de intervalo, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndentationError`</mark>.

## Explicações

### 1. Tema e escopo

**Tema:** Nono encontro — desvio condicional com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/else`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif/else`</mark>.

**Inclui:** Estrutura <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/else`</mark>; ifs encadeados com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>; indentação como delimitador de bloco; revisão de operadores relacionais (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>=`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<=`</mark>); notação de intervalo; operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> para divisibilidade; teste de mesa.

**Não coberto:** `match/case` (mencionado, postergado para próxima aula); operadores lógicos `and`/`or`/`not`.

### 2. Contexto na disciplina

- Primeiro mecanismo de controle de fluxo — torna algoritmos dinâmicos e não lineares.
- Pré-requisito: [[aula-08-strings-formatacao-input]] (`input()`, f-strings, conversão de tipo), [[aula-04-operadores-conversao-tipos]] (operadores relacionais, operador `%`).
- Base para: laços de repetição, funções condicionais, qualquer algoritmo de decisão.

### 3. Visão conceitual geral

Aula **técnica**. Até aqui algoritmos executavam linha por linha sempre da mesma forma. Desvio condicional muda isso — o código toma um caminho ou outro dependendo de um teste lógico (resultado booleano). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> é o primeiro mecanismo real de controle de fluxo.

### 4. Ideias-chave

1. **Teste lógico:** toda condição em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> é uma expressão que retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
2. **Indentação = bloco:** Python não usa `{}`; o espaço/tab define o que pertence ao bloco.
3. **Ordem importa em elif:** Python testa de cima para baixo; o primeiro <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> executa; os demais são ignorados.
4. **else sem condição:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> é o caso padrão — executa somente se todos os testes anteriores forem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
5. **Notação de intervalo:** Python permite <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a <= x <= b`</mark> como na matemática — avaliado da esquerda para a direita.
6. **Módulo para divisibilidade:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`n % 2 == 0`</mark> → par; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`n % 2 != 0`</mark> → ímpar.
7. **Teste de mesa:** validar o algoritmo no papel, atribuindo valores e rastreando o fluxo antes de executar.

### 5. Conceitos essenciais — explicação operacional

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/else`</mark>

Dois caminhos mutuamente exclusivos. Bloco do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> executa se condição for <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>; bloco do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> se for <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>. Exatamente um dos dois roda.

```bash
numero = int(input('Digite um numero: '))
resto = numero % 2

if resto == 0:
    mensagem = 'PAR'
else:
    mensagem = 'IMPAR'

print(f'O numero digitado: {numero} eh {mensagem}')
```

- ❌ Esquecer <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`:`</mark> após condição → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.
- ❌ Esquecer indentação do bloco → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndentationError`</mark>.

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> — ifs encadeados

Mais de dois caminhos. Cada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> é testado na ordem; o primeiro verdadeiro executa e os restantes são pulados.

```bash
if media >= 7:
    mensagem = 'APROVADO(A) DIRETO'
elif media >= 5:
    mensagem = 'RECUPERACAO'
else:
    mensagem = 'REPROVADO(A)'
```

> **Regra crítica:** Se `media = 6.5` → falha no `if` (6.5 < 7) → entra no `elif` (6.5 >= 5 = True) → executa `RECUPERACAO`. O `else` nunca é avaliado.

#### Notação de intervalo

Python permite encadear operadores relacionais como na matemática:

```bash
if 18.5 <= imc <= 24.9:
    mensagem = 'Peso ideal (Normal)'
```

Equivalente a `imc >= 18.5 and imc <= 24.9`. Funciona com qualquer combinação de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<=`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`<`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>=`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>`</mark>.

### 5b. Modelo mental

Python avalia condições **em sequência, uma por vez**:

1. Testa o <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> — se <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>, executa o bloco e **pula tudo** abaixo.
2. Se <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, testa o primeiro <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> — mesmo processo.
3. Repete para cada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> na ordem.
4. Se nenhum for <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>, executa o <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> (se existir).

Pense em cascata: a água cai pelo primeiro canal aberto e ignora os demais.

### 5c. Comparação direta

| Estrutura | Casos | Exemplo de uso |
|-----------|-------|---------------|
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/else`</mark> | 2 caminhos | par/ímpar, aprovado/reprovado |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif/else`</mark> | 3+ caminhos | notas (direto/recuperação/reprovado), IMC |
| só <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> | alerta opcional, sem caso contrário | `if erro: print('aviso')` |

### 5d. Quando usar

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/else`</mark> → exatamente 2 resultados possíveis.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif/.../else`</mark> → 3+ resultados; ordem dos testes importa — do mais restritivo ao menos.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> em vez de múltiplos <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> independentes → quando os casos são mutuamente exclusivos.
- **NÃO usar** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.

### 6. Teste de reconhecimento rápido

**O que acontece?**
```bash
x = 10
if x > 5:
    print('maior')
else:
    print('menor')
```
**Resposta:** `maior` — 10 > 5 é True; bloco do `if` executa.

---

**Qual bloco executa? `media = 4.9`**
```bash
if media >= 7:
    mensagem = 'APROVADO DIRETO'
elif media >= 5:
    mensagem = 'RECUPERACAO'
else:
    mensagem = 'REPROVADO'
```
**Resposta:** `REPROVADO` — 4.9 < 7 (if falha) e 4.9 < 5 (elif falha) → else executa.

---

**O que retorna?**
```bash
10 % 3
```
**Resposta:** `1` — resto da divisão de 10 por 3.

---

**É válida a expressão abaixo?**
```bash
if 25 <= imc <= 29.9:
```
**Resposta:** Sim — notação de intervalo válida em Python.

### 7. Erros clássicos de prova

- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> vs <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if x = 5`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>. Condição usa <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark> (comparação), não <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> (atribuição).
- **Achar que elif sempre testa:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> só é avaliado se todos os testes anteriores forem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
- **Esquecer dois pontos:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if x > 5`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`:`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>. Obrigatório em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark>.
- **Múltiplos `if` independentes vs `elif`:** com `if`s independentes, todos os testes são executados; com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>, o primeiro verdadeiro para a cadeia.

### 7b. Armadilhas clássicas

- **Ordem errada em elif** → `if media >= 5: elif media >= 7:` — se `media = 8`, entra no `if` (8 >= 5) e o segundo `elif` nunca é testado. Sempre testar do mais restritivo para o menos.
- **"else com condição"** → parece lógico escrever `else media < 5:`, mas gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> não aceita condição — é incondicional, sempre só <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else:`</mark>.
- **Mistura de tabs e espaços na indentação** → comportamento imprevisível ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TabError`</mark>. Usar apenas um padrão por arquivo.

### 8. Exemplos de alta densidade

```bash
# par ou ímpar
if numero % 2 == 0:
    print('PAR')
else:
    print('IMPAR')
```

```bash
# maior de dois números
if a > b:
    print(f'O numero: {a} eh maior que o {b}')
elif a < b:
    print(f'O numero: {b} eh maior que o {a}')
else:
    print(f'Os numeros digitados sao iguais, os numeros digitados: {a}')
```

```bash
# IMC com notação de intervalo e múltiplos elif
imc = peso / altura ** 2

if imc < 18.5:
    mensagem = 'Abaixo do peso'
elif 18.5 <= imc <= 24.9:
    mensagem = 'Peso ideal (Normal)'
elif 25 <= imc < 29.9:
    mensagem = 'Sobrepeso'
elif 30 <= imc <= 34.9:
    mensagem = 'Obesidade grau I'
elif 35 <= imc <= 39.9:
    mensagem = 'Obesidade grau II'
else:
    mensagem = 'Obesidade grau III'

print(f'O IMC de {nome} eh: {imc:.2f} e estah: {mensagem}')
```

### 12b. Regra de prova

- **Primeiro <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> vence** → em cadeia <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif`</mark>, o primeiro verdadeiro executa e os demais são ignorados.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> sem condição, sempre** → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else:`</mark> apenas dois pontos; qualquer condição gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`n % 2 == 0`</mark> → par** → resto zero = divisível por 2.
- **Faixa de valores → notação de intervalo** → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a <= x <= b`</mark> é válido em Python.
- **Sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`:`</mark> = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>** → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> sempre terminam com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`:`</mark>.

### 15. Síntese operacional

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if condição:`</mark> → bloco executa se <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else:`</mark> → executa se <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>; exatamente um dos dois roda.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif condição:`</mark> → só testado se o bloco anterior for <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>; primeiro verdadeiro para a cadeia.
- Bloco de código = indentação obrigatória (Tab ou 2 espaços); ausência → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndentationError`</mark>.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`n % 2 == 0`</mark> → par; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a <= x <= b`</mark> → notação de intervalo válida.
- Ordem dos testes importa: do mais restritivo ao menos restritivo.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> na condição → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>; usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`==`</mark>.
