---
title: "Conversão de temperaturas em múltiplas escalas (F, C, K)"
slug: "aula-08-hard-08-converter-multiplas-escalas"
difficulty: "hard"
concepts: ["input()", "conversão de tipos", "f-strings", ":.2f"]
discipline: "python"
learning_goal: "Ler temperatura em uma escala e exibir equivalências formatadas."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "C\n25"
    output: "F: 77.00 | K: 298.15"
---

## Enunciado

Escreva um programa que leia a escala de entrada (uma letra: F, C ou K) e depois o valor (float). Exiba as outras duas escalas com 2 decimais no formato "F: X.XX | K: Y.YY" (ou o par correspondente). Regras: C para F: F = C*9/5+32; C para K: K = C+273.15; F para C: C = (F-32)*5/9; K para C: C = K-273.15. Use condicionais para decidir a conversão e f-strings para a saída.

## Solução

```python
escala = input().strip()
valor = float(input())
if escala == "C":
    f = valor * 9/5 + 32
    k = valor + 273.15
    print(f"F: {f:.2f} | K: {k:.2f}")
elif escala == "F":
    c = (valor - 32) * 5/9
    k = c + 273.15
    print(f"C: {c:.2f} | K: {k:.2f}")
else:
    c = valor - 273.15
    f = c * 9/5 + 32
    print(f"C: {c:.2f} | F: {f:.2f}")
```
