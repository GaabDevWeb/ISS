---
title: Completar — continue em validação de preço
slug: aula-16-novo-04-completar-continue-em-validação-de-preço
difficulty: easy
concepts:
- bubble sort
- algoritmo de ordenação por comparação
- referência mutável de lista
- list.copy()
- módulo random
- random.randint(a, b)
- while True com break
- continue
discipline: python
learning_goal: Praticar loops, controle de fluxo e composição de funções em cenários
  aplicados.
exercise_type: complete_the_code
stage: 2
context: validação de entrada
test_cases:
- input: '1

    -2

    3

    '
  output: '4.0'
---

## Enunciado

Complete para ignorar valores negativos e continuar. O programa lê 3 floats e soma apenas os não negativos.

```python
total = 0.0
for _ in range(3):
    v = float(input())
    if v < 0:
        _________
    total += v
print(f"{total:.1f}")
```

## Solução

```python
total = 0.0
for _ in range(3):
    v = float(input())
    if v < 0:
        continue
    total += v
print(f"{total:.1f}")
```
