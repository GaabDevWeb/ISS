---
title: "Programa — somar apenas valores pares"
slug: "aula-12-12-programa-soma-pares"
difficulty: "medium"
concepts: ["acumuladores", "range com step", "for"]
discipline: "python"
learning_goal: "Percorrer números de 1 a N, acumular só os pares e exibir a soma."
exercise_type: "full_program"
stage: 12
context: "validação de dados"
test_cases:
  - input: "10"
    output: "30"
---

## Enunciado

Escreva um programa que leia um inteiro N e exiba a soma de todos os números pares de 1 a N (inclusive). Use for com range(2, N+1, 2) e acumulador, ou for com if para filtrar pares.

## Solução

```python
n = int(input())
soma = 0
for i in range(2, n + 1, 2):
    soma += i
print(soma)
```

Para N=10: 2+4+6+8+10 = 30.
