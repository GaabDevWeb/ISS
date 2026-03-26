---
title: Corrigir bug — passo fora de ordem
slug: aula-02-novo-03-corrigir-bug-passo-fora-de-ordem
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
exercise_type: fix_bug
stage: 3
context: scripts de automação
test_cases:
- input: ''
  output: '1

    2

    3'
---

## Enunciado

O programa deveria imprimir `1, 2, 3` (um por linha), mas não imprime. Corrija.

```python
for i in range(1, 3):
    print(i)
```

## Solução

```python
for i in range(1, 4):
    print(i)
```
