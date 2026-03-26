---
title: Implementar — match/case para dia da semana
slug: aula-10-novo-03-implementar-matchcase-para-dia-da-semana
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
exercise_type: implement_function
stage: 3
context: scripts de automação
test_cases:
- input: '1

    '
  output: util
- input: '7

    '
  output: fim
- input: '0

    '
  output: invalido
---

## Enunciado

Leia um inteiro 1..7 e imprima `util` para 1..5, `fim` para 6..7, `invalido` caso contrário. Use match/case.

## Solução

```python
d = int(input())
match d:
    case 1 | 2 | 3 | 4 | 5:
        print("util")
    case 6 | 7:
        print("fim")
    case _:
        print("invalido")
```
