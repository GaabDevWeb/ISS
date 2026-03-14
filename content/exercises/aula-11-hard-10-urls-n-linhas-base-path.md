---
title: "Montar N URLs a partir de base e N paths"
slug: "aula-11-hard-10-urls-n-linhas-base-path"
difficulty: "hard"
concepts: ["for", "range()", "iteração", "strings"]
discipline: "python"
learning_goal: "Ler base da URL e N paths, exibir N URLs completas (base/path)."
exercise_type: "full_program"
stage: 18
context: "API"
test_cases:
  - input: "https://api.com\n2\nusers\nproducts"
    output: "https://api.com/users\nhttps://api.com/products"
---

## Enunciado

Escreva um programa que leia a base da URL (ex.: https://api.com) e um inteiro N. Depois leia N linhas (paths). Para cada path exiba a URL completa no formato base/path (sem barra dupla). Use for _ in range(N): e f-string ou concatenação.

## Solução

```python
base = input().rstrip("/")
n = int(input())
for _ in range(n):
    path = input().lstrip("/")
    print(f"{base}/{path}")
```
