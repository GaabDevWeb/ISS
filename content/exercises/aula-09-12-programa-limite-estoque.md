---
title: "Programa — alerta de estoque mínimo"
slug: "aula-09-12-programa-limite-estoque"
difficulty: "medium"
concepts: ["if/elif/else", "operadores relacionais", "regras de negócio"]
discipline: "python"
learning_goal: "Ler quantidade em estoque e exibir alerta se abaixo do mínimo."
exercise_type: "full_program"
stage: 12
context: "validação de dados"
test_cases:
  - input: "5"
    output: "ALERTA: estoque baixo"
  - input: "20"
    output: "OK"
---

## Enunciado

Escreva um programa que leia a quantidade em estoque (int). Se for menor que 10, exiba "ALERTA: estoque baixo"; caso contrário, "OK". Use if/else.

## Solução

```python
qtd = int(input())
if qtd < 10:
    print("ALERTA: estoque baixo")
else:
    print("OK")
```
