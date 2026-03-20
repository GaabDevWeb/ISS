---
title: "Completar — índice com range(len)"
slug: "aula-13-32-completar-len-range-indice"
difficulty: "easy"
concepts: ["len() em coleções", "enumerate e range(len)"]
discipline: "python"
learning_goal: "Completar loop com range(len) para acessar elemento por índice."
exercise_type: "complete_the_code"
stage: 3
context: "processamento de texto"
expected_output: "0: GET\n1: POST"
---

## Enunciado

Complete as lacunas (sem usar `enumerate`).

```python
metodos = ['GET', 'POST']
for i in range(________):
    print(f'{i}: {________}')
```

## Solução

```python
metodos = ['GET', 'POST']
for i in range(len(metodos)):
    print(f'{i}: {metodos[i]}')
```
