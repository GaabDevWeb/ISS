---
title: "Desconto por faixas de valor de compra"
slug: "aula-09-hard-04-desconto-faixas-compra"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Calcular valor final com desconto conforme faixa de compra."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "100"
    output: "100.00"
  - input: "250"
    output: "237.50"
  - input: "600"
    output: "510.00"
---

## Enunciado

Escreva um programa que leia o valor da compra (float). Aplique desconto: 0% se < 200; 5% se < 500; 15% se >= 500. Exiba o valor final com 2 decimais. Use if/elif/else para definir a taxa (0, 0.05 ou 0.15) e depois calcule final = valor * (1 - taxa).

## Solução

```python
valor = float(input())
if valor < 200:
    taxa = 0
elif valor < 500:
    taxa = 0.05
else:
    taxa = 0.15
final = valor * (1 - taxa)
print(f"{final:.2f}")
```
