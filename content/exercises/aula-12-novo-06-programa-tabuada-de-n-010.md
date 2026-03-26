---
title: Programa — tabuada de N (0..10)
slug: aula-12-novo-06-programa-tabuada-de-n-010
difficulty: hard
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
exercise_type: full_program
stage: 5
context: scripts de automação
test_cases:
- input: '2

    '
  output: '2 x 0 = 0

    2 x 1 = 2

    2 x 2 = 4

    2 x 3 = 6

    2 x 4 = 8

    2 x 5 = 10

    2 x 6 = 12

    2 x 7 = 14

    2 x 8 = 16

    2 x 9 = 18

    2 x 10 = 20'
---

## Enunciado

Leia um inteiro `n` e imprima `n x i = resultado` para i=0..10.

## Solução

```python
n = int(input())
for i in range(11):
    print(f"{n} x {i} = {n * i}")
```
