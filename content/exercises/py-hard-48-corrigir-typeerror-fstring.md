---
title: "HARD — TypeError dentro de f-string"
slug: "py-hard-48-corrigir-typeerror-fstring"
difficulty: "hard"
concepts: ["TypeError por ordem ou tipo de argumentos", "f-strings"]
discipline: "python"
learning_goal: "Converter antes de interpolar."
exercise_type: "fix_bug"
stage: 19
context: "processamento de texto"
test_cases:
  - input: ""
    output: "n=5"
---

## Enunciado

Corrija:

```python
n = 5
print(f'n={n + ""}')
```

## Solução

```python
n = 5
print(f'n={n}')
```
