---
title: Implementar — múltiplos retornos (min, max)
slug: aula-15-novo-02-implementar-múltiplos-retornos-min-max
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
exercise_type: implement_function
stage: 2
context: pipeline ETL
test_cases:
- input: '2

    9

    1

    '
  output: menor=1 maior=9
---

## Enunciado

Leia 3 inteiros. Implemente `min_max(a,b,c)` que retorna (menor, maior). Imprima `menor=<m> maior=<M>`.

## Solução

```python
def min_max(a, b, c):
    menor = min(a, b, c)
    maior = max(a, b, c)
    return menor, maior

a = int(input())
b = int(input())
c = int(input())
menor, maior = min_max(a, b, c)
print(f"menor={menor} maior={maior}")
```
