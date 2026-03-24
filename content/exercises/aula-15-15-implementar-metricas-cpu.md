---
title: "Implementar — analisar lote de métricas de CPU"
slug: "aula-15-15-implementar-metricas-cpu"
difficulty: "medium"
concepts: ["múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão"]
discipline: "python"
learning_goal: "Implementar função que retorna múltiplos valores estatísticos e aplicar tuple unpacking."
exercise_type: "implement_function"
stage: 4
context: "dados de monitoramento"
test_cases:
  - input: ""
    output: "Média: 78.96%\nLeituras críticas: 3\nAlerta: False"
---

## Enunciado

Implemente `analisar_cpu(leituras, limite=80.0)` que retorna `(media, acima, alerta)`:

```python
def analisar_cpu(leituras: list, limite: float = 80.0):
    pass

media, acima, alerta = analisar_cpu([70.0, 85.5, 91.0, 60.0, 88.3])
print(f"Média: {media}%")
print(f"Leituras críticas: {acima}")
print(f"Alerta: {alerta}")
```

## Solução

```python
def analisar_cpu(leituras: list, limite: float = 80.0):
    media = round(sum(leituras) / len(leituras), 2)
    acima = sum(1 for v in leituras if v > limite)
    alerta = media > limite
    return media, acima, alerta
```
