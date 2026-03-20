---
title: "Corrigir — variável calculada mas não retornada"
slug: "aula-14-28-corrigir-esqueceu-return"
difficulty: "medium"
concepts: ["return explícito e None implícito"]
discipline: "python"
learning_goal: "Garantir return do valor útil."
exercise_type: "fix_bug"
stage: 5
context: "validação de dados"
test_cases:
  - input: ""
    output: "8"
---

## Enunciado

```python
def dobro(x):
    r = x * 2

print(dobro(4))
```

## Solução

```python
def dobro(x):
    r = x * 2
    return r

print(dobro(4))
```
