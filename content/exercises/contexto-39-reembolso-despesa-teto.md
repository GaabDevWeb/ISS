---
title: "Reembolso de despesa (valor e teto por categoria)"
slug: "contexto-39-reembolso-despesa-teto"
difficulty: "medium"
concepts: ["if/elif/else", "min() implícito", "formatação"]
discipline: "python"
learning_goal: "Calcular reembolso como mínimo entre despesa e teto da categoria."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "transporte\n120.00"
    output: "100.00"
  - input: "alimentacao\n50.00"
    output: "50.00"
---

## Enunciado

A empresa reembolsa até o teto por categoria: transporte R$ 100, alimentacao R$ 80, hospedagem R$ 400. O programa recebe a categoria (uma palavra) e o valor da despesa (float) e exibe o valor a reembolsar (o menor entre despesa e teto), com 2 decimais.

**Tarefa**  
Defina o teto pela categoria e exiba min(despesa, teto).

**Entrada**  
Duas linhas: categoria (transporte, alimentacao ou hospedagem) e valor. Minúsculas.

**Saída**  
Valor com duas casas decimais.

## Solução

```python
cat = input().strip().lower()
valor = float(input())
if cat == "transporte": teto = 100
elif cat == "alimentacao": teto = 80
else: teto = 400
reembolso = valor if valor < teto else teto
print(f"{reembolso:.2f}")
```
