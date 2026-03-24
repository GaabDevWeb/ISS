---
title: "Estender — adicionar estatísticas de tempo de resposta de API"
slug: "aula-15-29-estender-estatisticas-tempo-resposta"
difficulty: "hard"
concepts: ["múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "return"]
discipline: "python"
learning_goal: "Estender função de análise para retornar múltiplos valores estatísticos de tempo de resposta."
exercise_type: "extend_code"
stage: 5
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "Média: 491.5ms\nP95: 1200ms\nRespostas lentas (>500ms): 4"
---

## Enunciado

A função abaixo só retorna a média. Estenda para retornar `(media, p95, qtd_lentas)`:
- `p95` = índice `int(len * 0.95)` da lista ordenada.
- `qtd_lentas` = número de respostas acima de `limite_ms` (padrão `500`).

```python
def analisar_respostas(tempos_ms: list, limite_ms: float = 500.0):
    return sum(tempos_ms) / len(tempos_ms)

tempos = [120, 340, 890, 450, 230, 780, 510, 95, 1200, 300]
media, p95, lentas = analisar_respostas(tempos)
print(f"Média: {media:.1f}ms")
print(f"P95: {p95}ms")
print(f"Respostas lentas (>{500}ms): {lentas}")
```

## Solução

```python
def analisar_respostas(tempos_ms: list, limite_ms: float = 500.0):
    media = sum(tempos_ms) / len(tempos_ms)
    ordenados = sorted(tempos_ms)
    idx_p95 = int(len(ordenados) * 0.95)
    p95 = ordenados[idx_p95]
    qtd_lentas = sum(1 for t in tempos_ms if t > limite_ms)
    return media, p95, qtd_lentas
```
