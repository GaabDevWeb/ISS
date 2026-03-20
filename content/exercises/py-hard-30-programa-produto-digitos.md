---
title: "HARD — Produto dos dígitos de uma string"
slug: "py-hard-30-programa-produto-digitos"
difficulty: "hard"
concepts: ["laços for e range em Python", "acumulador (inicialização e +=)"]
discipline: "python"
learning_goal: "Multiplicar dígitos ignorando não-dígitos."
exercise_type: "full_program"
stage: 20
context: "validação de dados"
test_cases:
  - input: "a2b3c4"
    output: "24"
---

## Enunciado

Leia uma string. Calcule o produto de todos os caracteres que são dígitos (`isdigit()`). Se não houver dígito, imprima `0`.

## Solução

```python
s = input()
p = 1
found = False
for c in s:
    if c.isdigit():
        found = True
        p *= int(c)
print(p if found else 0)
```
