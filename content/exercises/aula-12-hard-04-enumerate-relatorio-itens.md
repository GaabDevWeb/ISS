---
title: "Relatório numerado de itens com enumerate (N linhas)"
slug: "aula-12-hard-04-enumerate-relatorio-itens"
difficulty: "hard"
concepts: ["for", "range", "relatórios numéricos"]
discipline: "python"
learning_goal: "Ler N itens e exibir cada um com número de linha (1-based) usando índice do range."
exercise_type: "full_program"
stage: 17
context: "processamento de dados"
test_cases:
  - input: "3\nArroz\nFeijão\nÓleo"
    output: "1. Arroz\n2. Feijão\n3. Óleo"
---

## Enunciado

Escreva um programa que leia N (int) e depois N linhas (nomes de itens). Exiba cada item no formato "i. NOME" com i começando em 1. Use for com range(N), leia dentro do loop e use o índice do range para imprimir (i+1) e o nome. Ou use uma variável de índice manual.

## Solução

```python
n = int(input())
for i in range(n):
    item = input()
    print(f"{i + 1}. {item}")
```
