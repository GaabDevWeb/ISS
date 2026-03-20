---
title: "HARD — Nome da classe de False"
slug: "py-hard-50-prever-type-name-bool"
difficulty: "hard"
concepts: ["builtins print, input, int, float, type, len", "tipos básicos int, float, bool, str"]
discipline: "python"
learning_goal: "Ligar type(False) ao nome `bool`."
exercise_type: "predict_output"
stage: 18
context: "validação de dados"
expected_output: "bool"
---

## Enunciado

```python
print(type(False).__name__)
```

## Solução

`type(False)` é a classe `bool`; `.__name__` retorna a string `bool`.
