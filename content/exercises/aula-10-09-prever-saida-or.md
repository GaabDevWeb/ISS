---
title: "Prever saída — or em condição"
slug: "aula-10-09-prever-saida-or"
difficulty: "easy"
concepts: ["operadores lógicos or"]
discipline: "python"
learning_goal: "Prever qual ramo é executado com condição usando or."
exercise_type: "predict_output"
stage: 2
context: "validação de dados"
expected_output: "Aceito"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
x = 0
y = 5
if x > 0 or y > 0:
    print("Aceito")
else:
    print("Recusado")
```

## Solução

A saída é:

```
Aceito
```

y > 0 é True; com or basta um ser True.
