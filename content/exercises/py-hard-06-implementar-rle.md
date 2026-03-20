---
title: "HARD — Run-length encoding compacto"
slug: "py-hard-06-implementar-rle"
difficulty: "hard"
concepts: ["laços for e range em Python", "concatenação de strings", "função len para tamanho de strings"]
discipline: "python"
learning_goal: "Agrupar caracteres consecutivos iguais."
exercise_type: "implement_function"
stage: 20
context: "processamento de texto"
test_cases:
  - input: ""
    output: "a3b2\nc4"
---

## Enunciado

Implemente `rle(s)` (s não vazia): retorna string alternando caractere e contagem, ex. `aaabb`→`a3b2`. Imprima `rle('aaabb')` e na linha seguinte `rle('cccc')`.

```python
def rle(s):
    pass

print(rle('aaabb'))
print(rle('cccc'))
```

## Solução

```python
def rle(s):
    out = ''
    i = 0
    while i < len(s):
        c = s[i]
        j = i + 1
        while j < len(s) and s[j] == c:
            j += 1
        out += c + str(j - i)
        i = j
    return out

print(rle('aaabb'))
print(rle('cccc'))
```
