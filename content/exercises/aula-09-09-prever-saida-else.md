---
title: "Prever saída — ramo else"
slug: "aula-09-09-prever-saida-else"
difficulty: "easy"
concepts: ["if/elif/else", "fluxo condicional"]
discipline: "python"
learning_goal: "Prever qual ramo é executado quando condição é False."
exercise_type: "predict_output"
stage: 2
context: "validação de dados"
expected_output: "Negativo"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
x = -1
if x > 0:
    print("Positivo")
else:
    print("Negativo")
```

## Solução

A saída é:

```
Negativo
```

x > 0 é False, então executa o else.
