---
title: "Aprovação de limite de crédito por renda e score"
slug: "aula-09-hard-09-limite-credito-aprovacao"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Combinar condições de renda e score para aprovar ou negar."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5000\n700"
    output: "aprovado"
  - input: "2000\n800"
    output: "analise"
  - input: "1000\n500"
    output: "negado"
---

## Enunciado

Escreva um programa que leia renda (float) e score (int, 0-1000). Exiba "aprovado" se renda >= 3000 e score >= 600; "analise" se score >= 700 ou renda >= 5000; "negado" caso contrário. Use if/elif/else nessa ordem para capturar primeiro o aprovado, depois analise, depois negado.

## Solução

```python
renda = float(input())
score = int(input())
if renda >= 3000 and score >= 600:
    print("aprovado")
elif score >= 700 or renda >= 5000:
    print("analise")
else:
    print("negado")
```
