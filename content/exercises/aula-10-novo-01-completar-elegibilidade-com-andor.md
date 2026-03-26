---
title: Completar — elegibilidade com and/or
slug: aula-10-novo-01-completar-elegibilidade-com-andor
difficulty: easy
concepts:
- operadores lógicos and, or, not
- tabela-verdade
- truthy e falsy em Python
- match/case
- pattern matching estrutural
discipline: python
learning_goal: 'Praticar: operadores lógicos and, or, not, tabela-verdade, truthy
  e falsy em Python'
exercise_type: complete_the_code
stage: 1
context: validação de dados
test_cases:
- input: '18

    2000

    '
  output: OK
- input: '17

    5000

    '
  output: 'NO'
---

## Enunciado

Complete a condição: imprima `OK` se `idade >= 18` **e** `renda >= 2000`.

```python
idade = int(input())
renda = float(input())
if ____________________________:
    print("OK")
else:
    print("NO")
```

## Solução

```python
idade = int(input())
renda = float(input())
if (idade >= 18) and (renda >= 2000):
    print("OK")
else:
    print("NO")
```
