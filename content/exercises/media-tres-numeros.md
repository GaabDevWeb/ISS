---
title: "Média de três números"
slug: "media-tres-numeros"
difficulty: "easy"
concepts: "input(), float(), operadores aritméticos, variáveis"
discipline: "python"
---

## Enunciado

Crie um programa que leia três números reais, calcule a média aritmética (soma dos três dividida por 3) e exiba o resultado com duas casas decimais.

Use `float(input(...))` para cada valor e f-string para formatar a saída (ex.: `Média: 5.33`).

## Solução

```python
n1 = float(input("Primeiro número: "))
n2 = float(input("Segundo número: "))
n3 = float(input("Terceiro número: "))
media = (n1 + n2 + n3) / 3
print(f"Média: {media:.2f}")
```
