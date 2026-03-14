---
title: "Classificação etária para API (criança, adolescente, adulto, idoso)"
slug: "aula-09-hard-02-classificacao-etaria-api"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Implementar múltiplas faixas de idade com mensagens distintas."
exercise_type: "full_program"
stage: 16
context: "API"
test_cases:
  - input: "10"
    output: "criança"
  - input: "16"
    output: "adolescente"
  - input: "30"
    output: "adulto"
  - input: "70"
    output: "idoso"
---

## Enunciado

Escreva um programa que leia a idade (int) e exiba a classificação: "criança" se < 12; "adolescente" se < 18; "adulto" se < 60; "idoso" caso contrário. Use if/elif/else. Exiba apenas uma palavra em minúsculas.

## Solução

```python
idade = int(input())
if idade < 12:
    print("criança")
elif idade < 18:
    print("adolescente")
elif idade < 60:
    print("adulto")
else:
    print("idoso")
```
