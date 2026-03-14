---
title: "Corrigir operador de comparação"
slug: "aula-09-08-corrigir-operador-comparacao"
difficulty: "easy"
concepts: ["operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Corrigir uso de = em vez de == na condição."
exercise_type: "fix_bug"
stage: 4
context: "validação de dados"
expected_output: "Par"
---

## Enunciado

O código deveria exibir "Par" quando n é 4. Corrija: use comparação (==) em vez de atribuição (=) na condição.

```python
n = 4
if n = 4:  # bug
    print("Par")
```

## Solução

```python
n = 4
if n == 4:
    print("Par")
```
