---
title: "Corrigir indentação do bloco if"
slug: "aula-09-03-corrigir-indentacao"
difficulty: "easy"
concepts: ["blocos identados", "if/elif/else"]
discipline: "python"
learning_goal: "Corrigir indentação para que o print pertença ao bloco if."
exercise_type: "fix_bug"
stage: 3
context: "validação de dados"
expected_output: "OK"
---

## Enunciado

O código deveria exibir "OK" quando x > 0. Corrija a indentação: o print deve estar dentro do bloco if.

```python
x = 5
if x > 0:
print("OK")
```

## Solução

```python
x = 5
if x > 0:
    print("OK")
```
