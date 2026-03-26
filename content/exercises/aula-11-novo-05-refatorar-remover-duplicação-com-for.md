---
title: Refatorar — remover duplicação com for
slug: aula-11-novo-05-refatorar-remover-duplicação-com-for
difficulty: medium
concepts:
- laços for e range em Python
- listas e sequências iteráveis
- iteração sobre coleções
- parada não inclusiva de range()
- objeto iterável
discipline: python
learning_goal: 'Praticar: laços for e range em Python, listas e sequências iteráveis,
  iteração sobre coleções'
exercise_type: refactor
stage: 4
context: scripts de automação
test_cases:
- input: ''
  output: 'Item 1

    Item 2

    Item 3'
---

## Enunciado

Refatore para imprimir `Item 1`, `Item 2`, `Item 3` usando `for`.

## Solução

```python
for i in range(1, 4):
    print(f"Item {i}")
```
