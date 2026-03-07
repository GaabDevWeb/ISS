---
title: "Slice e inversão de string"
slug: "slice-inverter-string"
difficulty: "medium"
concepts: "índices, slice, [::-1], len()"
discipline: "python"
---

## Enunciado

Crie um programa que armazene a string `"programacao"` em uma variável. Exiba:

1. Os três primeiros caracteres (slice com início e fim).
2. Os três últimos caracteres (use índices negativos ou `len()`).
3. A string invertida (use slice com passo negativo `[::-1]`).

Cada resultado em uma linha.

## Solução

```python
texto = "programacao"
print(texto[0:3])
print(texto[-3:])
print(texto[::-1])
```
