---
title: Implementar — pseudocódigo em Python (soma)
slug: aula-02-novo-04-implementar-pseudocódigo-em-python-soma
difficulty: medium
concepts:
- algoritmos
- pensamento computacional
- linguagem de programação Python
- notebooks e IDE
- Deepnote
discipline: python
learning_goal: 'Praticar: algoritmos, pensamento computacional, linguagem de programação
  Python'
exercise_type: implement_function
stage: 4
context: scripts de automação
test_cases:
- input: '10

    -3

    '
  output: '7'
---

## Enunciado

Implemente `somar(a, b)` e use-a: leia dois inteiros e imprima a soma.

## Solução

```python
def somar(a, b):
    return a + b

a = int(input())
b = int(input())
print(somar(a, b))
```
