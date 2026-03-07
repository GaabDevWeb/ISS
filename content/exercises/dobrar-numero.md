---
title: "Dobrar um número lido do teclado"
slug: "dobrar-numero"
difficulty: "easy"
concepts: "input(), conversão de tipos, int()"
discipline: "python"
---

## Enunciado

Crie um programa que peça ao usuário um número inteiro (via `input()`), converta a entrada para inteiro, calcule o dobro desse número e exiba o resultado com uma mensagem usando f-string.

Exemplo de saída: `O dobro de 5 é 10.`

## Solução

```python
numero = int(input("Digite um número inteiro: "))
dobro = numero * 2
print(f"O dobro de {numero} é {dobro}.")
```
