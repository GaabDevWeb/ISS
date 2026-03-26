---
title: Corrigir bug — keyword como variável
slug: aula-03-novo-03-corrigir-bug-keyword-como-variável
difficulty: medium
concepts:
- variáveis em Python
- tipos básicos int, float, bool, str
- atribuição e case sensitive
- palavras reservadas (keywords)
- comentários e docstrings
- funções built-in type, help, dir
discipline: python
learning_goal: 'Praticar: variáveis em Python, tipos básicos int, float, bool, str,
  atribuição e case sensitive'
exercise_type: fix_bug
stage: 3
context: scripts de automação
test_cases:
- input: ''
  output: '3'
---

## Enunciado

O código não roda por usar palavra reservada. Corrija.

```python
class = 3
print(class)
```

## Solução

```python
classe = 3
print(classe)
```
