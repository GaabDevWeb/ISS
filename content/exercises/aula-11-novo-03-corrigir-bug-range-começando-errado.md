---
title: Corrigir bug — range começando errado
slug: aula-11-novo-03-corrigir-bug-range-começando-errado
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
exercise_type: fix_bug
stage: 3
context: scripts de automação
test_cases:
- input: ''
  output: '1

    2

    3'
---

## Enunciado

O programa deve imprimir 1..3. Corrija.

```python
for i in range(1, 3):
    print(i)
```

## Solução

```python
for i in range(1, 4):
    print(i)
```
