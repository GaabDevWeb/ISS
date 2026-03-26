---
title: Estender — aceitar divisão inteira
slug: aula-04-novo-05-estender-aceitar-divisão-inteira
difficulty: medium
concepts:
- conversão de tipos
- tipagem dinâmica
- tipagem forte
- int, float, bool, string
- operadores aritméticos
- precedência de operadores
discipline: python
learning_goal: 'Praticar: conversão de tipos, tipagem dinâmica, tipagem forte'
exercise_type: extend_code
stage: 4
context: scripts de automação
test_cases:
- input: '7

    2

    '
  output: '3.5

    3'
---

## Enunciado

Estenda para imprimir também a divisão inteira `a // b`.

## Solução

```python
a = int(input())
b = int(input())
print(a / b)
print(a // b)
```
