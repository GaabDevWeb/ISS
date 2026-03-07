---
title: "Raiz quadrada com operador **"
slug: "raiz-quadrada-potencia"
difficulty: "easy"
concepts: "operador **, potência 0.5, variáveis"
discipline: "python"
---

## Enunciado

Crie um programa que leia um número real positivo e calcule a raiz quadrada desse número usando apenas operadores aritméticos (dica: raiz quadrada = potência de 1/2, ou seja, `x ** 0.5`). Exiba o resultado com duas casas decimais.

Use `float(input(...))` para ler o valor e f-string com `:.2f` para formatar a saída.

## Solução

```python
numero = float(input("Digite um número positivo: "))
raiz = numero ** 0.5
print(f"Raiz quadrada: {raiz:.2f}")
```
