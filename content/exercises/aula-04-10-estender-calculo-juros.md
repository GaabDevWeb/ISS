---
title: "Estender cálculo com juros (multiplicação e soma)"
slug: "aula-04-10-estender-calculo-juros"
difficulty: "medium"
concepts: ["operadores aritméticos", "precedência"]
discipline: "python"
learning_goal: "Estender código para calcular valor com juros (capital * (1 + taxa))."
exercise_type: "extend_code"
stage: 7
context: "validação de dados"
test_cases:
  - input: "100\n0.1"
    output: "110.0"
---

## Enunciado

O código abaixo lê o capital. Estenda-o para ler também a taxa (float) e exibir o montante: capital * (1 + taxa). Ex.: capital 100 e taxa 0.1 → 110.0.

```python
capital = float(input())
# leia taxa e exiba capital * (1 + taxa)
```

## Solução

```python
capital = float(input())
taxa = float(input())
montante = capital * (1 + taxa)
print(montante)
```
