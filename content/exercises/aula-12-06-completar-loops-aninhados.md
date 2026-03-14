---
title: "Completar loops aninhados (matriz)"
slug: "aula-12-06-completar-loops-aninhados"
difficulty: "easy"
concepts: ["loops aninhados", "matriz 2D (linha e coluna)"]
discipline: "python"
learning_goal: "Preencher loop interno para percorrer linha e coluna (ex.: 2x2)."
exercise_type: "complete_the_code"
stage: 3
context: "processamento de dados"
expected_output: "(0,0) (0,1) (1,0) (1,1)"
---

## Enunciado

Complete o loop interno para exibir coordenadas (i, j) para i e j em 0 e 1. Use dois for aninhados com range(2). Formato da saída: (0,0) (0,1) (1,0) (1,1) (pode ser uma linha com end=" " ou uma por linha).

```python
for i in range(2):
    for j in range(_____):  # preencha: 2
        print(f"({i},{j})", end=" ")
```

## Solução

```python
for i in range(2):
    for j in range(2):
        print(f"({i},{j})", end=" ")
```
