---
title: "Operadores lógicos e match/case"
slug: "operadores-logicos-match-case"
discipline: "python"
order: 10
description: "Operadores and, or, not; tabela verdade; if opcional e ifs aninhados; padronização de string; valores truthy/falsy; match/case (Python 3.10+)"
reading_time: 8
difficulty: "medium"
concepts:
  - operadores lógicos
  - and
  - or
  - not
  - tabela verdade
  - if opcional
  - ifs aninhados
  - padronização de string
  - truthy e falsy
  - match case
  - pattern matching
prerequisites: ["aula-09-desvio-condicional"]
exercises:
  - question: "Qual o resultado de (True and False) or (True)?"
    answer: "True. AND tem precedência: True and False = False. Depois False or True = True."
  - question: "Por que padronizar string (strip, lower) ao comparar com input do usuário?"
    answer: "O usuário pode digitar com espaços ou maiúsculas. 'Sim' != 'sim'; ' sim '.strip().lower() == 'sim' evita falha no teste."
  - question: "Quais valores Python considera falsy em contexto booleano?"
    answer: "False, None, 0, string vazia ''. Qualquer outro valor (número não zero, string não vazia) é truthy."
  - question: "A partir de qual versão o match/case existe em Python? O que acontece em versão anterior?"
    answer: "Python 3.10+. Em versão anterior, match/case gera SyntaxError — usar if/elif/else."
  - question: "Se numero_1=8 e numero_2=3, entra no bloco: if (numero_1 > 10) and (numero_2 < 5)?"
    answer: "Não. 8 > 10 é False; com AND, um False torna a expressão toda False. O bloco não executa."
  - question: "Qual a diferença entre vários if independentes e if/elif/else?"
    answer: "Vários if: cada condição é testada. if/elif: só o primeiro True executa; os demais são ignorados. Use elif quando os casos forem mutuamente exclusivos."
---
## Resumo

### Mapa da aula

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark> exige todos os operandos <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark> basta um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark> inverte o valor lógico
- Tabela verdade define resultado de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A and B`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A or B`</mark> para cada combinação de True/False
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> é válido; ifs aninhados permitem encadear testes sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark>
- Comparação de strings: usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip().lower()`</mark> (ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark>) para evitar falha por espaço/caixa
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> (Python 3.10+): correspondência por valor; alternativa ao encadeamento de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif`</mark>
- Erro clássico: confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark> (um False anula AND; um True basta em OR)

- **Resumo consolidado:** Operadores lógicos <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark> combinam expressões booleanas. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> são opcionais; é possível aninhar ifs. Padronizar string com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip().lower()`</mark> em comparações. Valores falsy: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`None`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`0`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`''`</mark>. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> (3.10+) faz correspondência por valor.
- **Resumo em 5 linhas:** (1) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>: só True se todos True. (2) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>: True se pelo menos um True. (3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>: inverte booleano. (4) Parênteses em condições com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark> garantem precedência e legibilidade. (5) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match expressao: case x:`</mark> executa bloco se valor casar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x`</mark>.
- **Palavras-chave:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>, tabela verdade, if opcional, ifs aninhados, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower`</mark>, truthy, falsy, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`case`</mark>, PEP 636, Python 3.10.

## Explicações

### 1. Tema e escopo

**Tema:** Décimo encontro — operadores lógicos (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>), tabela verdade, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> opcional, ifs aninhados, padronização de string, valores truthy/falsy, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark>.

**Inclui:** Tabela verdade para <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>; operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>; uso em testes condicionais com parênteses; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark>; ifs dentro de ifs; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark> em comparações; valores considerados falsy; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> (PEP 636, Python 3.10+); teste de mesa.

**Não coberto:** Tratamento de erros em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input`</mark>; padrões avançados de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match`</mark> (listas, tuplas, guards).

### 2. Contexto na disciplina

- Continuação de [[aula-09-desvio-condicional]]: aprofunda testes condicionais com combinação de condições e nova estrutura.
- Pré-requisito: desvio condicional, operadores relacionais, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>, métodos de string ([[aula-08-strings-formatacao-input]], [[aula-07-strings-indices-slice-metodos]]).
- Base para: laços, funções e qualquer lógica com múltiplas condições.

### 3. Visão conceitual geral

Aula **técnica**. Operadores lógicos permitem combinar duas ou mais condições em uma única expressão booleana. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> e ifs aninhados ampliam o controle de fluxo. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> oferece sintaxe clara quando se compara um valor contra vários casos (equivalente conceitual a switch em outras linguagens, com semântica de pattern matching).

### 4. Ideias-chave

1. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>:** resultado <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> só se todos os operandos forem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>; um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark> torna a expressão <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
2. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>:** resultado <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> se pelo menos um operando for <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>; só é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark> quando todos forem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
3. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>:** inverte o valor lógico (True → False, False → True).
4. **If opcional:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`elif`</mark> não são obrigatórios; um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> sozinho executa o bloco só quando a condição é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>.
5. **Padronização de string:** em comparações com entrada do usuário, usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`texto.strip().lower()`</mark> (ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark>) para ignorar espaços e diferença de caixa.
6. **Valores falsy:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`None`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`0`</mark>, string vazia <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`''`</mark> são tratados como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark> em contexto booleano; demais valores são truthy.
7. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark>:** compara o valor de uma expressão com cada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`case`</mark>; executa o bloco do primeiro que “casar”; exige Python 3.10+.

### 5. Conceitos essenciais — explicação operacional

#### Tabela verdade (AND e OR)

| A     | B     | A and B | A or B |
|-------|-------|---------|--------|
| True  | True  | True    | True   |
| True  | False | False   | True   |
| False | True  | False   | True   |
| False | False | False   | False  |

**Negação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not True`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not False`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>.

#### Uso em condição com parênteses

```bash
numero_1 = int(input('Digite um numero: '))
numero_2 = int(input('Digite outro numero: '))

if (numero_1 > 10) and (numero_2 < 5):
    print('Teste realizado')
```

O bloco só executa quando **as duas** condições são verdadeiras. Parênteses são opcionais mas recomendados para legibilidade e controle de precedência.

#### If sem else e ifs aninhados

```bash
nome = input('Digite seu nome: ')
if nome == 'Gesiel Lopes':
    print('Python é uma linguagem muito boa.')
# Se nome for outro, nada é executado — sem erro.
```

Encaixar ifs: o if interno só é avaliado se o if externo for verdadeiro.

```bash
esta_com_fome = input('Voce esta com fome? Sim ou nao? ').strip().lower()
if esta_com_fome == 'sim':
    if preco < 10:
        print('Posso comprar bastante sushi')
    elif 10 < preco <= 20:
        print('Preco razoavel, como menos')
```

#### Padronização de string

```bash
resposta = input('Sim ou nao? ').strip().lower()
if resposta == 'sim':   # aceita 'Sim', 'SIM', ' sim '
    ...
```

<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace()`</mark> pode remover acentos antes de comparar (ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'não'.replace('ã','a')`</mark>).

#### Valores falsy

```bash
if False:   print('a')  # não executa
if None:    print('b')  # não executa
if 0:       print('c')  # não executa
if '':      print('d')  # não executa
if 1:       print('e')  # executa
if 'oi':    print('f')  # executa
```

#### match/case (Python 3.10+)

```bash
dia = int(input('Digite o dia da semana (1 a 7): '))

match dia:
    case 1:
        print('Domingo')
    case 2:
        print('Segunda')
    case 3:
        print('Terca')
    # ... case 4, 5, 6, 7
```

A expressão após <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match`</mark> é comparada a cada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`case`</mark>; o primeiro que casar executa e encerra (não há fall-through como em switch de outras linguagens). Em Python &lt; 3.10, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match`</mark> gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.

### 5b. Modelo mental

- **AND:** pense “todos precisam ser True”. Assim que um operando é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, a expressão inteira é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
- **OR:** pense “basta um True”. Só é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark> quando todos forem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
- **match/case:** o interpretador compara o valor da expressão com cada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`case`</mark> na ordem; ao encontrar igualdade, executa esse bloco e sai da estrutura.

### 5c. Comparação direta

| Abordagem | Quando usar |
|-----------|-------------|
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if (a) and (b)`</mark> | Duas (ou mais) condições que **todas** precisam ser True |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if (a) or (b)`</mark> | Pelo menos **uma** das condições True |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif/else`</mark> | Múltiplos valores/casos mutuamente exclusivos (qualquer versão) |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> | Comparar **um valor** a vários literais/casos (Python 3.10+); sintaxe mais limpa |

### 5d. Quando usar

- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>** quando a ação exige que **todas** as condições sejam verdadeiras.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>** quando **uma** condição verdadeira já basta.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark>** para inverter uma condição (ex.: “se **não** for vazio”).
- **Parênteses** em condições com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark> para deixar a ordem de avaliação clara.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark>** quando a versão for 3.10+ e o problema for “um valor contra vários casos”; caso contrário, usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif/else`</mark>.

### 6. Teste de reconhecimento rápido

**O que imprime?**
```bash
print((True and False) or True)
```
**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True and False`</mark> = False; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False or True`</mark> = True.

---

**Executa o print?**
```bash
if 0:
    print('ok')
```
**Resposta:** Não. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`0`</mark> é falsy.

---

**Entra no if?** `n1=12`, `n2=3`
```bash
if (n1 > 10) and (n2 < 5):
    print('entrou')
```
**Resposta:** Sim. 12 > 10 e 3 < 5 são ambos True → and é True.

---

**match/case em Python 3.9?**
**Resposta:** Não; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match`</mark> existe a partir de 3.10 → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.

### 7. Erros clássicos de prova

- **Trocar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark> por <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>:** “ambas as condições” exige <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>; “pelo menos uma” exige <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>.
- **Comparar string de input sem padronizar:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'Sim' != 'sim'`</mark>; usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip().lower()`</mark>.
- **Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> em Python &lt; 3.10:** gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.
- **Achar que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> é obrigatório:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> sozinho é válido; o bloco só roda quando a condição é True.

### 7b. Armadilhas clássicas

- **“Digite sim ou não”** → usuário digita “SIM ” ou “ sim”; sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip().lower()`</mark> a comparação falha.
- **Pergunta “qual o resultado de A and B quando A é True e B é False?”** → resposta: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark> (and exige todos True).
- **Enunciado pede “se **não** for vazio”** → usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if texto:`</mark> (string não vazia é truthy) ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if not texto:`</mark> para vazio.

### 8. Exemplos de alta densidade

```bash
if (numero_1 > 10) and (numero_2 < 5):
    print('Teste realizado')
else:
    print('Teste nao realizado')
```

```bash
resposta = input('Sim ou nao? ').strip().lower()
if resposta == 'sim':
    print('Ok')
```

```bash
if 0: print('a')
if '': print('b')
if None: print('c')
if 1: print('d')   # só este imprime
```

```bash
# Python 3.10+
match dia_semana:
    case 1: print('Domingo')
    case 2: print('Segunda')
    case _: print('Outro')   # case _ é “qualquer outro”
```

### 12b. Regra de prova

- **Um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark> no <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark> → expressão <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.**
- **Um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> no <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark> → expressão <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>.**
- **Comparar string com input → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip().lower()`</mark> (ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark>).**
- **Falsy:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`None`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`0`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`''`</mark>.**
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match/case`</mark> só em Python 3.10+;** senão usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if/elif/else`</mark>.

### 15. Síntese operacional

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>: todos True → True; um False → False. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark>: um True → True; todos False → False. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`not`</mark> inverte.
- Usar parênteses em condições com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`and`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`or`</mark> para clareza e precedência.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark> sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`else`</mark> é válido; ifs aninhados permitem encadear testes.
- Comparação com input: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`texto.strip().lower() == 'sim'`</mark>.
- Falsy: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`None`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`0`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`''`</mark>. Resto é truthy.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`match expr: case x:`</mark> executa bloco se valor casar; Python 3.10+.
