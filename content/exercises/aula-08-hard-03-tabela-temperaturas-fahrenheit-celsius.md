---
title: "Tabela Fahrenheit–Celsius com formatação alinhada"
slug: "aula-08-hard-03-tabela-temperaturas-fahrenheit-celsius"
difficulty: "hard"
concepts: ["f-strings", "formatação :.2f", "interpolação de strings"]
discipline: "python"
learning_goal: "Gerar tabela de conversão com colunas alinhadas e decimais controlados."
exercise_type: "full_program"
stage: 16
context: "processamento de dados"
expected_output: |
  F       C
  0.00    -17.78
  20.00   -6.67
  40.00   4.44
  60.00   15.56
  80.00   26.67
  100.00  37.78
---

## Enunciado

Escreva um programa que exiba uma tabela de conversão Fahrenheit para Celsius. A primeira linha deve ser "F       C" (cabeçalho). Nas linhas seguintes, para F = 0, 20, 40, 60, 80, 100, exiba F com 2 decimais, espaços, e C = (F - 32) * 5/9 com 2 decimais. Use um for com range(0, 101, 20) e f-strings com formatação fixa (ex.: `{f:6.2f}` e `{c:6.2f}`) para alinhar as colunas.

## Solução

```python
print("F       C")
for f in range(0, 101, 20):
    c = (f - 32) * 5 / 9
    print(f"{f:6.2f}    {c:6.2f}")
```
