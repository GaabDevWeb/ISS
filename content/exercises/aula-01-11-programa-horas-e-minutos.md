---
title: "Programa — converter horas de estudo em minutos"
slug: "aula-01-11-programa-horas-e-minutos"
difficulty: "medium"
concepts: ["programação como ferramenta", "tipagem dinâmica e forte em Python"]
discipline: "python"
learning_goal: "Ler quantidade de horas e exibir total de minutos (horas * 60)."
exercise_type: "full_program"
stage: 12
context: "validação de dados"
test_cases:
  - input: "2"
    output: "120"
  - input: "1"
    output: "60"
---

## Enunciado

Escreva um programa que leia um número inteiro (horas de estudo) e exiba o total de minutos (horas × 60). A saída deve ser apenas o número.

## Solução

```python
horas = int(input())
minutos = horas * 60
print(minutos)
```
