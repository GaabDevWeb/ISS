---
title: "Corrigir — divisor da média"
slug: "aula-13-06-corrigir-media-divisor"
difficulty: "easy"
concepts: ["acumulador", "média", "range"]
discipline: "python"
learning_goal: "Corrigir o uso do divisor na média (quantidade de elementos, não último índice)."
exercise_type: "fix_bug"
stage: 2
context: "validação de dados"
expected_output: "Media: 4.00"
---

## Enunciado

O código abaixo lê 5 números e deveria exibir a média com duas casas decimais. Para entradas 2, 4, 4, 6, 4 a média correta é 4.0. Corrija o bug no cálculo da média (use a quantidade de elementos, não o último índice).

```python
soma = 0
for i in range(5):
    soma += float(input())
media = soma / i  # bug: i vale 4 na última iteração
print(f'Media: {media:.2f}')
```

## Solução

```python
soma = 0
for i in range(5):
    soma += float(input())
media = soma / 5
print(f'Media: {media:.2f}')
```

Ou, de forma dinâmica: `media = soma / 5` (ou usar uma variável `n = 5` e dividir por `n`).
