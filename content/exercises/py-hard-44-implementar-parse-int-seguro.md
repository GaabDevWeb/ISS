---
title: "HARD — int com try/except"
slug: "py-hard-44-implementar-parse-int-seguro"
difficulty: "hard"
concepts: ["ValueError", "return explícito e None implícito", "conversão de tipos"]
discipline: "python"
learning_goal: "Retornar None se conversão falhar."
exercise_type: "implement_function"
stage: 20
context: "validação de entrada"
test_cases:
  - input: ""
    output: "7\nNone"
---

## Enunciado

`to_int(t)` retorna int ou None. Imprima `to_int('7')` e `to_int('x')` em duas linhas.

```python
def to_int(t):
    pass

print(to_int('7'))
print(to_int('x'))
```

## Solução

```python
def to_int(t):
    try:
        return int(t)
    except ValueError:
        return None

print(to_int('7'))
print(to_int('x'))
```
