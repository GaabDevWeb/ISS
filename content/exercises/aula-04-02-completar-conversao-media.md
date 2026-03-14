---
title: "Completar conversão para cálculo de média"
slug: "aula-04-02-completar-conversao-media"
difficulty: "easy"
concepts: ["conversão de tipos", "operadores aritméticos"]
discipline: "python"
learning_goal: "Completar conversão de input para float no cálculo de média."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
test_cases:
  - input: "8.0\n6.0"
    output: "7.0"
---

## Enunciado

Complete o código para calcular e exibir a média de duas notas lidas. As entradas são strings; converta para float antes de calcular.

```python
n1 = _____(input())  # preencha: float
n2 = float(input())
media = (n1 + n2) / 2
print(media)
```

## Solução

```python
n1 = float(input())
n2 = float(input())
media = (n1 + n2) / 2
print(media)
```
