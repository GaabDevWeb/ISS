---
title: Implementar — acumulador de soma (5 leituras)
slug: aula-12-novo-01-implementar-acumulador-de-soma-5-leituras
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
exercise_type: implement_function
stage: 1
context: validação de entrada
test_cases:
- input: '1

    2

    3

    4

    5

    '
  output: '15'
---

## Enunciado

Leia 5 inteiros (um por linha) e imprima a soma.

## Solução

```python
soma = 0
for _ in range(5):
    soma += int(input())
print(soma)
```
