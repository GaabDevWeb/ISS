---
title: "HARD — Comparação encadeada"
slug: "py-hard-31-prever-comparacao-encadeada"
difficulty: "hard"
concepts: ["operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Avaliar `a < b < c`."
exercise_type: "predict_output"
stage: 19
context: "validação de dados"
expected_output: "False"
---

## Enunciado

```python
print(1 < 3 < 2)
```

## Solução

Equivale a `1 < 3 and 3 < 2` → `True and False` → `False`.
