---
title: "Programa — exibir se string está preenchida (truthy)"
slug: "aula-10-12-programa-truthy-string"
difficulty: "medium"
concepts: ["truthy e falsy em Python", "validação de entrada"]
discipline: "python"
learning_goal: "Ler string e exibir 'Preenchido' ou 'Vazio' conforme truthy/falsy."
exercise_type: "full_program"
stage: 12
context: "validação de entrada"
test_cases:
  - input: "abc"
    output: "Preenchido"
  - input: ""
    output: "Vazio"
---

## Enunciado

Escreva um programa que leia uma linha. Se a string não for vazia (truthy), exiba "Preenchido"; caso contrário, "Vazio". Use apenas if texto: / else.

## Solução

```python
texto = input()
if texto:
    print("Preenchido")
else:
    print("Vazio")
```
