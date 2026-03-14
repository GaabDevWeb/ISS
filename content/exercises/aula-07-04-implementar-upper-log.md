---
title: "Implementar padronização de nível de log com upper"
slug: "aula-07-04-implementar-upper-log"
difficulty: "easy"
concepts: ["métodos de string (upper, lower)"]
discipline: "python"
learning_goal: "Usar .upper() para exibir nível de log em maiúsculas."
exercise_type: "implement_function"
stage: 4
context: "logs"
expected_output: "ERROR"
---

## Enunciado

Implemente um programa que leia uma linha (nível de log, ex.: "error") e exiba em maiúsculas (ex.: "ERROR"). Use o método de string apropriado.

## Solução

```python
nivel = input()
print(nivel.upper())
```
