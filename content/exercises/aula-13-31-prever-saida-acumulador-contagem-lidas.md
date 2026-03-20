---
title: "Prever saída — acumulador conta leituras válidas"
slug: "aula-13-31-prever-saida-acumulador-contagem-lidas"
difficulty: "easy"
concepts: ["acumulador (inicialização e +=)", "condicional"]
discipline: "python"
learning_goal: "Prever valor de contador acumulado com teste de mesa e condição no loop."
exercise_type: "predict_output"
stage: 2
context: "validação de entrada"
expected_output: "3"
---

## Enunciado

Qual é o número impresso ao final? Entradas simuladas (uma por `input()`): 8, 0, 15, -2, 10. Valores <= 0 não incrementam o contador.

```python
contagem = 0
for _ in range(5):
    v = int(input())
    if v > 0:
        contagem += 1
print(contagem)
```

## Solução

A saída é `3` (teste de mesa: 8→1, 0→1, 15→2, -2→2, 10→3).
