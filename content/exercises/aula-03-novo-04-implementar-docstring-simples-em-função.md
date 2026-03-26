---
title: Implementar — docstring simples em função
slug: aula-03-novo-04-implementar-docstring-simples-em-função
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
exercise_type: implement_function
stage: 4
context: configuração
test_cases:
- input: ''
  output: ok
---

## Enunciado

Implemente `identidade()` que retorna a string `ok`. A função deve ter docstring.

## Solução

```python
def identidade():
    """Retorna um texto fixo para teste."""
    return "ok"

print(identidade())
```
