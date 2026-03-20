---
title: "HARD — Imprimir só linhas de índice par"
slug: "py-hard-29-programa-linhas-pares-enumerate"
difficulty: "hard"
concepts: ["enumerate e range(len)", "operadores relacionais"]
discipline: "python"
learning_goal: "Filtrar por paridade do índice."
exercise_type: "full_program"
stage: 19
context: "análise de logs"
test_cases:
  - input: "a\nb\nc\nd"
    output: "a\nc"
---

## Enunciado

Leia 4 linhas. Imprima apenas as linhas cujo índice **0-based** é par (0 e 2), cada uma numa linha, na ordem.

## Solução

```python
linhas = [input() for _ in range(4)]
for i, t in enumerate(linhas):
    if i % 2 == 0:
        print(t)
```
