---
title: "Programa — validar entrada numérica com try/except"
slug: "aula-04-07-programa-validacao-numerica"
difficulty: "medium"
concepts: ["ValueError", "tratar ValueError ao validar entradas"]
discipline: "python"
learning_goal: "Ler entrada e exibir número ou mensagem de erro se inválido."
exercise_type: "full_program"
stage: 11
context: "validação de entrada"
test_cases:
  - input: "3.14"
    output: "3.14"
  - input: "abc"
    output: "Entrada inválida"
---

## Enunciado

Escreva um programa que leia uma linha. Se for um número válido (float), exiba o número; caso contrário, exiba "Entrada inválida". Use try/except ValueError.

## Solução

```python
try:
    valor = float(input())
    print(valor)
except ValueError:
    print("Entrada inválida")
```
