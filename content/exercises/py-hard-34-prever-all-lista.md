---
title: "HARD — Valor de all([...])"
slug: "py-hard-34-prever-all-lista"
difficulty: "hard"
concepts: ["operadores lógicos and, or, not", "truthy e falsy em Python"]
discipline: "python"
learning_goal: "all com pelo menos um False."
exercise_type: "predict_output"
stage: 18
context: "validação de dados"
expected_output: "False"
---

## Enunciado

```python
print(all([True, 1, 'x', False]))
```

## Solução

`False` na lista → `all` é `False`.
