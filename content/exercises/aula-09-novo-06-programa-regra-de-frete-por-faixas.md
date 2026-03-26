---
title: Programa — regra de frete por faixas
slug: aula-09-novo-06-programa-regra-de-frete-por-faixas
difficulty: hard
concepts:
- booleanos
- operadores relacionais
- if/elif/else
- blocos identados
- fluxo condicional
- expressão booleana
discipline: python
learning_goal: 'Praticar: booleanos, operadores relacionais, if/elif/else'
exercise_type: full_program
stage: 5
context: scripts de automação
test_cases:
- input: '250

    '
  output: '0'
- input: '150

    '
  output: '15'
- input: '10

    '
  output: '25'
---

## Enunciado

Leia `total` (float). Imprima o frete:
- `0` se total >= 200
- `15` se 100 <= total < 200
- `25` caso contrário

## Solução

```python
total = float(input())
if total >= 200:
    print(0)
elif total >= 100:
    print(15)
else:
    print(25)
```
