---
title: Completar — classificação por nota (if/elif/else)
slug: aula-09-novo-01-completar-classificação-por-nota-ifelifelse
difficulty: easy
concepts:
- booleanos
- operadores relacionais
- if/elif/else
- blocos identados
- fluxo condicional
- expressão booleana
discipline: python
learning_goal: 'Praticar: booleanos, operadores relacionais, if/elif/else'
exercise_type: complete_the_code
stage: 1
context: validação de dados
test_cases:
- input: '7

    '
  output: APROVADO
- input: '6.9

    '
  output: REPROVADO
---

## Enunciado

Complete para imprimir `APROVADO` se `media >= 7`, senão `REPROVADO`.

```python
media = float(input())
if ____________:
    print("APROVADO")
else:
    print("REPROVADO")
```

## Solução

```python
media = float(input())
if media >= 7:
    print("APROVADO")
else:
    print("REPROVADO")
```
