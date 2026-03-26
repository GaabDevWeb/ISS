---
title: Programa — validar tipo de payload (bool)
slug: aula-03-novo-06-programa-validar-tipo-de-payload-bool
difficulty: hard
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
exercise_type: full_program
stage: 5
context: API
test_cases:
- input: 'true

    '
  output: 'True'
- input: 'True

    '
  output: 'False'
---

## Enunciado

Leia uma string. Imprima `True` se ela for exatamente `true` (minúsculo), senão `False`.

## Solução

```python
s = input().strip()
print(s == "true")
```
