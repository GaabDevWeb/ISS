---
title: "Programa — ETL simples: soma de duas colunas"
slug: "aula-13-27-programa-etl-soma-colunas"
difficulty: "hard"
concepts: ["acumulador", "range", "split", "float"]
discipline: "python"
learning_goal: "Ler N linhas 'valor1;valor2', somar cada coluna e exibir totais (pipeline ETL)."
exercise_type: "full_program"
stage: 16
context: "pipeline ETL"
test_cases:
  - input: "2\n10.0;20.0\n5.0;15.0"
    output: "Col1: 15.00\nCol2: 35.00"
---

## Enunciado

Escreva um programa que lê N e depois N linhas no formato "valor1;valor2". Acumule a soma da primeira coluna em um acumulador e da segunda em outro. Exiba "Col1: X.XX" e "Col2: Y.YY" com duas casas decimais.

## Solução

```python
n = int(input())
soma1 = 0
soma2 = 0
for i in range(n):
    linha = input().split(';')
    soma1 += float(linha[0])
    soma2 += float(linha[1])
print(f'Col1: {soma1:.2f}')
print(f'Col2: {soma2:.2f}')
```
