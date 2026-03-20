---
title: "HARD — Soma de matriz em código (lista de listas)"
slug: "py-hard-43-programa-soma-lista-aninhada-fixa"
difficulty: "hard"
concepts: ["listas e sequências iteráveis", "loops aninhados (linha e coluna)"]
discipline: "python"
learning_goal: "Percorrer lista de listas sem achatar."
exercise_type: "full_program"
stage: 19
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "21"
---

## Enunciado

Dado `m = [[1,2,3],[4,5,6]]` no código, imprima a soma de todos os números (não leia da entrada).

## Solução

```python
m = [[1, 2, 3], [4, 5, 6]]
s = 0
for linha in m:
    for x in linha:
        s += x
print(s)
```
