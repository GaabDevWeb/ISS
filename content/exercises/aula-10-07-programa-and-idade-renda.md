---
title: "Programa — elegível por idade e renda (and)"
slug: "aula-10-07-programa-and-idade-renda"
difficulty: "medium"
concepts: ["operadores lógicos and", "regras de negócio"]
discipline: "python"
learning_goal: "Ler idade e renda e exibir 'Elegível' apenas se idade >= 18 e renda > 0."
exercise_type: "full_program"
stage: 11
context: "validação de dados"
test_cases:
  - input: "20\n1500"
    output: "Elegível"
  - input: "17\n2000"
    output: "Não elegível"
---

## Enunciado

Escreva um programa que leia dois números (idade e renda). Exiba "Elegível" se idade >= 18 e renda > 0; caso contrário, "Não elegível". Use uma única condição com and.

## Solução

```python
idade = int(input())
renda = float(input())
if idade >= 18 and renda > 0:
    print("Elegível")
else:
    print("Não elegível")
```
