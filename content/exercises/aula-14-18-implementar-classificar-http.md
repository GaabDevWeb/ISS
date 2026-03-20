---
title: "Implementar — classificar código HTTP"
slug: "aula-14-18-implementar-classificar-http"
difficulty: "medium"
concepts: ["return explícito e None implícito", "def e chamada de função"]
discipline: "python"
learning_goal: "Ramificar retornos por faixas de código."
exercise_type: "implement_function"
stage: 8
context: "processamento de dados de API"
test_cases:
  - input: "404"
    output: "CLIENT"
  - input: "500"
    output: "SERVER"
  - input: "200"
    output: "OK"
---

## Enunciado

```python
def classificar_http(codigo):
    pass

print(classificar_http(int(input())))
```

## Solução

```python
def classificar_http(codigo):
    if codigo >= 500:
        return 'SERVER'
    if codigo >= 400:
        return 'CLIENT'
    return 'OK'

print(classificar_http(int(input())))
```
