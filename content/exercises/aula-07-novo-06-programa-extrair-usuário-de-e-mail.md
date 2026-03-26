---
title: Programa — extrair usuário de e-mail
slug: aula-07-novo-06-programa-extrair-usuário-de-e-mail
difficulty: hard
concepts:
- sequência de caracteres
- índice positivo e negativo em strings
- operador colchete []
- slicing [inicio:fim:passo]
- substrings
- métodos de string (upper, lower, swapcase, capitalize, title, replace, split, join,
  strip)
discipline: python
learning_goal: 'Praticar: sequência de caracteres, índice positivo e negativo em strings,
  operador colchete []'
exercise_type: full_program
stage: 5
context: validação de dados
test_cases:
- input: 'Alice@ex.com

    '
  output: alice
- input: 'semarroba

    '
  output: INVALIDO
---

## Enunciado

Leia um e-mail. Imprima a parte antes de `@` em minúsculas. Se não houver `@`, imprima `INVALIDO`.

## Solução

```python
email = input().strip()
if "@" not in email:
    print("INVALIDO")
else:
    print(email.split("@", 1)[0].lower())
```
