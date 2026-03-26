---
title: Corrigir bug — loops aninhados (matriz 2x2)
slug: aula-12-novo-04-corrigir-bug-loops-aninhados-matriz-2x2
difficulty: medium
concepts:
- range (stop, start/stop, start/stop/step)
- acumuladores
- operadores de atribuição composta (+=)
- tabuada
- enumerate
- loops aninhados
discipline: python
learning_goal: 'Praticar: range (stop, start/stop, start/stop/step), acumuladores,
  operadores de atribuição composta (+=)'
exercise_type: fix_bug
stage: 4
context: pipeline ETL
test_cases:
- input: ''
  output: '0 0

    0 1

    1 0

    1 1'
---

## Enunciado

O objetivo é imprimir pares (i,j) para i=0..1 e j=0..1. Corrija.

```python
for i in range(2):
    for j in range(2):
        print(i, j)
    print(i, j)
```

## Solução

```python
for i in range(2):
    for j in range(2):
        print(i, j)
```
