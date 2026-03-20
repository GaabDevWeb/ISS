---
title: "HARD — Somar inteiros em linhas chave:valor"
slug: "py-hard-33-programa-soma-campos-k-v"
difficulty: "hard"
concepts: ["split", "conversão de tipos", "acumulador (inicialização e +=)"]
discipline: "python"
learning_goal: "Parsing repetido + acumulador."
exercise_type: "full_program"
stage: 20
context: "pipeline ETL"
test_cases:
  - input: "3\na:2\nb:5\nc:1"
    output: "8"
---

## Enunciado

Leia N (inteiro), depois N linhas `chave:inteiro`. Some os inteiros. Imprima a soma.

## Solução

```python
n = int(input())
s = 0
for _ in range(n):
    _, v = input().split(':')
    s += int(v)
print(s)
```
