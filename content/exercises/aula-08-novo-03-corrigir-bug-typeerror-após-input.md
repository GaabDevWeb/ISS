---
title: Corrigir bug — TypeError após input()
slug: aula-08-novo-03-corrigir-bug-typeerror-após-input
difficulty: medium
concepts:
- interpolação de strings
- operador % para formatação
- método format() de str
- f-strings
- input()
- conversão de tipos após input
discipline: python
learning_goal: 'Praticar: interpolação de strings, operador % para formatação, método
  format() de str'
exercise_type: fix_bug
stage: 3
context: validação de entrada
test_cases:
- input: '4

    '
  output: '8'
---

## Enunciado

O programa deve ler um inteiro e imprimir o dobro. Corrija.

```python
x = input()
print(x * 2)
```

## Solução

```python
x = int(input())
print(x * 2)
```
