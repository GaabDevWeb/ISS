---
title: "Estender — docstring em soma_dois_valores"
slug: "aula-14-14-estender-docstring-soma"
difficulty: "easy"
concepts: ["docstrings, __doc__ e help()"]
discipline: "python"
learning_goal: "Adicionar docstring sem mudar o comportamento."
exercise_type: "extend_code"
stage: 4
context: "documentação"
test_cases:
  - input: ""
    output: "3"
---

## Enunciado

```python
def soma_dois_valores(a, b):
    return a + b

print(soma_dois_valores(1, 2))
```

## Solução

```python
def soma_dois_valores(a, b):
    """Retorna a soma de a e b."""
    return a + b

print(soma_dois_valores(1, 2))
```
