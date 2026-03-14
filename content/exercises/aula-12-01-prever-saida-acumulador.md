---
title: "Prever saída — acumulador com +="
slug: "aula-12-01-prever-saida-acumulador"
difficulty: "easy"
concepts: ["acumuladores", "operadores de atribuição composta (+=)"]
discipline: "python"
learning_goal: "Prever valor final de variável que acumula em loop."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "15"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
soma = 0
for i in range(1, 6):
    soma += i
print(soma)
```

## Solução

A saída é:

```
15
```

soma acumula 1+2+3+4+5 = 15.
