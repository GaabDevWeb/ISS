---
title: "Validar triângulo e classificar por lados"
slug: "aula-09-hard-05-triangulo-lados-valido"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Validar se lados formam triângulo e classificar (equilátero, isósceles, escaleno)."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "3\n3\n3"
    output: "equilátero"
  - input: "3\n3\n5"
    output: "isósceles"
  - input: "1\n2\n10"
    output: "inválido"
---

## Enunciado

Escreva um programa que leia três floats (lados a, b, c). Se não formarem triângulo (a+b<=c ou a+c<=b ou b+c<=a), exiba "inválido". Senão: "equilátero" se a==b==c; "isósceles" se dois lados iguais; "escaleno" caso contrário. Use if/elif/else.

## Solução

```python
a = float(input())
b = float(input())
c = float(input())
if a + b <= c or a + c <= b or b + c <= a:
    print("inválido")
elif a == b == c:
    print("equilátero")
elif a == b or a == c or b == c:
    print("isósceles")
else:
    print("escaleno")
```
