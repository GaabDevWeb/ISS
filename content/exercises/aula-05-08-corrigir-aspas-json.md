---
title: "Corrigir aspas em string que imita JSON"
slug: "aula-05-08-corrigir-aspas-json"
difficulty: "easy"
concepts: ["aspas simples e duplas", "diagnosticar SyntaxError"]
discipline: "python"
learning_goal: "Corrigir string que contém aspas duplas internas escapadas ou alternância de aspas."
exercise_type: "fix_bug"
stage: 4
context: "API"
expected_output: '{"campo": "valor"}'
---

## Enunciado

O código deveria exibir uma linha com conteúdo `{"campo": "valor"}`. Corrija a string para que seja válida (use aspas simples externas).

```python
s = "{"campo": "valor"}"
print(s)
```

## Solução

```python
s = '{"campo": "valor"}'
print(s)
```
