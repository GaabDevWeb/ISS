---
title: "Soma dos números pares de 1 até N com range e acumulador"
slug: "aula-12-hard-05-soma-pares-ate-n"
difficulty: "hard"
concepts: ["acumuladores", "+=", "range com step"]
discipline: "python"
learning_goal: "Calcular soma de todos os pares no intervalo [1, N] usando range(2, N+1, 2)."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "10"
    output: "30"
---

## Enunciado

Escreva um programa que leia um inteiro N e exiba a soma de todos os números pares de 1 a N (inclusive). Use for i in range(2, N+1, 2): e acumulador soma += i.

## Solução

```python
n = int(input())
soma = 0
for i in range(2, n + 1, 2):
    soma += i
print(soma)
```
