---
title: "Programa — tabuada em intervalo (a até b)"
slug: "aula-13-22-programa-tabuada-intervalo"
difficulty: "medium"
concepts: ["tabuada", "range(start, stop)", "formatação"]
discipline: "python"
learning_goal: "Imprimir tabuada de um número em um intervalo dado (ex.: 3 a 7) com formatação."
exercise_type: "full_program"
stage: 11
context: "processamento de dados"
test_cases:
  - input: "5\n2\n4"
    output: "5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20"
---

## Enunciado

Escreva um programa que lê um inteiro (número da tabuada), depois dois inteiros A e B (intervalo inclusivo). Exiba as linhas da tabuada de A até B no formato "numero x i = produto". Use `for i in range(A, B+1)`.

## Solução

```python
numero = int(input())
a = int(input())
b = int(input())
for i in range(a, b + 1):
    print(f'{numero} x {i} = {numero * i}')
```
