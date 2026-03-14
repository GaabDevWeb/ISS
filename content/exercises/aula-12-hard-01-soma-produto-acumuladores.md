---
title: "Soma e produto de N números com acumuladores"
slug: "aula-12-hard-01-soma-produto-acumuladores"
difficulty: "hard"
concepts: ["acumuladores", "+=", "range", "for"]
discipline: "python"
learning_goal: "Ler N números e exibir soma e produto usando dois acumuladores."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "3\n2\n3\n4"
    output: "9 24"
---

## Enunciado

Escreva um programa que leia N (int) e depois N números (float). Calcule a soma e o produto (inicialize produto com 1) e exiba "soma produto" na mesma linha. Use for _ in range(N): com soma += x e produto *= x.

## Solução

```python
n = int(input())
soma = 0
produto = 1
for _ in range(n):
    x = float(input())
    soma += x
    produto *= x
print(soma, produto)
```
