---
title: "Programa — somar N números lidos"
slug: "aula-11-07-programa-soma-numeros"
difficulty: "medium"
concepts: ["laços for", "range", "evitar código duplicado"]
discipline: "python"
learning_goal: "Ler N (ex.: 3) e depois N números e exibir a soma."
exercise_type: "full_program"
stage: 11
context: "validação de dados"
test_cases:
  - input: "3\n10\n20\n30"
    output: "60"
---

## Enunciado

Escreva um programa que leia um inteiro N e em seguida N números (um por linha). Exiba a soma dos N números. Use for e range(N).

## Solução

```python
n = int(input())
soma = 0
for _ in range(n):
    soma += int(input())
print(soma)
```
