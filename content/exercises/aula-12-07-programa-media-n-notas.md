---
title: "Programa — média de N notas com acumulador"
slug: "aula-12-07-programa-media-n-notas"
difficulty: "medium"
concepts: ["acumuladores", "+=", "range", "for"]
discipline: "python"
learning_goal: "Ler N, depois N notas, acumular soma e exibir média."
exercise_type: "full_program"
stage: 11
context: "validação de dados"
test_cases:
  - input: "3\n8\n7\n9"
    output: "8.0"
---

## Enunciado

Escreva um programa que leia um inteiro N e em seguida N notas (float, uma por linha). Calcule a média (soma/N) e exiba com uma casa decimal. Use acumulador (soma += nota) no loop.

## Solução

```python
n = int(input())
soma = 0
for _ in range(n):
    soma += float(input())
media = soma / n
print(f"{media:.1f}")
```
