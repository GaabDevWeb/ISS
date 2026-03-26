---
title: Implementar função — soma com return
slug: aula-14-novo-01-implementar-função-soma-com-return
difficulty: easy
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
exercise_type: implement_function
stage: 1
context: pipeline ETL
test_cases:
- input: '1

    2

    '
  output: '3'
---

## Enunciado

Implemente `somar(x, y)` e use: leia dois inteiros e imprima o retorno.

## Solução

```python
def somar(x, y):
    """Soma dois inteiros."""
    return x + y

x = int(input())
y = int(input())
print(somar(x, y))
```
