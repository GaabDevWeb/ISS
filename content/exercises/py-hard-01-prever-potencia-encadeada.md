---
title: "HARD — Valor de 2**3**2"
slug: "py-hard-01-prever-potencia-encadeada"
difficulty: "hard"
concepts: ["precedência de operadores", "operadores aritméticos"]
discipline: "python"
learning_goal: "Aplicar associatividade à direita de **."
exercise_type: "predict_output"
stage: 20
context: "validação de dados"
expected_output: "512"
---

## Enunciado

Qual número é impresso?

```python
print(2 ** 3 ** 2)
```

## Solução

`**` associa à direita: `3**2=9`, depois `2**9=512`.
