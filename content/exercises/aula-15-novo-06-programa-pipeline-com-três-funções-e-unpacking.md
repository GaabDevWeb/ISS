---
title: Programa — pipeline com três funções e unpacking
slug: aula-15-novo-06-programa-pipeline-com-três-funções-e-unpacking
difficulty: hard
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
exercise_type: full_program
stage: 5
context: pipeline ETL
test_cases:
- input: '5

    '
  output: 2x=10 3x=15
---

## Enunciado

Crie funções: `parse(txt)->int`, `calc(x)->(dobro, triplo)` e `fmt(a,b)->str`. Leia um número, componha as funções e imprima `2x=<a> 3x=<b>`.

## Solução

```python
def parse(txt):
    return int(txt)

def calc(x):
    return x * 2, x * 3

def fmt(a, b):
    return f"2x={a} 3x={b}"

x = parse(input())
a, b = calc(x)
print(fmt(a, b))
```
