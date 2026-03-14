---
title: "Programa — limpar entrada com strip"
slug: "aula-07-07-programa-strip-entrada"
difficulty: "medium"
concepts: ["métodos de string (strip)", "limpar textos"]
discipline: "python"
learning_goal: "Ler linha e exibir versão sem espaços nas pontas."
exercise_type: "full_program"
stage: 11
context: "validação de entrada"
test_cases:
  - input: "  ok  "
    output: "ok"
---

## Enunciado

Escreva um programa que leia uma linha e exiba o texto sem espaços no início e no fim. Use o método strip().

## Solução

```python
texto = input()
print(texto.strip())
```
