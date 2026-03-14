---
title: "Status de pedido com match/case (códigos 1-5)"
slug: "aula-10-hard-03-status-pedido-match"
difficulty: "hard"
concepts: ["match/case", "case _"]
discipline: "python"
learning_goal: "Mapear códigos de status para mensagens com match/case."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "1"
    output: "pendente"
  - input: "3"
    output: "em trânsito"
  - input: "9"
    output: "desconhecido"
---

## Enunciado

Escreva um programa que leia um inteiro (código de status). Use match/case: 1 -> "pendente", 2 -> "confirmado", 3 -> "em trânsito", 4 -> "entregue", 5 -> "cancelado". Para qualquer outro valor exiba "desconhecido" (case _).

## Solução

```python
codigo = int(input())
match codigo:
    case 1: print("pendente")
    case 2: print("confirmado")
    case 3: print("em trânsito")
    case 4: print("entregue")
    case 5: print("cancelado")
    case _: print("desconhecido")
```
