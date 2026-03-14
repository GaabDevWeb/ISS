---
title: "Média de N notas com for e range"
slug: "aula-11-hard-07-media-n-notas-for"
difficulty: "hard"
concepts: ["for", "range()", "acumulador implícito"]
discipline: "python"
learning_goal: "Ler N e N notas, calcular e exibir média com 2 decimais."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "3\n8.0\n7.0\n9.0"
    output: "8.00"
---

## Enunciado

Escreva um programa que leia N (int) e depois N notas (float). Calcule a média (soma/N) e exiba com 2 casas decimais. Use for _ in range(N): e um acumulador de soma.

## Solução

```python
n = int(input())
soma = 0
for _ in range(n):
    soma += float(input())
media = soma / n
print(f"{media:.2f}")
```
