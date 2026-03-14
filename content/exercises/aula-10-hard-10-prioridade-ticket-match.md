---
title: "Prioridade de atendimento com match/case (1-4)"
slug: "aula-10-hard-10-prioridade-ticket-match"
difficulty: "hard"
concepts: ["match/case", "case _"]
discipline: "python"
learning_goal: "Mapear nível de prioridade para label com match/case."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "1"
    output: "crítica"
  - input: "4"
    output: "baixa"
---

## Enunciado

Escreva um programa que leia um inteiro de 1 a 4 (prioridade). Use match/case: 1 -> "crítica", 2 -> "alta", 3 -> "média", 4 -> "baixa". Para outro valor exiba "inválido".

## Solução

```python
n = int(input())
match n:
    case 1: print("crítica")
    case 2: print("alta")
    case 3: print("média")
    case 4: print("baixa")
    case _: print("inválido")
```
