---
title: "Programa — média de N notas com acumulador"
slug: "aula-13-12-programa-media-n-notas"
difficulty: "medium"
concepts: ["acumulador", "range", "input", "média"]
discipline: "python"
learning_goal: "Ler N notas, acumular soma e exibir média com duas casas decimais."
exercise_type: "full_program"
stage: 4
context: "validação de dados"
test_cases:
  - input: "3\n8.0\n7.5\n9.0"
    output: "Media: 8.17"
  - input: "2\n10.0\n6.0"
    output: "Media: 8.00"
---

## Enunciado

Escreva um programa que: (1) lê um inteiro N; (2) lê N notas (float); (3) acumula a soma em um acumulador; (4) exibe "Media: X.XX" com duas casas decimais. Use `soma = 0` antes do loop e `soma += nota` dentro do `for i in range(N)`.

## Solução

```python
n = int(input())
soma = 0
for i in range(n):
    nota = float(input())
    soma += nota
media = soma / n if n > 0 else 0
print(f'Media: {media:.2f}')
```
