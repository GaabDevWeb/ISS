---
title: "Refatorar — tabuada de f-string para .format()"
slug: "aula-13-35-refatorar-tabuada-para-format"
difficulty: "easy"
concepts: ["tabuada com range(11)", "formatação f-string e .format() na tabuada"]
discipline: "python"
learning_goal: "Reescrever saída usando apenas str.format."
exercise_type: "refactor"
stage: 6
context: "processamento de texto"
expected_output: "3 x 0 = 0\n3 x 1 = 3\n3 x 2 = 6"
---

## Enunciado

Mesma saída, sem f-string.

```python
n = 3
for i in range(3):
    print(f'{n} x {i} = {n * i}')
```

## Solução

```python
n = 3
for i in range(3):
    print('{} x {} = {}'.format(n, i, n * i))
```
