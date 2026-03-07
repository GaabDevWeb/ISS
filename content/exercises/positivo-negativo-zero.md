---
title: "Positivo, negativo ou zero"
slug: "positivo-negativo-zero"
difficulty: "easy"
concepts: "if/elif/else, comparação, input()"
discipline: "python"
---

## Enunciado

Crie um programa que leia um número (inteiro ou real) e informe se ele é positivo, negativo ou zero. Exiba exatamente uma das mensagens: "Positivo", "Negativo" ou "Zero".

Use `if`, `elif` e `else`. Para número real use `float(input(...))`.

## Solução

```python
numero = float(input("Digite um número: "))
if numero > 0:
    print("Positivo")
elif numero < 0:
    print("Negativo")
else:
    print("Zero")
```
