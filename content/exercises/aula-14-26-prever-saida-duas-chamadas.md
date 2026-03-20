---
title: "Prever saída — duas chamadas à mesma função"
slug: "aula-14-26-prever-saida-duas-chamadas"
difficulty: "easy"
concepts: ["def e chamada de função"]
discipline: "python"
learning_goal: "Contar efeitos de duas chamadas independentes."
exercise_type: "predict_output"
stage: 2
context: "processamento de texto"
expected_output: "2\n4"
---

## Enunciado

```python
def inc(x):
    return x + 1

print(inc(1))
print(inc(3))
```

## Solução

`inc(1)` → 2; `inc(3)` → 4.
