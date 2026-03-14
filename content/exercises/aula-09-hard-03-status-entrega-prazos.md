---
title: "Status de entrega por prazos (no prazo, atrasado, urgente)"
slug: "aula-09-hard-03-status-entrega-prazos"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "modelar regras de negócio"]
discipline: "python"
learning_goal: "Determinar status a partir de dias restantes e prioridade."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5\n1"
    output: "urgente"
  - input: "10\n0"
    output: "atrasado"
  - input: "15\n1"
    output: "no prazo"
---

## Enunciado

Escreva um programa que leia dois inteiros: dias_restantes (dias até o prazo) e prioridade (0=normal, 1=alta). Exiba "atrasado" se dias_restantes < 0; "urgente" se dias_restantes <= 3 e prioridade == 1; "alerta" se dias_restantes <= 5; "no prazo" caso contrário. Use if/elif/else na ordem dada para não sobrescrever casos.

## Solução

```python
dias = int(input())
prioridade = int(input())
if dias < 0:
    print("atrasado")
elif dias <= 3 and prioridade == 1:
    print("urgente")
elif dias <= 5:
    print("alerta")
else:
    print("no prazo")
```
