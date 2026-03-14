---
title: "Programa — nome e idade com f-string"
slug: "aula-08-07-programa-nome-idade-fstring"
difficulty: "medium"
concepts: ["f-strings", "input()", "conversão de tipos"]
discipline: "python"
learning_goal: "Ler nome e idade e exibir mensagem formatada com f-string."
exercise_type: "full_program"
stage: 11
context: "validação de entrada"
test_cases:
  - input: "Ana\n25"
    output: "Ana tem 25 anos."
---

## Enunciado

Escreva um programa que leia duas linhas: nome e idade (inteiro). Exiba uma linha no formato: "NOME tem IDADE anos." Use f-string.

## Solução

```python
nome = input()
idade = int(input())
print(f"{nome} tem {idade} anos.")
```
