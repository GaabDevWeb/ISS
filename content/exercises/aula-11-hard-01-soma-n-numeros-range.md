---
title: "Somar N números lidos em loop com range"
slug: "aula-11-hard-01-soma-n-numeros-range"
difficulty: "hard"
concepts: ["laços for", "range()", "iteração"]
discipline: "python"
learning_goal: "Ler N e depois N números, exibir a soma usando for e range(N)."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "4\n10\n20\n30\n40"
    output: "100"
---

## Enunciado

Escreva um programa que leia um inteiro N e em seguida N números (um por linha). Calcule e exiba a soma dos N números. Use for _ in range(N): e um acumulador (soma += valor). Não use listas; leia um número por iteração.

## Solução

```python
n = int(input())
soma = 0
for _ in range(n):
    soma += float(input())
print(soma)
```
