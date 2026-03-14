---
title: "Desconto especial por idade e renda (and/or)"
slug: "aula-10-hard-07-idade-renda-and-or"
difficulty: "hard"
concepts: ["operadores lógicos and, or", "tabela-verdade"]
discipline: "python"
learning_goal: "Aplicar regra: desconto se (idade >= 60) ou (renda < 2000 e idade >= 18)."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "65\n3000"
    output: "sim"
  - input: "25\n1500"
    output: "sim"
  - input: "25\n5000"
    output: "não"
---

## Enunciado

Escreva um programa que leia idade (int) e renda (float). Exiba "sim" se tiver direito a desconto: (idade >= 60) ou (renda < 2000 e idade >= 18); senão "não". Use uma expressão com or e and.

## Solução

```python
idade = int(input())
renda = float(input())
if idade >= 60 or (renda < 2000 and idade >= 18):
    print("sim")
else:
    print("não")
```
