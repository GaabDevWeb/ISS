---
title: "HARD — Soma da diagonal principal"
slug: "py-hard-35-programa-traco-matriz-quadrada"
difficulty: "hard"
concepts: ["loops aninhados (linha e coluna)", "acumulador (inicialização e +=)"]
discipline: "python"
learning_goal: "Índice linha==coluna em matriz lida da entrada."
exercise_type: "full_program"
stage: 20
context: "monitoramento"
test_cases:
  - input: "2\n1 2\n3 4"
    output: "5"
---

## Enunciado

Leia N, depois N linhas com N inteiros cada (matriz). Imprima soma dos elementos onde índice de linha == índice de coluna.

## Solução

```python
n = int(input())
s = 0
for i in range(n):
    linha = input().split()
    s += int(linha[i])
print(s)
```
