---
title: "Programa — contagem de códigos de status (API)"
slug: "aula-13-29-programa-api-status-codes"
difficulty: "hard"
concepts: ["enumerate", "acumulador", "condicional"]
discipline: "python"
learning_goal: "Ler N códigos de status e contar quantos são 200, 4xx e 5xx."
exercise_type: "full_program"
stage: 16
context: "processamento de dados de API"
test_cases:
  - input: "5\n200\n404\n200\n500\n200"
    output: "200: 3\n4xx: 1\n5xx: 1"
---

## Enunciado

Escreva um programa que lê um inteiro N e N códigos HTTP (inteiros). Conte quantos são 200, quantos estão na faixa 400-499 (4xx) e quantos na 500-599 (5xx). Exiba "200: X", "4xx: Y", "5xx: Z". Use três acumuladores e condicionais com comparações numéricas.

## Solução

```python
n = int(input())
c200 = 0
c4xx = 0
c5xx = 0
for i in range(n):
    cod = int(input())
    if cod == 200:
        c200 += 1
    elif 400 <= cod <= 499:
        c4xx += 1
    elif 500 <= cod <= 599:
        c5xx += 1
print(f'200: {c200}')
print(f'4xx: {c4xx}')
print(f'5xx: {c5xx}')
```
