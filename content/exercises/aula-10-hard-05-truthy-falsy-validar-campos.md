---
title: "Validar preenchimento de campos (truthy/falsy)"
slug: "aula-10-hard-05-truthy-falsy-validar-campos"
difficulty: "hard"
concepts: ["truthy e falsy em Python", "operadores lógicos"]
discipline: "python"
learning_goal: "Verificar se nome e email estão preenchidos usando truthy."
exercise_type: "full_program"
stage: 16
context: "validação de entrada"
test_cases:
  - input: "João\njoao@email.com"
    output: "válido"
  - input: "  \njoao@email.com"
    output: "inválido"
---

## Enunciado

Escreva um programa que leia duas linhas: nome e email. Exiba "válido" se ambos estiverem preenchidos (após strip(), a string não for vazia, ou seja truthy); "inválido" caso contrário. Use if nome.strip() and email.strip(): ...

## Solução

```python
nome = input()
email = input()
if nome.strip() and email.strip():
    print("válido")
else:
    print("inválido")
```
