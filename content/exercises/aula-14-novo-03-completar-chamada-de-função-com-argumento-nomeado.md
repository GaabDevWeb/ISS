---
title: Completar — chamada de função com argumento nomeado
slug: aula-14-novo-03-completar-chamada-de-função-com-argumento-nomeado
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
exercise_type: complete_the_code
stage: 3
context: API
test_cases:
- input: ''
  output: Ana
---

## Enunciado

Complete para chamar a função com argumento nomeado e imprimir `Ana`.

```python
def nomear(nome):
    return nome

print(nomear(__________))
```

## Solução

```python
def nomear(nome):
    return nome

print(nomear(nome="Ana"))
```
