---
title: "Programa — variáveis para produto (nome, qtd, preço)"
slug: "aula-03-12-programa-tipos-produto"
difficulty: "medium"
concepts: ["tipos básicos int, float, bool, str", "declarar variáveis com nomes claros"]
discipline: "python"
learning_goal: "Ler nome (str), quantidade (int) e preço (float) e exibir em uma linha."
exercise_type: "full_program"
stage: 12
context: "validação de dados"
test_cases:
  - input: "Caneta\n10\n2.50"
    output: "Caneta 10 2.5"
---

## Enunciado

Escreva um programa que leia três entradas: nome do produto (string), quantidade (inteiro) e preço unitário (float). Exiba os três valores em uma linha, separados por espaço. Use conversão explícita para int e float.

## Solução

```python
nome = input()
quantidade = int(input())
preco = float(input())
print(nome, quantidade, preco)
```
