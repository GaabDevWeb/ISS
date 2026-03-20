---
title: "HARD — Entrelaçar duas strings igual comprimento"
slug: "py-hard-47-implementar-intercalar-strings"
difficulty: "hard"
concepts: ["concatenação de strings", "laços for e range em Python"]
discipline: "python"
learning_goal: "Índice paralelo."
exercise_type: "implement_function"
stage: 19
context: "processamento de texto"
test_cases:
  - input: ""
    output: "a1b2c3"
---

## Enunciado

`intercalar(a,b)` com len(a)==len(b). Imprima `intercalar('abc','123')`.

```python
def intercalar(a, b):
    pass

print(intercalar('abc', '123'))
```

## Solução

```python
def intercalar(a, b):
    t = ''
    for i in range(len(a)):
        t += a[i] + b[i]
    return t

print(intercalar('abc', '123'))
```
