---
title: "Refatorar — média com função auxiliar"
slug: "aula-14-24-refatorar-media-inline"
difficulty: "medium"
concepts: ["PEP 8 snake_case e funções coesas", "parâmetros formais vs argumentos"]
discipline: "python"
learning_goal: "Extrair cálculo de média para função reutilizável."
exercise_type: "refactor"
stage: 7
context: "pipeline ETL"
expected_output: "15.0\n15.0"
---

## Enunciado

```python
a, b = 10, 20
print((a + b) / 2)
x, y = 12, 18
print((x + y) / 2)
```

## Solução

```python
def media_dois(p, q):
    return (p + q) / 2

a, b = 10, 20
print(media_dois(a, b))
x, y = 12, 18
print(media_dois(x, y))
```
