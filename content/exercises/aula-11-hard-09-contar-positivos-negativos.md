---
title: "Contar positivos, negativos e zeros em N números"
slug: "aula-11-hard-09-contar-positivos-negativos"
difficulty: "hard"
concepts: ["for", "range()", "iteração", "condicionais"]
discipline: "python"
learning_goal: "Ler N números e contar quantos são positivos, negativos e zero."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5\n1\n-2\n0\n3\n-1"
    output: "2 2 1"
---

## Enunciado

Escreva um programa que leia N (int) e depois N números (float). Exiba três contagens na mesma linha: positivos negativos zeros (números > 0, < 0 e == 0). Use for _ in range(N): e três acumuladores com if/elif/else.

## Solução

```python
n = int(input())
pos = 0
neg = 0
zero = 0
for _ in range(n):
    x = float(input())
    if x > 0:
        pos += 1
    elif x < 0:
        neg += 1
    else:
        zero += 1
print(pos, neg, zero)
```
