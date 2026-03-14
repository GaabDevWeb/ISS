---
title: "Relatório de percentuais com formatação decimal"
slug: "aula-08-hard-06-relatorio-percentuais"
difficulty: "hard"
concepts: ["f-strings", ":.2f e :.3f", "input()", "conversão de tipos"]
discipline: "python"
learning_goal: "Calcular e exibir percentuais de totais com formatação consistente."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "100\n25\n30\n45"
    output: "25.00 (25.000%)\n30.00 (30.000%)\n45.00 (45.000%)"
---

## Enunciado

Escreva um programa que leia um total (float) e três valores (float, um por linha). Para cada um dos três valores, exiba uma linha no formato "VALOR (PERCENTUAL%)" onde VALOR tem 2 decimais e PERCENTUAL = (valor/total)*100 com 3 decimais. Use f-strings. Assuma total > 0.

## Solução

```python
total = float(input())
for _ in range(3):
    valor = float(input())
    pct = (valor / total) * 100
    print(f"{valor:.2f} ({pct:.3f}%)")
```
