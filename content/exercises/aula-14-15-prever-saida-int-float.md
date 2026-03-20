---
title: "Prever saída — int e float com strings"
slug: "aula-14-15-prever-saida-int-float"
difficulty: "easy"
concepts: ["builtins print, input, int, float, type, len"]
discipline: "python"
learning_goal: "Prever resultado de int(float(...))."
exercise_type: "predict_output"
stage: 2
context: "validação de entrada"
expected_output: "3"
---

## Enunciado

```python
print(int(float('3.9')))
```

## Solução

float('3.9') é 3.9; int trunca para `3`.
