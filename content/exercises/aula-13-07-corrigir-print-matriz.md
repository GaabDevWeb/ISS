---
title: "Corrigir — quebra de linha na matriz"
slug: "aula-13-07-corrigir-print-matriz"
difficulty: "easy"
concepts: ["loops aninhados", "print(end=)"]
discipline: "python"
learning_goal: "Corrigir a saída por linha usando print() após o loop interno."
exercise_type: "fix_bug"
stage: 2
context: "processamento de dados"
expected_output: "(0,0) (0,1) \n(1,0) (1,1) \n"
---

## Enunciado

O código deveria imprimir as coordenadas (i,j) com uma linha do console por linha da matriz (2×2). Atualmente tudo sai em uma única linha. Corrija adicionando a chamada que quebra a linha após cada linha da matriz.

```python
for i in range(2):
    for j in range(2):
        print(f'({i},{j})', end=' ')
```

## Solução

```python
for i in range(2):
    for j in range(2):
        print(f'({i},{j})', end=' ')
    print()
```

O `print()` vazio após o loop interno imprime a quebra de linha.
