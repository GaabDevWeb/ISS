---
title: "Dia útil ou fim de semana com match e operador not"
slug: "aula-10-hard-04-dia-util-fim-de-semana"
difficulty: "hard"
concepts: ["match/case", "operadores lógicos"]
discipline: "python"
learning_goal: "Usar match para dia da semana e combinar com not para exceções."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "2"
    output: "dia útil"
  - input: "7"
    output: "fim de semana"
---

## Enunciado

Escreva um programa que leia um inteiro de 1 (domingo) a 7 (sábado). Exiba "fim de semana" para 1 e 7; "dia útil" para 2 a 6. Use match/case agrupando cases: case 1 | 7: e case 2 | 3 | 4 | 5 | 6: (ou case _ após 1 e 7).

## Solução

```python
dia = int(input())
match dia:
    case 1 | 7:
        print("fim de semana")
    case 2 | 3 | 4 | 5 | 6:
        print("dia útil")
    case _:
        print("inválido")
```
