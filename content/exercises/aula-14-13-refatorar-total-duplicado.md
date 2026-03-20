---
title: "Refatorar — extrair soma em função"
slug: "aula-14-13-refatorar-total-duplicado"
difficulty: "easy"
concepts: ["PEP 8 snake_case e funções coesas", "def e chamada de função"]
discipline: "python"
learning_goal: "Eliminar duplicação com função soma_dois."
exercise_type: "refactor"
stage: 5
context: "pipeline ETL"
expected_output: "11\n11"
---

## Enunciado

```python
a, b = 4, 7
print(a + b)
c, d = 2, 9
print(c + d)
```

## Solução

```python
def soma_dois(x, y):
    return x + y

a, b = 4, 7
print(soma_dois(a, b))
c, d = 2, 9
print(soma_dois(c, d))
```
