---
title: "Completar for com índice (range(len))"
slug: "aula-11-06-completar-for-indice"
difficulty: "easy"
concepts: ["for", "range(len(notas))", "listas"]
discipline: "python"
learning_goal: "Percorrer lista por índice usando range(len(lista))."
exercise_type: "complete_the_code"
stage: 3
context: "processamento de dados"
expected_output: "Prova 1: 8\nProva 2: 7\nProva 3: 9"
---

## Enunciado

Complete o for para exibir "Prova 1: 8", "Prova 2: 7", "Prova 3: 9". Use range(len(notas)) e índice i para acessar notas[i].

```python
notas = [8, 7, 9]
for i in range(_____(notas)):
    print(f"Prova {i + 1}: {notas[i]}")
```

## Solução

```python
notas = [8, 7, 9]
for i in range(len(notas)):
    print(f"Prova {i + 1}: {notas[i]}")
```
