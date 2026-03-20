---
title: "HARD — Soma dos quadrados de 1 a N"
slug: "py-hard-40-programa-soma-quadrados"
difficulty: "hard"
concepts: ["laços for e range em Python", "acumulador (inicialização e +=)"]
discipline: "python"
learning_goal: "range(1, n+1) e potência."
exercise_type: "full_program"
stage: 19
context: "validação de dados"
test_cases:
  - input: "3"
    output: "14"
---

## Enunciado

Leia N≥1. Imprima 1²+2²+…+N².

## Solução

```python
n = int(input())
s = 0
for i in range(1, n + 1):
    s += i ** 2
print(s)
```
