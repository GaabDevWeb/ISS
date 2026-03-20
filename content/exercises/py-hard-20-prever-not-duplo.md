---
title: "HARD — not aplicado duas vezes"
slug: "py-hard-20-prever-not-duplo"
difficulty: "hard"
concepts: ["operadores lógicos and, or, not", "booleanos"]
discipline: "python"
learning_goal: "Negar valores booleanos."
exercise_type: "predict_output"
stage: 18
context: "processamento de texto"
expected_output: "False"
---

## Enunciado

```python
print(not not [])
```

## Solução

`[]` é falsy → `not []` é `True` → `not True` é `False`.
