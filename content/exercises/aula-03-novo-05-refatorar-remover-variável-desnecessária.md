---
title: Refatorar — remover variável desnecessária
slug: aula-03-novo-05-refatorar-remover-variável-desnecessária
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
exercise_type: refactor
stage: 4
context: scripts de automação
test_cases:
- input: ''
  output: <class 'float'>
---

## Enunciado

Refatore para imprimir diretamente o resultado de `type()`.

## Solução

```python
valor = 3.14
print(type(valor))
```
