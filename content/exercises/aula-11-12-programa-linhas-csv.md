---
title: "Programa — exibir primeiros N campos de linha CSV"
slug: "aula-11-12-programa-linhas-csv"
difficulty: "medium"
concepts: ["for", "listas", "split"]
discipline: "python"
learning_goal: "Ler linha CSV, fazer split(','), exibir cada campo em uma linha."
exercise_type: "full_program"
stage: 12
context: "parsing de CSV/arquivos"
test_cases:
  - input: "a,b,c"
    output: "a\nb\nc"
---

## Enunciado

Escreva um programa que leia uma linha no formato CSV (campos separados por vírgula) e exiba cada campo em uma linha. Use split(",") para obter uma lista e for para percorrê-la.

## Solução

```python
linha = input()
campos = linha.split(",")
for c in campos:
    print(c)
```
