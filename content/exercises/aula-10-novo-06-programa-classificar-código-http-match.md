---
title: Programa — classificar código HTTP (match)
slug: aula-10-novo-06-programa-classificar-código-http-match
difficulty: hard
concepts:
- operadores lógicos and, or, not
- tabela-verdade
- truthy e falsy em Python
- match/case
- pattern matching estrutural
discipline: python
learning_goal: 'Praticar: operadores lógicos and, or, not, tabela-verdade, truthy
  e falsy em Python'
exercise_type: full_program
stage: 5
context: API
test_cases:
- input: '200

    '
  output: OK
- input: '503

    '
  output: Erro desconhecido
---

## Enunciado

Leia um código HTTP (int). Use match/case: 200->OK, 404->Not Found, 500->Internal Server Error, senão Erro desconhecido.

## Solução

```python
codigo = int(input())
match codigo:
    case 200:
        print("OK")
    case 404:
        print("Not Found")
    case 500:
        print("Internal Server Error")
    case _:
        print("Erro desconhecido")
```
