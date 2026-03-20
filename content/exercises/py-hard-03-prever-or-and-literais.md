---
title: "HARD — or / and com valores imediatos"
slug: "py-hard-03-prever-or-and-literais"
difficulty: "hard"
concepts: ["operadores lógicos and, or, not", "truthy e falsy em Python"]
discipline: "python"
learning_goal: "Prever resultado sem executar."
exercise_type: "predict_output"
stage: 19
context: "processamento de texto"
expected_output: "7"
---

## Enunciado

```python
print(0 or 0 or 7)
```

## Solução

Encadeamento `or`: para no primeiro truthy; os zeros são falsy; `7` é truthy → imprime `7`.
