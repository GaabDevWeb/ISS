---
title: "Programa — aprovado, recuperação ou reprovado"
slug: "aula-09-07-programa-aprovado-recuperacao"
difficulty: "medium"
concepts: ["if/elif/else", "operadores relacionais", "regras de negócio"]
discipline: "python"
learning_goal: "Implementar classificação de média em três faixas."
exercise_type: "full_program"
stage: 11
context: "validação de dados"
test_cases:
  - input: "7.0"
    output: "APROVADO"
  - input: "5.5"
    output: "RECUPERAÇÃO"
  - input: "4.0"
    output: "REPROVADO"
---

## Enunciado

Escreva um programa que leia a média final (float). Exiba "APROVADO" se media >= 7, "RECUPERAÇÃO" se media >= 5 e < 7, "REPROVADO" se media < 5. Use if/elif/else.

## Solução

```python
media = float(input())
if media >= 7:
    print("APROVADO")
elif media >= 5:
    print("RECUPERAÇÃO")
else:
    print("REPROVADO")
```
