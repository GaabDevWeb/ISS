---
title: "Prever saída — variável que muda de tipo"
slug: "aula-01-05-prever-saida-variavel-dinamica"
difficulty: "easy"
concepts: ["tipagem dinâmica e forte em Python"]
discipline: "python"
learning_goal: "Prever saída quando uma variável recebe valores de tipos diferentes."
exercise_type: "predict_output"
stage: 1
context: "configuração"
expected_output: |
  10
  True
---

## Enunciado

Qual é a saída do programa abaixo?

```python
x = 10
print(x)
x = True
print(x)
```

## Solução

A saída é:

```
10
True
```

Em Python a tipagem é dinâmica: a mesma variável pode referenciar primeiro um int e depois um bool.
