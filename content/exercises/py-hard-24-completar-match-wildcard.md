---
title: "HARD — Completar match com case _"
slug: "py-hard-24-completar-match-wildcard"
difficulty: "hard"
concepts: ["match/case", "pattern matching estrutural"]
discipline: "python"
learning_goal: "Usar wildcard no match."
exercise_type: "complete_the_code"
stage: 20
context: "validação de dados"
test_cases:
  - input: ""
    output: "outro"
---

## Enunciado

Complete o último `case` para capturar qualquer valor não listado.

```python
def rotulo(n):
    match n:
        case 1:
            return 'um'
        case 2:
            return 'dois'
        case ____________:
            return 'outro'

print(rotulo(99))
```

## Solução

Use `case _:`.

```python
def rotulo(n):
    match n:
        case 1:
            return 'um'
        case 2:
            return 'dois'
        case _:
            return 'outro'

print(rotulo(99))
```
