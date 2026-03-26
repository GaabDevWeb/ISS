---
title: Prever saída — enumerate
slug: aula-12-novo-02-prever-saída-enumerate
difficulty: easy
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
exercise_type: predict_output
stage: 2
context: pipeline ETL
test_cases:
- input: ''
  output: '0 maçã

    1 pera'
---

## Enunciado

Qual a saída?

```python
frutas = ["maçã", "pera"]
for i, f in enumerate(frutas):
    print(i, f)
```

## Solução

```python
frutas = ["maçã", "pera"]
for i, f in enumerate(frutas):
    print(i, f)
```
