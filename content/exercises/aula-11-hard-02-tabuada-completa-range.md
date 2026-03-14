---
title: "Tabuada completa de 1 a 10 com for aninhado"
slug: "aula-11-hard-02-tabuada-completa-range"
difficulty: "hard"
concepts: ["for", "range", "loops aninhados"]
discipline: "python"
learning_goal: "Gerar tabuadas de 1 a 10 usando dois for com range."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
expected_output: "1x1=1 1x2=2 ... 10x10=100 (exemplo)"
---

## Enunciado

Escreva um programa que exiba a tabuada de 1 a 10: para cada i de 1 a 10, exiba uma linha com i*1, i*2, ..., i*10 no formato "ixj=resultado" separados por espaço. Use for i in range(1, 11): e dentro for j in range(1, 11): e print com end=" " no loop interno; print() no final do loop externo.

## Solução

```python
for i in range(1, 11):
    for j in range(1, 11):
        print(f"{i}x{j}={i*j}", end=" ")
    print()
```
