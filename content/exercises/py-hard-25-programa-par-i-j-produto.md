---
title: "HARD — Primeiro par (i,j) com produto alvo"
slug: "py-hard-25-programa-par-i-j-produto"
difficulty: "hard"
concepts: ["loops aninhados (linha e coluna)", "operadores relacionais"]
discipline: "python"
learning_goal: "Parar na primeira solução com flag."
exercise_type: "full_program"
stage: 20
context: "automação"
test_cases:
  - input: "12\n1\n10"
    output: "3 4"
---

## Enunciado

Leia alvo T, depois A e B (inteiros). Encontre o primeiro par (i,j) com A≤i,j≤B e i*j==T. Imprima `i` e `j` separados por espaço. Garanta que existe solução.

## Solução

```python
t = int(input())
a = int(input())
b = int(input())
for i in range(a, b + 1):
    for j in range(a, b + 1):
        if i * j == t:
            print(i, j)
            raise SystemExit
```
