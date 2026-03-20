---
title: "Programa — média de temperaturas (simulação de API)"
slug: "aula-13-36-programa-media-temperaturas-api"
difficulty: "medium"
concepts: ["acumulador (inicialização e +=)", "len() em coleções", "formatação f-string e .format() na tabuada"]
discipline: "python"
learning_goal: "Ler N temperaturas, acumular e exibir média com duas casas decimais."
exercise_type: "full_program"
stage: 12
context: "processamento de dados de API"
test_cases:
  - input: "3\n10\n20\n30"
    output: "20.00"
---

## Enunciado

Programa: lê N>0, lê N floats (temperaturas), imprime a média com exatamente duas casas decimais.

## Solução

```python
n = int(input())
soma = 0.0
for _ in range(n):
    soma += float(input())
print(f'{soma / n:.2f}')
```
