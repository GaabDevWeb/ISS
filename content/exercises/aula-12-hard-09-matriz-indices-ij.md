---
title: "Preencher e exibir índices de matriz LxC (i, j)"
slug: "aula-12-hard-09-matriz-indices-ij"
difficulty: "hard"
concepts: ["loops aninhados", "matriz 2D (linha e coluna)", "range"]
discipline: "python"
learning_goal: "Ler L e C e exibir para cada célula (i, j) o par (i, j)."
exercise_type: "full_program"
stage: 17
context: "processamento de dados"
test_cases:
  - input: "2\n2"
    output: "(0,0) (0,1)\n(1,0) (1,1)"
---

## Enunciado

Escreva um programa que leia L (linhas) e C (colunas). Exiba L linhas: na linha i, exiba C pares no formato (i,j) para j de 0 a C-1, separados por espaço. Use for i in range(L): e for j in range(C): com print(..., end=" ") e print() ao final de cada linha.

## Solução

```python
l = int(input())
c = int(input())
for i in range(l):
    for j in range(c):
        print(f"({i},{j})", end=" ")
    print()
```
