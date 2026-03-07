---
title: "Divisão inteira e resto"
slug: "divisao-inteira-resto"
difficulty: "easy"
concepts: "operadores // e %, int, operadores aritméticos"
discipline: "python"
---

## Enunciado

Crie um programa que leia dois números inteiros (dividendo e divisor), calcule o quociente inteiro (divisão com `//`) e o resto (operador `%`) e exiba os dois resultados em uma única linha com f-string.

Exemplo: para 17 e 4, a saída deve indicar quociente 4 e resto 1.

## Solução

```python
dividendo = int(input("Digite o dividendo: "))
divisor = int(input("Digite o divisor: "))
quociente = dividendo // divisor
resto = dividendo % divisor
print(f"Quociente: {quociente}, Resto: {resto}")
```
