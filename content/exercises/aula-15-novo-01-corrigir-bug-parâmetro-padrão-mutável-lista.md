---
title: Corrigir bug — parâmetro padrão mutável (lista)
slug: aula-15-novo-01-corrigir-bug-parâmetro-padrão-mutável-lista
difficulty: easy
concepts:
- parâmetros posicionais
- parâmetros nomeados (keyword arguments)
- parâmetros com valor padrão
- return
- None
- composição de funções
discipline: python
learning_goal: 'Praticar: parâmetros posicionais, parâmetros nomeados (keyword arguments),
  parâmetros com valor padrão'
exercise_type: fix_bug
stage: 1
context: análise de logs
test_cases:
- input: ''
  output: '[''a'']

    [''b'']'
---

## Enunciado

Corrija o bug de parâmetro padrão mutável.

## Solução

```python
def add_evento(msg, hist=None):
    if hist is None:
        hist = []
    hist.append(msg)
    return hist

print(add_evento("a"))
print(add_evento("b"))
```
