---
title: "HARD — MDC por subtrações repetidas"
slug: "py-hard-37-implementar-mdc-subtracoes"
difficulty: "hard"
concepts: ["while", "if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Algoritmo de Euclides sem resto de divisão."
exercise_type: "implement_function"
stage: 20
context: "automação"
test_cases:
  - input: ""
    output: "4"
---

## Enunciado

`mdc(a,b)` para inteiros positivos: enquanto a≠b, subtraia o menor do maior. Retorne a.

```python
def mdc(a, b):
    pass

print(mdc(12, 8))
```

## Solução

```python
def mdc(a, b):
    while a != b:
        if a > b:
            a -= b
        else:
            b -= a
    return a

print(mdc(12, 8))
```
