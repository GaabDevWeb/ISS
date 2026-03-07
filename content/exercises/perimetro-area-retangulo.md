---
title: "Perímetro e área do retângulo"
slug: "perimetro-area-retangulo"
difficulty: "medium"
concepts: "input(), float(), operadores aritméticos, variáveis"
discipline: "python"
---

## Enunciado

Crie um programa que leia a base e a altura de um retângulo (dois números reais), calcule o perímetro (soma dos quatro lados) e a área (base × altura) e exiba os dois valores com duas casas decimais.

Use variáveis com nomes como `base` e `altura` e exiba uma mensagem clara para o usuário.

## Solução

```python
base = float(input("Digite a base do retângulo: "))
altura = float(input("Digite a altura do retângulo: "))
perimetro = 2 * base + 2 * altura
area = base * altura
print(f"Perímetro: {perimetro:.2f}")
print(f"Área: {area:.2f}")
```
