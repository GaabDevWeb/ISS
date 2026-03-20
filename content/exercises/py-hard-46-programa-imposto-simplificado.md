---
title: "HARD — Imposto em duas faixas"
slug: "py-hard-46-programa-imposto-simplificado"
difficulty: "hard"
concepts: ["if/elif/else", "f-strings", "operadores aritméticos"]
discipline: "python"
learning_goal: "Cálculo por fatia de renda."
exercise_type: "full_program"
stage: 20
context: "validação de dados"
test_cases:
  - input: "1200"
    output: "20.00"
---

## Enunciado

Leia renda float. Até 1000 taxa 0%. Acima de 1000: 10% apenas sobre o que excede 1000. Imprima imposto com 2 casas.

## Solução

```python
r = float(input())
if r <= 1000:
    imp = 0.0
else:
    imp = (r - 1000) * 0.10
print(f'{imp:.2f}')
```
