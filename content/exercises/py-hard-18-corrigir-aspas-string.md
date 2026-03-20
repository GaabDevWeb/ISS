---
title: "HARD — Corrigir literal com aspas internas"
slug: "py-hard-18-corrigir-aspas-string"
difficulty: "hard"
concepts: ["literais de string", "aspas simples e duplas", "SyntaxError por string não terminada"]
discipline: "python"
learning_goal: "Escapar ou alternar aspas."
exercise_type: "fix_bug"
stage: 19
context: "processamento de texto"
test_cases:
  - input: ""
    output: "diz \"sim\""
---

## Enunciado

Corrija para imprimir: `diz "sim"` (com aspas duplas na palavra sim).

```python
msg = "diz "sim""
print(msg)
```

## Solução

```python
msg = 'diz "sim"'
print(msg)
```
