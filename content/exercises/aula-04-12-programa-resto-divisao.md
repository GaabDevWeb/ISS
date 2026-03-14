---
title: "Programa — resto da divisão (módulo)"
slug: "aula-04-12-programa-resto-divisao"
difficulty: "medium"
concepts: ["operadores aritméticos", "módulo %", "divisão inteira //"]
discipline: "python"
learning_goal: "Ler dois inteiros e exibir quociente inteiro e resto da divisão."
exercise_type: "full_program"
stage: 12
context: "validação de dados"
test_cases:
  - input: "17\n5"
    output: "3 2"
---

## Enunciado

Escreva um programa que leia dois números inteiros (dividendo e divisor) e exiba na mesma linha o quociente inteiro e o resto (separados por espaço). Use // e %.

## Solução

```python
a = int(input())
b = int(input())
print(a // b, a % b)
```
