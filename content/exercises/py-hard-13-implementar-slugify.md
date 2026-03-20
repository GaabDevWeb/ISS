---
title: "HARD — slug com split e join"
slug: "py-hard-13-implementar-slugify"
difficulty: "hard"
concepts: ["split", "join", "métodos de string", "strip"]
discipline: "python"
learning_goal: "Normalizar frase para identificador com hífens."
exercise_type: "implement_function"
stage: 19
context: "API"
test_cases:
  - input: ""
    output: "ola-mundo-python"
---

## Enunciado

`slugify(t)` strip, lower, palavras separadas por um hífen.

```python
def slugify(t):
    pass

print(slugify('  Ola   Mundo PYTHON  '))
```

## Solução

```python
def slugify(t):
    return '-'.join(t.strip().lower().split())

print(slugify('  Ola   Mundo PYTHON  '))
```
