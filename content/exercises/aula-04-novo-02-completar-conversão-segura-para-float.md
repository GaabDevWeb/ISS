---
title: Completar — conversão segura para float
slug: aula-04-novo-02-completar-conversão-segura-para-float
difficulty: easy
concepts:
- conversão de tipos
- tipagem dinâmica
- tipagem forte
- int, float, bool, string
- operadores aritméticos
- precedência de operadores
discipline: python
learning_goal: 'Praticar: conversão de tipos, tipagem dinâmica, tipagem forte'
exercise_type: complete_the_code
stage: 2
context: validação de entrada
test_cases:
- input: '3

    '
  output: '3.0'
---

## Enunciado

Complete para ler um número e imprimir com 1 casa decimal.

```python
texto = input()
valor = _________(texto)
print(f"{valor:.1f}")
```

## Solução

```python
texto = input()
valor = float(texto)
print(f"{valor:.1f}")
```
