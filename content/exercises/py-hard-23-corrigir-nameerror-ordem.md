---
title: "HARD — Função usada antes da definição"
slug: "py-hard-23-corrigir-nameerror-ordem"
difficulty: "hard"
concepts: ["NameError (definição não executada no notebook)", "def e chamada de função"]
discipline: "python"
learning_goal: "Reordenar def antes da chamada."
exercise_type: "fix_bug"
stage: 19
context: "automação"
test_cases:
  - input: ""
    output: "9"
---

## Enunciado

```python
print(inc(8))

def inc(x):
    return x + 1
```

## Solução

```python
def inc(x):
    return x + 1

print(inc(8))
```
