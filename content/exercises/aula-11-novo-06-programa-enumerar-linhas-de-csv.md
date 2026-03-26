---
title: Programa — enumerar linhas de CSV
slug: aula-11-novo-06-programa-enumerar-linhas-de-csv
difficulty: hard
concepts:
- laços for e range em Python
- listas e sequências iteráveis
- iteração sobre coleções
- parada não inclusiva de range()
- objeto iterável
discipline: python
learning_goal: 'Praticar: laços for e range em Python, listas e sequências iteráveis,
  iteração sobre coleções'
exercise_type: full_program
stage: 5
context: parsing de CSV
test_cases:
- input: 'a

    b

    c

    '
  output: '1:a

    2:b

    3:c'
---

## Enunciado

Leia 3 linhas (strings) e imprima cada uma prefixada por seu número (1..3): `1:<linha>`.

## Solução

```python
linhas = [input().rstrip("\n"), input().rstrip("\n"), input().rstrip("\n")]
for i, linha in enumerate(linhas, start=1):
    print(f"{i}:{linha}")
```
