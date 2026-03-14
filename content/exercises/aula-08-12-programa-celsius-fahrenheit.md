---
title: "Programa — converter Fahrenheit para Celsius com input"
slug: "aula-08-12-programa-celsius-fahrenheit"
difficulty: "medium"
concepts: ["input()", "conversão de tipos", "f-strings", ":.2f"]
discipline: "python"
learning_goal: "Ler temperatura em F, converter para C e exibir com duas decimais."
exercise_type: "full_program"
stage: 12
context: "validação de entrada"
test_cases:
  - input: "32"
    output: "0.00"
  - input: "212"
    output: "100.00"
---

## Enunciado

Escreva um programa que leia um número (temperatura em Fahrenheit), converta para Celsius com C = (F - 32) * 5/9 e exiba o resultado com duas casas decimais (:.2f).

## Solução

```python
f = float(input())
c = (f - 32) * 5 / 9
print(f"{c:.2f}")
```
