---
title: "HARD — Corrigir if/elif/else"
slug: "py-hard-10-corrigir-elif-desalinhado"
difficulty: "hard"
concepts: ["if/elif/else", "blocos identados", "indentação"]
discipline: "python"
learning_goal: "Restaurar hierarquia válida."
exercise_type: "fix_bug"
stage: 18
context: "validação de dados"
test_cases:
  - input: "6.5"
    output: "B"
---

## Enunciado

Corrija para: ≥9→A, ≥7→B, ≥5→C, senão D.

```python
n = float(input())
if n >= 9:
    print('A')
elif n >= 7:
    print('B')
 elif n >= 5:
    print('C')
else:
    print('D')
```

## Solução

```python
n = float(input())
if n >= 9:
    print('A')
elif n >= 7:
    print('B')
elif n >= 5:
    print('C')
else:
    print('D')
```
