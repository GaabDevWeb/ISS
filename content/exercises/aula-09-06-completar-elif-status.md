---
title: "Completar cadeia elif para status HTTP"
slug: "aula-09-06-completar-elif-status"
difficulty: "easy"
concepts: ["if/elif/else", "modelar regras de negócio"]
discipline: "python"
learning_goal: "Completar condição para mapear código 200 -> OK, 404 -> Not Found."
exercise_type: "complete_the_code"
stage: 3
context: "API"
test_cases:
  - input: "200"
    output: "OK"
  - input: "404"
    output: "Not Found"
---

## Enunciado

Complete as condições: se codigo == 200 exiba "OK", se codigo == 404 exiba "Not Found", senão "Erro". A variável codigo é lida como int.

```python
codigo = int(input())
if codigo == 200:
    print("OK")
elif _____:  # codigo == 404
    print("Not Found")
else:
    print("Erro")
```

## Solução

```python
codigo = int(input())
if codigo == 200:
    print("OK")
elif codigo == 404:
    print("Not Found")
else:
    print("Erro")
```
