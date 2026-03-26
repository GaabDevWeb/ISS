---
title: Corrigir bug — NameError por ordem
slug: aula-14-novo-04-corrigir-bug-nameerror-por-ordem
difficulty: medium
concepts:
- def e chamada de função
- parâmetros formais vs argumentos
- argumentos posicionais e nomeados
- return explícito e None implícito
- docstrings, __doc__ e help()
- builtins print, input, int, float, type, len
discipline: python
learning_goal: 'Praticar: def e chamada de função, parâmetros formais vs argumentos,
  argumentos posicionais e nomeados'
exercise_type: fix_bug
stage: 4
context: scripts de automação
test_cases:
- input: ''
  output: ola
---

## Enunciado

O código gera NameError. Reordene/corrija para funcionar.

```python
print(saudacao())

def saudacao():
    return "ola"
```

## Solução

```python
def saudacao():
    return "ola"

print(saudacao())
```
