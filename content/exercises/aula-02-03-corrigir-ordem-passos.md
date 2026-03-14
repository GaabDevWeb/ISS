---
title: "Corrigir ordem dos passos do algoritmo"
slug: "aula-02-03-corrigir-ordem-passos"
difficulty: "easy"
concepts: ["algoritmos", "determinístico"]
discipline: "python"
learning_goal: "Corrigir bug na ordem dos passos de um algoritmo em código."
exercise_type: "fix_bug"
stage: 3
context: "automação"
expected_output: |
  1. Abrir torneira
  2. Ensaboar
  3. Enxaguar
---

## Enunciado

O algoritmo abaixo imprime os passos de lavar louça na ordem errada. Corrija para que a saída seja: 1. Abrir torneira, 2. Ensaboar, 3. Enxaguar.

```python
print("1. Abrir torneira")
print("2. Enxaguar")
print("2. Ensaboar")
```

## Solução

```python
print("1. Abrir torneira")
print("2. Ensaboar")
print("3. Enxaguar")
```
