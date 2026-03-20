---
title: "HARD — Primeira linha útil da docstring"
slug: "py-hard-45-prever-docstring-linhas"
difficulty: "hard"
concepts: ["docstrings, __doc__ e help()", "métodos de string"]
discipline: "python"
learning_goal: "strip e splitlines."
exercise_type: "predict_output"
stage: 19
context: "documentação"
expected_output: "Calcula."
---

## Enunciado

```python
def f():
    """
    Calcula.
    Mais texto.
    """
    return 1

print(f.__doc__.strip().splitlines()[0])
```

## Solução

Primeira linha após strip é `Calcula.`.
