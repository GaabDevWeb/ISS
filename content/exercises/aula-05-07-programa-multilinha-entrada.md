---
title: "Programa — montar texto multilinha a partir de entradas"
slug: "aula-05-07-programa-multilinha-entrada"
difficulty: "medium"
concepts: ["strings multilinha", "literais de string"]
discipline: "python"
learning_goal: "Ler três linhas e exibi-las como um único texto multilinha."
exercise_type: "full_program"
stage: 11
context: "processamento de texto"
test_cases:
  - input: "A\nB\nC"
    output: "A\nB\nC"
---

## Enunciado

Escreva um programa que leia três linhas (uma por vez) e exiba as três em sequência, cada uma em uma linha (ou seja, o mesmo efeito de três prints).

## Solução

```python
a = input()
b = input()
c = input()
print(a)
print(b)
print(c)
```
