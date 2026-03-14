---
title: "Cálculo de faixas de imposto de renda simplificado"
slug: "aula-09-hard-01-faixas-imposto-renda"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "regras de negócio"]
discipline: "python"
learning_goal: "Aplicar múltiplas faixas condicionais para cálculo de IR."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "1500"
    output: "Isento"
  - input: "3500"
    output: "7.5"
  - input: "5000"
    output: "15.0"
---

## Enunciado

Escreva um programa que leia a base de cálculo (float) do IR e exiba a alíquota aplicável: "Isento" se <= 2112.00; "7.5" se <= 2826.65; "15.0" se <= 3751.05; "22.5" se <= 4664.68; senão "27.5". Use if/elif/else em cadeia. Exiba apenas o texto ou número da alíquota.

## Solução

```python
base = float(input())
if base <= 2112.00:
    print("Isento")
elif base <= 2826.65:
    print("7.5")
elif base <= 3751.05:
    print("15.0")
elif base <= 4664.68:
    print("22.5")
else:
    print("27.5")
```
