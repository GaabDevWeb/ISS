---
title: "Implementar — multiplicar"
slug: "aula-14-23-implementar-multiplicar"
difficulty: "easy"
concepts: ["parâmetros formais vs argumentos", "return explícito e None implícito"]
discipline: "python"
learning_goal: "Função binária simples com produto."
exercise_type: "implement_function"
stage: 4
context: "validação de dados"
test_cases:
  - input: "6\n7"
    output: "42"
---

## Enunciado

```python
def multiplicar(a, b):
    pass

print(multiplicar(int(input()), int(input())))
```

## Solução

```python
def multiplicar(a, b):
    return a * b

print(multiplicar(int(input()), int(input())))
```
