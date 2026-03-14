---
title: "Prever saída — truthy e falsy"
slug: "aula-10-05-prever-saida-truthy"
difficulty: "easy"
concepts: ["truthy e falsy em Python"]
discipline: "python"
learning_goal: "Prever resultado de if com string vazia e não vazia."
exercise_type: "predict_output"
stage: 2
context: "validação de entrada"
expected_output: "Não vazio"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
texto = "abc"
if texto:
    print("Não vazio")
else:
    print("Vazio")
```

## Solução

A saída é:

```
Não vazio
```

String não vazia é truthy, então entra no if.
