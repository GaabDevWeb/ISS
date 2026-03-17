---
title: "Completar — soma com enumerate e índice"
slug: "aula-13-14-completar-soma-e-enumerate"
difficulty: "medium"
concepts: ["enumerate", "acumulador", "condicional"]
discipline: "python"
learning_goal: "Completar código que soma apenas elementos em posições pares usando enumerate."
exercise_type: "complete_the_code"
stage: 5
context: "processamento de dados"
expected_output: "9"
---

## Enunciado

Complete o código para que ele some apenas os elementos em índices pares (0, 2, 4, ...) da lista. Use `enumerate(valores)` e um `if i % 2 == 0` para acumular.

```python
valores = [3, 1, 4, 1, 2]  # índices pares: 3, 4, 2 -> soma 9
total = 0
# Complete: for i, v in enumerate(valores): se i par, total += v
print(total)
```

## Solução

```python
valores = [3, 1, 4, 1, 2]
total = 0
for i, v in enumerate(valores):
    if i % 2 == 0:
        total += v
print(total)
```

Saída: 9 (3+4+2).
