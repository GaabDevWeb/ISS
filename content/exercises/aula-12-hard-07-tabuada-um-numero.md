---
title: "Tabuada de um número lido (1 a 10) com acumulador de saída"
slug: "aula-12-hard-07-tabuada-um-numero"
difficulty: "hard"
concepts: ["tabuada", "range", "for", "f-string"]
discipline: "python"
learning_goal: "Ler um número e exibir sua tabuada (x*1 até x*10) formatada."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "7"
    output: "7x1=7\n7x2=14\n...\n7x10=70"
---

## Enunciado

Escreva um programa que leia um número inteiro N e exiba as 10 linhas da tabuada: Nx1=..., Nx2=..., ..., Nx10=.... Use for i in range(1, 11): e print(f"{N}x{i}={N*i}").

## Solução

```python
n = int(input())
for i in range(1, 11):
    print(f"{n}x{i}={n * i}")
```
