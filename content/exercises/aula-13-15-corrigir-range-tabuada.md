---
title: "Corrigir — range da tabuada (0 a 10)"
slug: "aula-13-15-corrigir-range-tabuada"
difficulty: "easy"
concepts: ["tabuada", "range(11)"]
discipline: "python"
learning_goal: "Corrigir range para incluir 10 na tabuada (range(11))."
exercise_type: "fix_bug"
stage: 4
context: "processamento de dados"
expected_output: "5 x 10 = 50"
---

## Enunciado

O código deveria exibir a tabuada do 5 de 0 a 10 (incluindo 5×10=50). O bug é que está usando `range(10)`, que gera 0..9. Corrija para `range(11)`.

```python
n = 5
for i in range(10):
    print(f'{n} x {i} = {n * i}')
```

## Solução

```python
n = 5
for i in range(11):
    print(f'{n} x {i} = {n * i}')
```

Assim a última linha impressa é "5 x 10 = 50".
