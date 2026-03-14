---
title: "Programa — exibir tamanho da string lida"
slug: "aula-07-12-programa-validar-tamanho"
difficulty: "easy"
concepts: ["função len para tamanho de strings", "input()"]
discipline: "python"
learning_goal: "Ler string e exibir seu tamanho (número de caracteres) com len()."
exercise_type: "full_program"
stage: 12
context: "validação de entrada"
test_cases:
  - input: "senha123"
    output: "8"
  - input: "abc"
    output: "3"
---

## Enunciado

Escreva um programa que leia uma string e exiba apenas o número de caracteres (o tamanho). Use a função len().

## Solução

```python
s = input()
print(len(s))
```
