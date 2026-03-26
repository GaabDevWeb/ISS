---
title: Refatorar — trocar espaços por hífen
slug: aula-07-novo-05-refatorar-trocar-espaços-por-hífen
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
exercise_type: refactor
stage: 4
context: processamento de texto
test_cases:
- input: 'oi mundo

    '
  output: oi-mundo
---

## Enunciado

Refatore para usar `replace()` e imprimir a versão com `-`.

## Solução

```python
texto = input().strip()
print(texto.replace(" ", "-"))
```
