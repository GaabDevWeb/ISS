---
title: "HARD — Rotação à esquerda k posições"
slug: "py-hard-41-implementar-rotacao-esquerda"
difficulty: "hard"
concepts: ["slicing [inicio:fim:passo]", "operador % em índices"]
discipline: "python"
learning_goal: "Fatia + concatenação com k mod len."
exercise_type: "implement_function"
stage: 20
context: "processamento de texto"
test_cases:
  - input: ""
    output: "cdeab"
---

## Enunciado

`rot_left(s, k)` string não vazia, k≥0: rotação cíclica à esquerda.

```python
def rot_left(s, k):
    pass

print(rot_left('abcde', 2))
```

## Solução

```python
def rot_left(s, k):
    k = k % len(s)
    return s[k:] + s[:k]

print(rot_left('abcde', 2))
```
