---
title: "Prever saída — precedência de operadores"
slug: "aula-04-05-prever-saida-precedencia"
difficulty: "easy"
concepts: ["precedência de operadores", "operadores aritméticos"]
discipline: "python"
learning_goal: "Prever resultado de expressão com * e + respeitando precedência."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "14"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
print(2 + 3 * 4)
```

## Solução

A saída é:

```
14
```

A multiplicação tem precedência sobre a adição: 3 * 4 = 12, depois 2 + 12 = 14.
