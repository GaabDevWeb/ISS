---
title: "Par ou ímpar"
slug: "par-ou-impar"
difficulty: "easy"
concepts: "if/else, operador módulo %, input()"
discipline: "python"
---

## Enunciado

Crie um programa que leia um número inteiro do usuário e informe se ele é par ou ímpar.

Use o operador `%` (módulo/resto da divisão) para verificar a divisibilidade por 2. Exiba a palavra `PAR` ou `IMPAR` conforme o caso.

## Solução

```python
numero = int(input("Digite um número inteiro: "))
if numero % 2 == 0:
    print("PAR")
else:
    print("IMPAR")
```
