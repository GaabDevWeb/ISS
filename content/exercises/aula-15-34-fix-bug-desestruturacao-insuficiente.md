---
title: "Corrigir bug — desestruturação com variáveis insuficientes"
slug: "aula-15-34-fix-bug-desestruturacao-insuficiente"
difficulty: "medium"
concepts: ["múltiplos retornos", "tuple unpacking"]
discipline: "python"
learning_goal: "Corrigir ValueError causado por número insuficiente de variáveis no tuple unpacking."
exercise_type: "fix_bug"
stage: 3
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "Min: 80 | Max: 430 | Média: 207.0"
---

## Enunciado

O código levanta `ValueError: too many values to unpack`. Corrija **apenas** a linha de desestruturação:

```python
def estatisticas_vendas(valores: list) -> tuple:
    return min(valores), max(valores), sum(valores), round(sum(valores)/len(valores), 2)

minimo, maximo, media = estatisticas_vendas([100, 250, 80, 430, 175])
print(f"Min: {minimo} | Max: {maximo} | Média: {media}")
```

## Solução

```python
minimo, maximo, total, media = estatisticas_vendas([100, 250, 80, 430, 175])
print(f"Min: {minimo} | Max: {maximo} | Média: {media}")
```
