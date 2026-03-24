---
title: "Estender — adicionar retorno de estatísticas à função existente"
slug: "aula-15-12-estender-estatisticas-multiplos-retornos"
difficulty: "medium"
concepts: ["múltiplos retornos", "tuple unpacking"]
discipline: "python"
learning_goal: "Estender função existente para retornar múltiplos valores e usar tuple unpacking."
exercise_type: "extend_code"
stage: 3
context: "dados de monitoramento"
test_cases:
  - input: ""
    output: "Total: 360\nMín: 55 | Máx: 92 | Média: 72.0"
---

## Enunciado

A função abaixo só retorna a soma. **Estenda-a** para retornar também mínimo, máximo e média (arredondada em 2 casas), e use tuple unpacking:

```python
def analisar_metricas(valores):
    return sum(valores)

total, minimo, maximo, media = analisar_metricas([80, 55, 92, 70, 63])
print(f"Total: {total}")
print(f"Mín: {minimo} | Máx: {maximo} | Média: {media}")
```

## Solução

```python
def analisar_metricas(valores):
    return sum(valores), min(valores), max(valores), round(sum(valores) / len(valores), 2)

total, minimo, maximo, media = analisar_metricas([80, 55, 92, 70, 63])
print(f"Total: {total}")
print(f"Mín: {minimo} | Máx: {maximo} | Média: {media}")
```
