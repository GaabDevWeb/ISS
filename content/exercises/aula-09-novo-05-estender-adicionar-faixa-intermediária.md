---
title: Estender — adicionar faixa intermediária
slug: aula-09-novo-05-estender-adicionar-faixa-intermediária
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
exercise_type: extend_code
stage: 4
context: validação de dados
test_cases:
- input: '9

    '
  output: EXCELENTE
- input: '6

    '
  output: REGULAR
- input: '2

    '
  output: RUIM
---

## Enunciado

Escreva um programa que leia `media` e imprima:
- `EXCELENTE` se `media >= 9`
- `BOM` se `media >= 7`
- `REGULAR` se `media >= 5`
- `RUIM` caso contrário

## Solução

```python
media = float(input())
if media >= 9:
    print("EXCELENTE")
elif media >= 7:
    print("BOM")
elif media >= 5:
    print("REGULAR")
else:
    print("RUIM")
```
