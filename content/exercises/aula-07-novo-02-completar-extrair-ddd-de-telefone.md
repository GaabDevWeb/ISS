---
title: Completar — extrair DDD de telefone
slug: aula-07-novo-02-completar-extrair-ddd-de-telefone
difficulty: easy
concepts:
- sequência de caracteres
- índice positivo e negativo em strings
- operador colchete []
- slicing [inicio:fim:passo]
- substrings
- métodos de string (upper, lower, swapcase, capitalize, title, replace, split, join,
  strip)
discipline: python
learning_goal: 'Praticar: sequência de caracteres, índice positivo e negativo em strings,
  operador colchete []'
exercise_type: complete_the_code
stage: 2
context: validação de dados
test_cases:
- input: '011-999999999

    '
  output: '011'
---

## Enunciado

Uma entrada tem formato `DDD-NNNNNNNNN`. Complete para imprimir apenas o DDD.

```python
telefone = input().strip()
print(telefone[_____:_____])
```

## Solução

```python
telefone = input().strip()
print(telefone[0:3])
```
