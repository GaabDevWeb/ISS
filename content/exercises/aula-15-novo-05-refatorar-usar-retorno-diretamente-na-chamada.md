---
title: Refatorar — usar retorno diretamente na chamada
slug: aula-15-novo-05-refatorar-usar-retorno-diretamente-na-chamada
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
exercise_type: refactor
stage: 4
context: pipeline ETL
test_cases:
- input: '4

    '
  output: '16'
---

## Enunciado

Refatore para não usar variável intermediária: leia um inteiro e imprima o quadrado.

## Solução

```python
def quad(x):
    return x * x

n = int(input())
print(quad(n))
```
