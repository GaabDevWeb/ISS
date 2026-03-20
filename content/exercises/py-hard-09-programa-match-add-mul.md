---
title: "HARD — Máquina de acumulador com match"
slug: "py-hard-09-programa-match-add-mul"
difficulty: "hard"
concepts: ["match/case", "acumulador (inicialização e +=)"]
discipline: "python"
learning_goal: "Interpretar comandos ADD/MUL com match."
exercise_type: "full_program"
stage: 20
context: "análise de logs"
test_cases:
  - input: "ADD 4\nMUL 3\nEND"
    output: "12"
---

## Enunciado

Acumulador inicia em 1. Leia linhas até `END`. Linhas `ADD n` ou `MUL n` (n inteiro). `ADD` soma; `MUL` multiplica. Imprima acumulador final.

## Solução

```python
a = 1
while True:
    linha = input()
    if linha == 'END':
        break
    cmd, ns = linha.split()
    n = int(ns)
    match cmd:
        case 'ADD':
            a += n
        case 'MUL':
            a *= n
print(a)
```
