---
title: "Programa — soma de coluna numérica (CSV mental)"
slug: "aula-13-17-programa-soma-coluna-csv"
difficulty: "medium"
concepts: ["acumulador", "range", "split", "float"]
discipline: "python"
learning_goal: "Ler N linhas no formato 'nome;valor', extrair valor e acumular a soma."
exercise_type: "full_program"
stage: 7
context: "parsing de CSV/arquivos"
test_cases:
  - input: "3\nitem1;10.5\nitem2;20.0\nitem3;9.5"
    output: "Total: 40.00"
---

## Enunciado

Escreva um programa que lê um inteiro N e depois N linhas no formato "nome;valor" (nome sem ponto-e-vírgula). Extraia o valor (segundo campo), converta para float, acumule em uma soma e exiba "Total: X.XX" com duas casas decimais.

## Solução

```python
n = int(input())
soma = 0
for i in range(n):
    linha = input()
    partes = linha.split(';')
    valor = float(partes[1])
    soma += valor
print(f'Total: {soma:.2f}')
```
