---
title: "Programa — grade de métricas (matriz 2×2)"
slug: "aula-13-25-programa-grade-metricas"
difficulty: "medium"
concepts: ["loops aninhados", "print(end=)", "formatação"]
discipline: "python"
learning_goal: "Exibir uma grade 2×2 de rótulos (i,j) como em painel de monitoramento."
exercise_type: "full_program"
stage: 12
context: "dados de monitoramento"
expected_output: "[0,0] [0,1] \n[1,0] [1,1] \n"
---

## Enunciado

Escreva um programa que imprime uma grade 2×2 no formato "[i,j]" com uma linha do console por linha da grade (simulando células de um painel de métricas). Use loops aninhados e `print(..., end=' ')` seguido de `print()`.

## Solução

```python
for i in range(2):
    for j in range(2):
        print(f'[{i},{j}]', end=' ')
    print()
```
