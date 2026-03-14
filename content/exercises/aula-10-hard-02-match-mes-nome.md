---
title: "Conversão número do mês para nome com match/case"
slug: "aula-10-hard-02-match-mes-nome"
difficulty: "hard"
concepts: ["match/case", "pattern matching estrutural", "seleção múltipla"]
discipline: "python"
learning_goal: "Usar match/case para mapear 1-12 para nomes dos meses."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "1"
    output: "janeiro"
  - input: "12"
    output: "dezembro"
  - input: "0"
    output: "inválido"
---

## Enunciado

Escreva um programa que leia um inteiro (1 a 12) e exiba o nome do mês em minúsculas (janeiro, fevereiro, ..., dezembro). Use match/case com 12 cases e case _ para valor inválido exibindo "inválido".

## Solução

```python
n = int(input())
match n:
    case 1: print("janeiro")
    case 2: print("fevereiro")
    case 3: print("março")
    case 4: print("abril")
    case 5: print("maio")
    case 6: print("junho")
    case 7: print("julho")
    case 8: print("agosto")
    case 9: print("setembro")
    case 10: print("outubro")
    case 11: print("novembro")
    case 12: print("dezembro")
    case _: print("inválido")
```
