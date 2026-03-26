---
title: Completar — parâmetro com valor padrão
slug: aula-15-novo-04-completar-parâmetro-com-valor-padrão
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
exercise_type: complete_the_code
stage: 4
context: análise de logs
test_cases:
- input: ''
  output: 'INFO: subiu'
---

## Enunciado

Complete para que a função retorne `INFO: msg` quando `nivel` não for passado.

```python
def log(msg, nivel=_____):
    return f"{nivel}: {msg}"

print(log("subiu"))
```

## Solução

```python
def log(msg, nivel="INFO"):
    return f"{nivel}: {msg}"

print(log("subiu"))
```
