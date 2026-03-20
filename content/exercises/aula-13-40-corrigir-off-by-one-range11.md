---
title: "Corrigir — tabuada 0..10 com range correto"
slug: "aula-13-40-corrigir-off-by-one-range11"
difficulty: "easy"
concepts: ["tabuada com range(11)"]
discipline: "python"
learning_goal: "Incluir o fator 10 com range(11)."
exercise_type: "fix_bug"
stage: 5
context: "validação de entrada"
expected_output: "2 x 0 = 0\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20"
---

## Enunciado

Corrija o `range` para ir até 10 inclusive.

```python
n = 2
for i in range(10):
    print(f'{n} x {i} = {n * i}')
```

## Solução

```python
n = 2
for i in range(11):
    print(f'{n} x {i} = {n * i}')
```
