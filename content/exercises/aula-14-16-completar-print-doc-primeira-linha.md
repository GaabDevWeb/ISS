---
title: "Completar — exibir primeira linha da docstring"
slug: "aula-14-16-completar-print-doc-primeira-linha"
difficulty: "medium"
concepts: ["docstrings, __doc__ e help()"]
discipline: "python"
learning_goal: "Usar __doc__ e splitlines para pegar resumo."
exercise_type: "complete_the_code"
stage: 6
context: "documentação"
test_cases:
  - input: ""
    output: "Soma dois inteiros."
---

## Enunciado

```python
def soma(x, y):
    """Soma dois inteiros."""
    return x + y

print(soma.__doc__.strip().________()[0])
```

## Solução

```python
def soma(x, y):
    """Soma dois inteiros."""
    return x + y

print(soma.__doc__.strip().splitlines()[0])
```
