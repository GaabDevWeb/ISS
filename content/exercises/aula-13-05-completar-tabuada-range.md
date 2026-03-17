---
title: "Completar — tabuada com range(11)"
slug: "aula-13-05-completar-tabuada-range"
difficulty: "easy"
concepts: ["tabuada", "range", "formatação"]
discipline: "python"
learning_goal: "Completar o loop da tabuada de 0 a 10 usando range(11) e f-string."
exercise_type: "complete_the_code"
stage: 2
context: "processamento de dados"
expected_output: "7 x 0 = 0\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70"
---

## Enunciado

Complete o código para exibir a tabuada do número 7 de 0 a 10 (uma linha por produto). Use `for i in range(11)` e uma f-string no formato `7 x i = resultado`.

```python
numero = 7
# Complete: for i in range(...): print(f'...')
```

## Solução

```python
numero = 7
for i in range(11):
    print(f'{numero} x {i} = {numero * i}')
```
