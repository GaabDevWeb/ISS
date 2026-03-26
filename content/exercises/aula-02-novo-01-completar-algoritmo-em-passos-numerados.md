---
title: Completar — algoritmo em passos numerados
slug: aula-02-novo-01-completar-algoritmo-em-passos-numerados
difficulty: easy
concepts:
- algoritmos
- pensamento computacional
- linguagem de programação Python
- notebooks e IDE
- Deepnote
discipline: python
learning_goal: 'Praticar: algoritmos, pensamento computacional, linguagem de programação
  Python'
exercise_type: complete_the_code
stage: 1
context: scripts de automação
test_cases:
- input: ''
  output: '1. moer

    2. ferver

    3. coar'
---

## Enunciado

Complete para imprimir os passos 1 a 3, um por linha.

```python
passos = ["moer", "ferver", "coar"]
for i, p in enumerate(passos, start=1):
    print(______________)
```

## Solução

```python
passos = ["moer", "ferver", "coar"]
for i, p in enumerate(passos, start=1):
    print(f"{i}. {p}")
```
