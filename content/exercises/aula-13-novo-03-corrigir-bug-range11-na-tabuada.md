---
title: Corrigir bug — range(11) na tabuada
slug: aula-13-novo-03-corrigir-bug-range11-na-tabuada
difficulty: medium
concepts:
- teste de mesa
- acumulador (inicialização e +=)
- tabuada com range(11)
- enumerate e range(len)
- len() em coleções
- loops aninhados (linha e coluna)
discipline: python
learning_goal: 'Praticar: teste de mesa, acumulador (inicialização e +=), tabuada
  com range(11)'
exercise_type: fix_bug
stage: 3
context: scripts de automação
test_cases:
- input: ''
  output: '0

    1

    2

    3

    4

    5

    6

    7

    8

    9

    10'
---

## Enunciado

O programa deve imprimir 0..10 (11 números). Corrija.

```python
for i in range(10):
    print(i)
```

## Solução

```python
for i in range(11):
    print(i)
```
