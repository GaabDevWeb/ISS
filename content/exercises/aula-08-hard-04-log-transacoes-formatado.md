---
title: "Log de transações com timestamp e valor formatado"
slug: "aula-08-hard-04-log-transacoes-formatado"
difficulty: "hard"
concepts: ["f-strings", "input()", ":.2f", "método format()"]
discipline: "python"
learning_goal: "Ler N transações (tipo, valor) e gerar log formatado com alinhamento."
exercise_type: "full_program"
stage: 17
context: "logs"
test_cases:
  - input: "3\nDEP\n100.5\nSAQ\n50.25\nDEP\n200"
    output: "DEP    100.50\nSAQ     50.25\nDEP    200.00"
---

## Enunciado

Escreva um programa que leia um inteiro N e, para cada uma das N linhas, leia duas entradas: tipo (DEP ou SAQ) e valor (float). Exiba N linhas no formato "TIPO   VALOR" com valor sempre com 2 decimais e tipo com 6 caracteres (alinhado à esquerda). Use f-string com `{tipo:<6}` e `{valor:.2f}`. Use for e range(N).

## Solução

```python
n = int(input())
for _ in range(n):
    tipo = input()
    valor = float(input())
    print(f"{tipo:<6}{valor:.2f}")
```
