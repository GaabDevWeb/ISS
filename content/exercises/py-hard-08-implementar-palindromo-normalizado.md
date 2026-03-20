---
title: "HARD — Palíndromo sem espaços"
slug: "py-hard-08-implementar-palindromo-normalizado"
difficulty: "hard"
concepts: ["slicing [inicio:fim:passo]", "métodos de string"]
discipline: "python"
learning_goal: "Remover espaços e comparar com reversão."
exercise_type: "implement_function"
stage: 19
context: "processamento de texto"
test_cases:
  - input: ""
    output: "True\nFalse"
---

## Enunciado

`pal(s)` remove espaços, minúsculas, compara com reversa. Imprima `pal('O lobo ama o bolo')` e `pal('abc')`.

```python
def pal(s):
    pass

print(pal('O lobo ama o bolo'))
print(pal('abc'))
```

## Solução

```python
def pal(s):
    t = s.replace(' ', '').lower()
    return t == t[::-1]

print(pal('O lobo ama o bolo'))
print(pal('abc'))
```
