---
title: "Fatorial de N com acumulador e range"
slug: "aula-12-hard-06-fatorial-n-range"
difficulty: "hard"
concepts: ["acumuladores", "operadores de atribuição composta", "range"]
discipline: "python"
learning_goal: "Calcular N! = 1*2*...*N usando produto acumulador e for."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5"
    output: "120"
---

## Enunciado

Escreva um programa que leia um inteiro N (N >= 0) e exiba o fatorial de N (N!). Use acumulador produto = 1 e for i in range(1, N+1): produto *= i. Para N=0 exiba 1.

## Solução

```python
n = int(input())
produto = 1
for i in range(1, n + 1):
    produto *= i
print(produto)
```
