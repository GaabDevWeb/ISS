---
title: Completar — range(start, stop, step)
slug: aula-12-novo-03-completar-rangestart-stop-step
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
exercise_type: complete_the_code
stage: 3
context: scripts de automação
test_cases:
- input: ''
  output: '2

    4

    6'
---

## Enunciado

Complete para imprimir `2 4 6` (cada um em nova linha).

```python
for i in range(2, 8, ____):
    print(i)
```

## Solução

```python
for i in range(2, 8, 2):
    print(i)
```
