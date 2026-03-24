---
title: "Prever saída — tuple unpacking de múltiplos retornos"
slug: "aula-15-07-prever-tuple-unpacking"
difficulty: "easy"
concepts: ["múltiplos retornos", "tuple unpacking"]
discipline: "python"
learning_goal: "Prever como o Python distribui múltiplos valores de retorno para variáveis."
exercise_type: "predict_output"
stage: 2
context: "pipeline ETL"
expected_output: "Qtd: 4\nTotal: 100\nMédia: 25.0"
---

## Enunciado

Escreva **exatamente** o que será impresso:

```python
def resumo_lote(numeros):
    return len(numeros), sum(numeros), sum(numeros) / len(numeros)

quantidade, total, media = resumo_lote([10, 20, 30, 40])
print(f"Qtd: {quantidade}")
print(f"Total: {total}")
print(f"Média: {media}")
```

## Solução

```
Qtd: 4
Total: 100
Média: 25.0
```
