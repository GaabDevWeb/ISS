---
title: Implementar — converter Fahrenheit para Celsius
slug: aula-08-novo-04-implementar-converter-fahrenheit-para-celsius
difficulty: medium
concepts:
- interpolação de strings
- operador % para formatação
- método format() de str
- f-strings
- input()
- conversão de tipos após input
discipline: python
learning_goal: 'Praticar: interpolação de strings, operador % para formatação, método
  format() de str'
exercise_type: implement_function
stage: 4
context: monitoramento
test_cases:
- input: '32

    '
  output: '0.00'
- input: '212

    '
  output: '100.00'
---

## Enunciado

Leia `F` (int) e imprima `C` com 2 casas.

## Solução

```python
f = int(input())
c = (f - 32) * 5 / 9
print(f"{c:.2f}")
```
