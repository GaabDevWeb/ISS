---
title: "Elegibilidade para empréstimo (idade, renda e score)"
slug: "aula-10-hard-01-elegivel-emprestimo-and-or"
difficulty: "hard"
concepts: ["operadores lógicos and, or", "combinar condições", "regras de negócio"]
discipline: "python"
learning_goal: "Avaliar elegibilidade com múltiplas condições combinadas por and/or."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "25\n5000\n750"
    output: "elegível"
  - input: "20\n3000\n600"
    output: "não elegível"
---

## Enunciado

Escreva um programa que leia idade (int), renda (float) e score (int). Exiba "elegível" se (idade >= 21 e renda >= 2000) e score >= 600; senão "não elegível". Use uma única expressão booleana com and.

## Solução

```python
idade = int(input())
renda = float(input())
score = int(input())
if idade >= 21 and renda >= 2000 and score >= 600:
    print("elegível")
else:
    print("não elegível")
```
