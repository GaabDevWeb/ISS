---
title: "Implementar — fahrenheit_para_celsius"
slug: "aula-14-08-implementar-fahrenheit-para-celsius"
difficulty: "easy"
concepts: ["parâmetros formais vs argumentos", "builtins print, input, int, float, type, len"]
discipline: "python"
learning_goal: "Converter temperatura com float e return."
exercise_type: "implement_function"
stage: 4
context: "monitoramento"
test_cases:
  - input: "32"
    output: "0.0"
  - input: "212"
    output: "100.0"
---

## Enunciado

```python
def fahrenheit_para_celsius(f):
    pass

print(fahrenheit_para_celsius(float(input())))
```

## Solução

```python
def fahrenheit_para_celsius(f):
    return (f - 32) * 5 / 9

print(fahrenheit_para_celsius(float(input())))
```
