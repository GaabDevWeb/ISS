---
title: "Tipo de conta bancária com match/case"
slug: "aula-10-hard-06-tipo-conta-match"
difficulty: "hard"
concepts: ["match/case", "pattern matching"]
discipline: "python"
learning_goal: "Mapear letra (P, C, E) para tipo de conta com match em string."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "P"
    output: "poupança"
  - input: "C"
    output: "corrente"
  - input: "E"
    output: "empresarial"
---

## Enunciado

Escreva um programa que leia uma letra (P, C ou E). Use match/case com strings: "P" -> "poupança", "C" -> "corrente", "E" -> "empresarial". Para outro valor exiba "desconhecido". Use input().strip().upper() para normalizar.

## Solução

```python
tipo = input().strip().upper()
match tipo:
    case "P":
        print("poupança")
    case "C":
        print("corrente")
    case "E":
        print("empresarial")
    case _:
        print("desconhecido")
```
