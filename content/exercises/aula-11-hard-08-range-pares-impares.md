---
title: "Exibir números pares e ímpares em intervalos com range"
slug: "aula-11-hard-08-range-pares-impares"
difficulty: "hard"
concepts: ["range(start, stop, step)", "for"]
discipline: "python"
learning_goal: "Gerar sequências de pares (0 a 20) e ímpares (1 a 21) com range."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
expected_output: "0 2 4 ... 20\n1 3 5 ... 21"
---

## Enunciado

Escreva um programa que exiba na primeira linha os pares de 0 a 20 (0, 2, 4, ..., 20) separados por espaço, e na segunda linha os ímpares de 1 a 21 (1, 3, 5, ..., 21). Use for i in range(0, 21, 2): e for i in range(1, 22, 2): com print(..., end=" ").

## Solução

```python
for i in range(0, 21, 2):
    print(i, end=" ")
print()
for i in range(1, 22, 2):
    print(i, end=" ")
print()
```
