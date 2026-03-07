---
title: "Nome e idade formatados"
slug: "nome-idade-formatado"
difficulty: "medium"
concepts: "input(), f-string, formatação de strings"
discipline: "python"
---

## Enunciado

Crie um programa que leia o nome e a idade de uma pessoa (uma string e um inteiro). Exiba uma única linha no formato: `Olá, [nome]! Você tem [idade] anos.`

Use `input()` para ambos os valores, converta a idade para `int()` e use f-string para montar a mensagem.

## Solução

```python
nome = input("Digite seu nome: ")
idade = int(input("Digite sua idade: "))
print(f"Olá, {nome}! Você tem {idade} anos.")
```
