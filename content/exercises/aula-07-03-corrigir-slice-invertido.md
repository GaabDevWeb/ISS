---
title: "Corrigir slice para reverter string"
slug: "aula-07-03-corrigir-slice-invertido"
difficulty: "easy"
concepts: ["slicing", "passo negativo"]
discipline: "python"
learning_goal: "Usar slice [::-1] para inverter string."
exercise_type: "fix_bug"
stage: 3
context: "processamento de texto"
expected_output: "olleh"
---

## Enunciado

O código deveria exibir "hello" invertido ("olleh"). Corrija o slice: use passo negativo para percorrer de trás para frente.

```python
s = "hello"
print(s[::1])  # bug: passo 1 não inverte
```

## Solução

```python
s = "hello"
print(s[::-1])
```
