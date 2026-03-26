---
title: Refatorar — gerar matriz 2D em texto
slug: aula-13-novo-05-refatorar-gerar-matriz-2d-em-texto
difficulty: medium
concepts:
- teste de mesa
- acumulador (inicialização e +=)
- tabuada com range(11)
- enumerate e range(len)
- len() em coleções
- loops aninhados (linha e coluna)
discipline: python
learning_goal: 'Praticar: teste de mesa, acumulador (inicialização e +=), tabuada
  com range(11)'
exercise_type: refactor
stage: 4
context: pipeline ETL
test_cases:
- input: ''
  output: '(0,0)

    (0,1)

    (1,0)

    (1,1)'
---

## Enunciado

Imprima coordenadas (i,j) para i=0..1 e j=0..1, uma por linha.

## Solução

```python
for i in range(2):
    for j in range(2):
        print(f"({i},{j})")
```
