---
title: "Contar múltiplos de K no intervalo [1, N] com range e acumulador"
slug: "aula-12-hard-10-contagem-multiplos"
difficulty: "hard"
concepts: ["acumuladores", "range com step", "for"]
discipline: "python"
learning_goal: "Contar quantos múltiplos de K existem entre 1 e N usando range(K, N+1, K)."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "10\n3"
    output: "3"
---

## Enunciado

Escreva um programa que leia N (int) e K (int). Conte quantos múltiplos de K existem no intervalo [1, N] (ou seja, quantos números i tais que i % K == 0). Use for i in range(K, N+1, K): e um contador que incrementa a cada iteração (ou use range e len). Exiba apenas o número de múltiplos.

## Solução

```python
n = int(input())
k = int(input())
cont = 0
for i in range(k, n + 1, k):
    cont += 1
print(cont)
```
