---
title: "Estender — tabuada e média dos produtos"
slug: "aula-13-18-estender-tabuada-media"
difficulty: "medium"
concepts: ["tabuada", "acumulador", "range(11)"]
discipline: "python"
learning_goal: "Estender tabuada para também calcular e exibir a média dos produtos (0 a 10)."
exercise_type: "extend_code"
stage: 7
context: "processamento de dados"
expected_output: "Media dos produtos: 25.0"
---

## Enunciado

O código abaixo imprime a tabuada do 5. Estenda-o para, após o loop, calcular a média dos 11 produtos (5×0 até 5×10) e exibir "Media dos produtos: X.X". Use um acumulador para somar os produtos e divida por 11 ao final.

```python
n = 5
for i in range(11):
    print(f'{n} x {i} = {n * i}')
```

## Solução

```python
n = 5
soma = 0
for i in range(11):
    prod = n * i
    print(f'{n} x {i} = {prod}')
    soma += prod
media = soma / 11
print(f'Media dos produtos: {media}')
```
