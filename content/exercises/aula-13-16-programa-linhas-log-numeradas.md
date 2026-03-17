---
title: "Programa — numerar linhas de log com enumerate"
slug: "aula-13-16-programa-linhas-log-numeradas"
difficulty: "medium"
concepts: ["enumerate", "processamento de texto", "input"]
discipline: "python"
learning_goal: "Ler N linhas de log e exibir cada uma com número de linha (1-based) usando enumerate."
exercise_type: "full_program"
stage: 7
context: "análise de logs"
test_cases:
  - input: "3\nINFO start\nERROR timeout\nINFO end"
    output: "1 INFO start\n2 ERROR timeout\n3 INFO end"
---

## Enunciado

Escreva um programa que lê um inteiro N, depois N linhas de texto (simulando linhas de log). Exiba cada linha no formato "número_linha conteúdo", com número começando em 1. Use um loop que lê N linhas e `enumerate` começando em 1 (ou `i+1` no print).

## Solução

```python
n = int(input())
linhas = []
for _ in range(n):
    linhas.append(input())
for i, linha in enumerate(linhas):
    print(f'{i + 1} {linha}')
```

Ou sem armazenar todas: ler e imprimir em um único loop com enumerate sobre range e input.
