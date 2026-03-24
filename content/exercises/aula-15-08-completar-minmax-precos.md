---
title: "Completar — função min/max de preços"
slug: "aula-15-08-completar-minmax-precos"
difficulty: "easy"
concepts: ["múltiplos retornos", "tuple unpacking"]
discipline: "python"
learning_goal: "Completar função que retorna múltiplos valores e desestruturá-los com unpacking."
exercise_type: "complete_the_code"
stage: 2
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "Menor: R$12.00\nMaior: R$99.99"
---

## Enunciado

Complete as lacunas para que a função retorne o menor e o maior preço:

```python
def faixa_precos(lista):
    return ___(lista), ___(lista)

menor, ___ = faixa_precos([49.90, 12.00, 99.99, 34.50])
print(f"Menor: R${menor:.2f}")
print(f"Maior: R${maior:.2f}")
```

## Solução

```python
def faixa_precos(lista):
    return min(lista), max(lista)

menor, maior = faixa_precos([49.90, 12.00, 99.99, 34.50])
print(f"Menor: R${menor:.2f}")
print(f"Maior: R${maior:.2f}")
```
