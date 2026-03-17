---
title: "Prever saída — coordenadas de matriz 2×2"
slug: "aula-13-03-prever-saida-matriz-coordenadas"
difficulty: "easy"
concepts: ["loops aninhados", "print(end=)"]
discipline: "python"
learning_goal: "Prever a ordem de impressão das coordenadas (i,j) em loops aninhados."
exercise_type: "predict_output"
stage: 1
context: "processamento de dados"
expected_output: "(0,0) (0,1) \n(1,0) (1,1)"
---

## Enunciado

Qual é a saída do programa abaixo? Considere a ordem em que os pares (i, j) são impressos.

```python
for i in range(2):
    for j in range(2):
        print(f'({i},{j})', end=' ')
    print()
```

## Solução

A saída é (com espaço no final de cada linha, depois quebra):

```
(0,0) (0,1) 
(1,0) (1,1) 
```

O laço externo percorre as linhas (i); o interno, as colunas (j). O `print()` vazio quebra a linha após cada linha da matriz.
