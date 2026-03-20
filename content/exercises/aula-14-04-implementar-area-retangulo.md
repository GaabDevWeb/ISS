---
title: "Implementar — area_retangulo"
slug: "aula-14-04-implementar-area-retangulo"
difficulty: "easy"
concepts: ["parâmetros formais vs argumentos", "return explícito e None implícito"]
discipline: "python"
learning_goal: "Função com dois parâmetros e return."
exercise_type: "implement_function"
stage: 4
context: "validação de dados"
test_cases:
  - input: "3\n5"
    output: "15"
---

## Enunciado

```python
def area_retangulo(base, altura):
    pass

print(area_retangulo(int(input()), int(input())))
```

## Solução

```python
def area_retangulo(base, altura):
    return base * altura

print(area_retangulo(int(input()), int(input())))
```
