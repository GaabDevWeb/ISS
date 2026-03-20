---
title: "Completar — return None explícito"
slug: "aula-14-21-completar-return-explicito"
difficulty: "easy"
concepts: ["return explícito e None implícito"]
discipline: "python"
learning_goal: "Completar ramo sem valor com return None."
exercise_type: "complete_the_code"
stage: 3
context: "validação de dados"
test_cases:
  - input: "-1"
    output: "None"
---

## Enunciado

```python
def raiz_real_se_positivo(x):
    if x < 0:
        ________
    return x ** 0.5

print(raiz_real_se_positivo(float(input())))
```

## Solução

```python
def raiz_real_se_positivo(x):
    if x < 0:
        return None
    return x ** 0.5

print(raiz_real_se_positivo(float(input())))
```
