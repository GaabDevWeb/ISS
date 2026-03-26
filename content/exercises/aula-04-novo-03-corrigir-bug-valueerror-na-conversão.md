---
title: Corrigir bug — ValueError na conversão
slug: aula-04-novo-03-corrigir-bug-valueerror-na-conversão
difficulty: medium
concepts:
- conversão de tipos
- tipagem dinâmica
- tipagem forte
- int, float, bool, string
- operadores aritméticos
- precedência de operadores
discipline: python
learning_goal: 'Praticar: conversão de tipos, tipagem dinâmica, tipagem forte'
exercise_type: fix_bug
stage: 3
context: validação de entrada
test_cases:
- input: 'x

    '
  output: INVALIDO
- input: '2.5

    '
  output: '2.5'
---

## Enunciado

O programa deve imprimir `INVALIDO` quando a entrada não for numérica. Corrija.

```python
texto = input()
valor = float(texto)
print(valor)
```

## Solução

```python
texto = input()
try:
    valor = float(texto)
    print(valor)
except ValueError:
    print("INVALIDO")
```
