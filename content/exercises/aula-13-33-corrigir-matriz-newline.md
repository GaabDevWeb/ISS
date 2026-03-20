---
title: "Corrigir — quebra de linha na grade de métricas"
slug: "aula-13-33-corrigir-matriz-newline"
difficulty: "medium"
concepts: ["loops aninhados (linha e coluna)", "print(end=) e concatenação por linha"]
discipline: "python"
learning_goal: "Garantir nova linha após cada linha da matriz no laço externo."
exercise_type: "fix_bug"
stage: 8
context: "monitoramento"
expected_output: "1 2 \n3 4 "
---

## Enunciado

A grade 2×2 deveria ter duas linhas; tudo sai na mesma linha. Corrija.

```python
for linha in range(2):
    for col in range(2):
        valor = linha * 2 + col + 1
        print(valor, end=' ')
```

## Solução

```python
for linha in range(2):
    for col in range(2):
        valor = linha * 2 + col + 1
        print(valor, end=' ')
    print()
```
