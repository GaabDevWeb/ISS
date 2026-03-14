---
title: "Maior e menor entre N números (sem lista)"
slug: "aula-11-hard-05-maior-menor-n-numeros"
difficulty: "hard"
concepts: ["for", "range()", "iteração"]
discipline: "python"
learning_goal: "Ler N números e exibir o maior e o menor usando apenas variáveis e loop."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "4\n10\n5\n20\n3"
    output: "20 3"
---

## Enunciado

Escreva um programa que leia N (int) e depois N números (float). Exiba o maior e o menor valor na forma "maior menor". Use for e duas variáveis (maior e menor); na primeira iteração atribua o primeiro valor a ambas; nas seguintes atualize com max/min ou condicionais. Não use listas nem funções min/max.

## Solução

```python
n = int(input())
primeiro = float(input())
maior = primeiro
menor = primeiro
for _ in range(n - 1):
    x = float(input())
    if x > maior:
        maior = x
    if x < menor:
        menor = x
print(maior, menor)
```
