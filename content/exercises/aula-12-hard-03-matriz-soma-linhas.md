---
title: "Soma de cada linha de matriz (loops aninhados e acumulador)"
slug: "aula-12-hard-03-matriz-soma-linhas"
difficulty: "hard"
concepts: ["loops aninhados", "acumuladores", "matriz 2D"]
discipline: "python"
learning_goal: "Ler matriz LxC e exibir a soma de cada linha."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "2\n3\n1\n2\n3\n4\n5\n6"
    output: "6 15"
---

## Enunciado

Escreva um programa que leia L (linhas) e C (colunas), depois L*C números (linha por linha). Para cada uma das L linhas, acumule a soma dos C valores e exiba essa soma. Use for i in range(L): e dentro for j in range(C): lendo um número e somando em acumulador da linha; ao final da linha interna exiba a soma e zere (ou use soma_linha = 0 no início de cada linha).

## Solução

```python
l = int(input())
c = int(input())
for _ in range(l):
    soma_linha = 0
    for _ in range(c):
        soma_linha += float(input())
    print(soma_linha)
```
