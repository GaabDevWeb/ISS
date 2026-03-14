---
title: "Validação de bilhete único (saldo e tipo de transporte)"
slug: "contexto-31-bilhete-unicamente-transporte"
difficulty: "medium"
concepts: ["if/elif/else", "float", "strings"]
discipline: "python"
learning_goal: "Aprovar ou negar passagem por saldo e tipo (ônibus/metrô)."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5.50\nonibus"
    output: "Passagem liberada"
  - input: "2.00\nmetro"
    output: "Saldo insuficiente"
---

## Enunciado

Ônibus cobra R$ 4,50 e metrô R$ 5,50. O programa recebe saldo (float) e tipo ("onibus" ou "metro") e exibe "Passagem liberada" se o saldo for suficiente para a tarifa; "Saldo insuficiente" caso contrário. Comparação insensível a maiúsculas.

**Tarefa**  
Defina a tarifa pelo tipo e compare com o saldo.

**Entrada**  
Duas linhas: saldo e tipo.

**Saída**  
`Passagem liberada` ou `Saldo insuficiente`

## Solução

```python
saldo = float(input())
tipo = input().strip().lower()
tarifa = 5.50 if tipo == "metro" else 4.50
if saldo >= tarifa:
    print("Passagem liberada")
else:
    print("Saldo insuficiente")
```
