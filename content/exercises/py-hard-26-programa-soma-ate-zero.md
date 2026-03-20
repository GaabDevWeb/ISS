---
title: "HARD — Somar positivos até linha 0"
slug: "py-hard-26-programa-soma-ate-zero"
difficulty: "hard"
concepts: ["laços for e range em Python", "if/elif/else", "conversão de tipos"]
discipline: "python"
learning_goal: "Loop com condição de parada e filtro."
exercise_type: "full_program"
stage: 20
context: "validação de entrada"
test_cases:
  - input: "5\n-1\n3\n0"
    output: "8"
---

## Enunciado

Leia inteiros um por linha até ler `0`. Some apenas os **estritamente positivos**. Imprima a soma.

## Solução

```python
s = 0
while True:
    n = int(input())
    if n == 0:
        break
    if n > 0:
        s += n
print(s)
```
