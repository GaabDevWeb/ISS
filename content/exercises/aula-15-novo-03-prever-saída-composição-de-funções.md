---
title: Prever saída — composição de funções
slug: aula-15-novo-03-prever-saída-composição-de-funções
difficulty: medium
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
exercise_type: predict_output
stage: 3
context: processamento de texto
test_cases:
- input: ''
  output: '[OK]'
---

## Enunciado

Qual a saída?

```python
def up(s):
    return s.upper()

def wrap(s):
    return f"[{s}]"

print(wrap(up("ok")))
```

## Solução

```python
def up(s):
    return s.upper()

def wrap(s):
    return f"[{s}]"

print(wrap(up("ok")))
```
