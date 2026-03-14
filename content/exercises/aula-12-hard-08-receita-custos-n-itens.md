---
title: "Receita e custos de N itens (acumuladores)"
slug: "aula-12-hard-08-receita-custos-n-itens"
difficulty: "hard"
concepts: ["acumuladores", "+=", "for", "range"]
discipline: "python"
learning_goal: "Ler N pares (preço, custo) e exibir receita total e custo total."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "2\n10\n4\n20\n8"
    output: "30 12"
---

## Enunciado

Escreva um programa que leia N (int) e depois N pares: preço de venda (float) e custo (float). Acumule a soma dos preços em receita e a soma dos custos em custo_total. Exiba "receita custo_total" na mesma linha.

## Solução

```python
n = int(input())
receita = 0
custo_total = 0
for _ in range(n):
    preco = float(input())
    custo = float(input())
    receita += preco
    custo_total += custo
print(receita, custo_total)
```
