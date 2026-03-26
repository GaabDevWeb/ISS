---
title: Corrigir bug — indentação em if/else
slug: aula-09-novo-03-corrigir-bug-indentação-em-ifelse
difficulty: medium
concepts:
- booleanos
- operadores relacionais
- if/elif/else
- blocos identados
- fluxo condicional
- expressão booleana
discipline: python
learning_goal: 'Praticar: booleanos, operadores relacionais, if/elif/else'
exercise_type: fix_bug
stage: 3
context: validação de entrada
test_cases:
- input: '1

    '
  output: OK
- input: '2

    '
  output: 'NO'
---

## Enunciado

O código abaixo deveria imprimir `OK` quando a entrada for `1`. Corrija a indentação.

```python
x = int(input())
if x == 1:
print("OK")
else:
print("NO")
```

## Solução

```python
x = int(input())
if x == 1:
    print("OK")
else:
    print("NO")
```
