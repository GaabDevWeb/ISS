---
title: "HARD — Contar vogais (minúsculas) numa linha"
slug: "py-hard-22-programa-contar-vogais"
difficulty: "hard"
concepts: ["if/elif/else", "laços for e range em Python", "sequência de caracteres"]
discipline: "python"
learning_goal: "Acumulador + condição por caractere."
exercise_type: "full_program"
stage: 19
context: "processamento de texto"
test_cases:
  - input: "programacao"
    output: "5"
---

## Enunciado

Leia uma linha. Conte quantas vogais minúsculas `aeiou` aparecem. Imprima o inteiro.

## Solução

```python
s = input()
v = 'aeiou'
c = 0
for ch in s:
    if ch in v:
        c += 1
print(c)
```
