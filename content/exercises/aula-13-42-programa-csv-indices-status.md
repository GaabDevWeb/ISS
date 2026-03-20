---
title: "Programa — listar códigos HTTP com índice"
slug: "aula-13-42-programa-csv-indices-status"
difficulty: "hard"
concepts: ["enumerate e range(len)", "len() em coleções", "formatação f-string e .format() na tabuada"]
discipline: "python"
learning_goal: "split de linha + enumerate para relatório de monitoramento."
exercise_type: "full_program"
stage: 14
context: "dados de monitoramento"
test_cases:
  - input: "200 404 500"
    output: "0: 200\n1: 404\n2: 500"
---

## Enunciado

Leia uma linha com códigos separados por espaço; imprima `índice: código` (0-based), um por linha, com `enumerate`.

## Solução

```python
linha = input()
for i, c in enumerate(linha.split()):
    print(f'{i}: {c}')
```
