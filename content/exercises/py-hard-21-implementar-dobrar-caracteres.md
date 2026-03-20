---
title: "HARD — Cada caractere duplicado"
slug: "py-hard-21-implementar-dobrar-caracteres"
difficulty: "hard"
concepts: ["concatenação de strings", "laços for e range em Python"]
discipline: "python"
learning_goal: "Construir string com repetição por caractere."
exercise_type: "implement_function"
stage: 19
context: "processamento de texto"
test_cases:
  - input: ""
    output: "aabbcc"
---

## Enunciado

`dup(s)` retorna string onde cada caractere aparece duas vezes seguidas.

```python
def dup(s):
    pass

print(dup('abc'))
```

## Solução

```python
def dup(s):
    t = ''
    for c in s:
        t += c * 2
    return t

print(dup('abc'))
```
