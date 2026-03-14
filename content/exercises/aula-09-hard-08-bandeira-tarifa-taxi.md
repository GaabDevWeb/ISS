---
title: "Tarifa de táxi por bandeira e distância"
slug: "aula-09-hard-08-bandeira-tarifa-taxi"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "regras de negócio"]
discipline: "python"
learning_goal: "Calcular valor da corrida conforme bandeira (1 ou 2) e km."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "1\n10"
    output: "46.50"
  - input: "2\n5"
    output: "29.25"
---

## Enunciado

Escreva um programa que leia a bandeira (1 ou 2) e a distância em km (float). Bandeira 1: R$ 4.50 por km. Bandeira 2: R$ 5.85 por km. Exiba o valor total com 2 decimais. Use if/elif para definir o preço por km e depois calcule total = preco * km.

## Solução

```python
bandeira = int(input())
km = float(input())
if bandeira == 1:
    preco = 4.50
else:
    preco = 5.85
total = preco * km
print(f"{total:.2f}")
```
