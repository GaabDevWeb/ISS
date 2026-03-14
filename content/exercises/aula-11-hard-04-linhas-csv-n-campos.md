---
title: "Processar N linhas CSV e exibir primeiro campo"
slug: "aula-11-hard-04-linhas-csv-n-campos"
difficulty: "hard"
concepts: ["for", "range()", "split", "iteração"]
discipline: "python"
learning_goal: "Ler N linhas no formato CSV e exibir o primeiro campo de cada."
exercise_type: "full_program"
stage: 18
context: "parsing de CSV/arquivos"
test_cases:
  - input: "3\nJoão,25,SP\nMaria,30,RJ\nPedro,22,MG"
    output: "João\nMaria\nPedro"
---

## Enunciado

Escreva um programa que leia um inteiro N e depois N linhas (cada uma no formato "campo1,campo2,..."). Para cada linha, exiba apenas o primeiro campo (antes da primeira vírgula). Use for _ in range(N): e split(',')[0].

## Solução

```python
n = int(input())
for _ in range(n):
    linha = input()
    primeiro = linha.split(",")[0]
    print(primeiro)
```
