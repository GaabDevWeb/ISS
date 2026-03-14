---
title: "Categoria e alerta de estoque por faixas"
slug: "aula-09-hard-10-categoria-produto-estoque"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "modelar regras de negócio"]
discipline: "python"
learning_goal: "Classificar produto por preço e exibir alerta por quantidade em estoque."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "50\n5"
    output: "medio\nALERTA"
  - input: "200\n50"
    output: "premium\nOK"
---

## Enunciado

Escreva um programa que leia preço (float) e quantidade em estoque (int). Exiba na primeira linha a categoria do preço: "economico" se < 50; "medio" se < 150; "premium" caso contrário. Na segunda linha exiba "ALERTA" se quantidade < 10, senão "OK". Use dois conjuntos de if/elif/else (ou um if/elif/else que imprime duas linhas).

## Solução

```python
preco = float(input())
qtd = int(input())
if preco < 50:
    print("economico")
elif preco < 150:
    print("medio")
else:
    print("premium")
if qtd < 10:
    print("ALERTA")
else:
    print("OK")
```
