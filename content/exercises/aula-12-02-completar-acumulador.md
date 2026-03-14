---
title: "Completar acumulador em loop"
slug: "aula-12-02-completar-acumulador"
difficulty: "easy"
concepts: ["acumuladores", "+="]
discipline: "python"
learning_goal: "Completar atribuição composta para acumular totais."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
expected_output: "6"
---

## Enunciado

Complete o código para que total seja a soma dos valores da lista (1+2+3 = 6). Use += dentro do for.

```python
valores = [1, 2, 3]
total = 0
for v in valores:
    total _____ v  # preencha: +=
print(total)
```

## Solução

```python
valores = [1, 2, 3]
total = 0
for v in valores:
    total += v
print(total)
```
