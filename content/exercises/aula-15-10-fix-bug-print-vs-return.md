---
title: "Corrigir bug — função usa print onde deveria usar return"
slug: "aula-15-10-fix-bug-print-vs-return"
difficulty: "medium"
concepts: ["return", "None"]
discipline: "python"
learning_goal: "Corrigir função que usa print em vez de return, impedindo reutilização do resultado."
exercise_type: "fix_bug"
stage: 3
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "Preço final: R$212.50"
---

## Enunciado

A função `calcular_desconto` usa `print` em vez de `return`, fazendo `total` ser `None`. Corrija-a:

```python
def calcular_desconto(preco, percentual=10):
    desconto = preco * (percentual / 100)
    print(preco - desconto)

preco_produto = 250.00
total = calcular_desconto(preco_produto, 15)
print(f"Preço final: R${total:.2f}")
```

## Solução

```python
def calcular_desconto(preco, percentual=10):
    desconto = preco * (percentual / 100)
    return preco - desconto

preco_produto = 250.00
total = calcular_desconto(preco_produto, 15)
print(f"Preço final: R${total:.2f}")
```
