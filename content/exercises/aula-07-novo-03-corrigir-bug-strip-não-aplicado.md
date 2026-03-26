---
title: Corrigir bug — strip não aplicado
slug: aula-07-novo-03-corrigir-bug-strip-não-aplicado
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
exercise_type: fix_bug
stage: 3
context: processamento de texto
test_cases:
- input: " ok \n"
  output: SIM
---

## Enunciado

O objetivo é remover espaços das extremidades antes de comparar. Corrija.

```python
s = input()
if s == "ok":
    print("SIM")
else:
    print("NAO")
```

## Solução

```python
s = input().strip()
if s == "ok":
    print("SIM")
else:
    print("NAO")
```
