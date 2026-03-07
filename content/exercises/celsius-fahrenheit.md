---
title: "Celsius para Fahrenheit"
slug: "celsius-fahrenheit"
difficulty: "medium"
concepts: "input(), float(), operadores aritméticos, f-string"
discipline: "python"
---

## Enunciado

Crie um programa que leia uma temperatura em graus Celsius (número real), converta para Fahrenheit usando a fórmula `F = C * 9/5 + 32` e exiba o resultado com uma casa decimal.

Use `float(input(...))` para ler o valor e f-string para formatar a saída (ex.: `25.0 °C = 77.0 °F`).

## Solução

```python
graus_celsius = float(input("Digite a temperatura em Celsius: "))
graus_fahrenheit = graus_celsius * 9 / 5 + 32
print(f"{graus_celsius:.1f} °C = {graus_fahrenheit:.1f} °F")
```
