---
title: Refatorar — substituir if/elif por match
slug: aula-10-novo-05-refatorar-substituir-ifelif-por-match
difficulty: medium
concepts:
- operadores lógicos and, or, not
- tabela-verdade
- truthy e falsy em Python
- match/case
- pattern matching estrutural
discipline: python
learning_goal: 'Praticar: operadores lógicos and, or, not, tabela-verdade, truthy
  e falsy em Python'
exercise_type: refactor
stage: 4
context: API
test_cases:
- input: 'get

    '
  output: GET
- input: 'put

    '
  output: OUTRO
---

## Enunciado

Leia `metodo` (str) e imprima `GET`, `POST` ou `OUTRO`. Use match/case.

## Solução

```python
metodo = input().strip().upper()
match metodo:
    case "GET":
        print("GET")
    case "POST":
        print("POST")
    case _:
        print("OUTRO")
```
