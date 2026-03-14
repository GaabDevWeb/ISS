---
title: "Extrato bancário com descrição e valor formatados"
slug: "aula-08-hard-09-extrato-bancario-formatado"
difficulty: "hard"
concepts: ["f-strings", "input()", ":.2f", "formatação"]
discipline: "python"
learning_goal: "Ler N movimentações e exibir extrato com colunas alinhadas."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "2\nDepósito\n100.5\nSaque\n-50.25"
    output: "Depósito    100.50\nSaque       -50.25"
---

## Enunciado

Escreva um programa que leia N (int) e, para cada uma das N movimentações, leia descrição (string) e valor (float). Exiba N linhas no formato "DESCRICAO   VALOR" com descrição em 12 caracteres à esquerda e valor com 2 decimais (incluindo sinal para negativos). Use f-strings: `{desc:<12}` e `{valor:.2f}`.

## Solução

```python
n = int(input())
for _ in range(n):
    desc = input()
    valor = float(input())
    print(f"{desc:<12}{valor:.2f}")
```
