---
title: "HARD — Índices com palavra prefixo"
slug: "py-hard-16-completar-prefixo-enumerate"
difficulty: "hard"
concepts: ["enumerate e range(len)", "operadores relacionais"]
discipline: "python"
learning_goal: "Filtrar com startswith e juntar índices."
exercise_type: "complete_the_code"
stage: 19
context: "processamento de texto"
test_cases:
  - input: ""
    output: "0,2"
---

## Enunciado

Complete a condição: imprimir índices (0-based) de palavras que começam com `'a'`.

```python
w = ['ana', 'lu', 'ala']
r = []
for i, p in enumerate(w):
    if _________________________:
        r.append(str(i))
print(','.join(r))
```

## Solução

Use `p.startswith('a')`.

```python
w = ['ana', 'lu', 'ala']
r = []
for i, p in enumerate(w):
    if p.startswith('a'):
        r.append(str(i))
print(','.join(r))
```
