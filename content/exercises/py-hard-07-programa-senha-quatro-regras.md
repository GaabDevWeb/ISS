---
title: "HARD — Validador de senha (4 regras)"
slug: "py-hard-07-programa-senha-quatro-regras"
difficulty: "hard"
concepts: ["operadores lógicos and, or, not", "if/elif/else", "métodos de string"]
discipline: "python"
learning_goal: "Combinar tamanho, dígito, minúscula e maiúscula."
exercise_type: "full_program"
stage: 20
context: "validação de entrada"
test_cases:
  - input: "Abcdefg1"
    output: "OK"
  - input: "abcdefgh"
    output: "FALTA"
---

## Enunciado

Leia uma senha. Imprima `OK` se len≥8, tem dígito, tem minúscula e tem maiúscula. Caso contrário `FALTA`.

## Solução

```python
w = input()
ok = len(w) >= 8
ok = ok and any('a' <= c <= 'z' for c in w)
ok = ok and any('A' <= c <= 'Z' for c in w)
ok = ok and any(c.isdigit() for c in w)
print('OK' if ok else 'FALTA')
```
