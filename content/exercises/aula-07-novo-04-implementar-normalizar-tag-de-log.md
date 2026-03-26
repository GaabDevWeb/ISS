---
title: Implementar — normalizar tag de log
slug: aula-07-novo-04-implementar-normalizar-tag-de-log
difficulty: medium
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
exercise_type: implement_function
stage: 4
context: análise de logs
test_cases:
- input: " warn \n"
  output: WARN
---

## Enunciado

Leia uma tag (str) e imprima em maiúsculas sem espaços nas pontas.

## Solução

```python
tag = input().strip().upper()
print(tag)
```
