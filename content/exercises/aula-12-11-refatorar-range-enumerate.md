---
title: "Refatorar range(len) para enumerate"
slug: "aula-12-11-refatorar-range-enumerate"
difficulty: "easy"
concepts: ["enumerate", "percurso com índice"]
discipline: "python"
learning_goal: "Substituir for i in range(len(lista)) por enumerate."
exercise_type: "refactor"
stage: 6
context: "processamento de dados"
expected_output: "0-A 1-B 2-C"
---

## Enunciado

Refatore o código para usar enumerate em vez de range(len()). A saída deve continuar no formato "i-ELEMENTO" para cada posição.

```python
itens = ["A", "B", "C"]
for i in range(len(itens)):
    print(f"{i}-{itens[i]}", end=" ")
```

## Solução

```python
itens = ["A", "B", "C"]
for i, item in enumerate(itens):
    print(f"{i}-{item}", end=" ")
```
