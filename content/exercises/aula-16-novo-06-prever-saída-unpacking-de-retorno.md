---
title: Prever saída — unpacking de retorno
slug: aula-16-novo-06-prever-saída-unpacking-de-retorno
difficulty: medium
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
exercise_type: predict_output
stage: 3
context: pipeline ETL
test_cases:
- input: ''
  output: '5

    6'
---

## Enunciado

Qual a saída?

```python
def stats(a, b):
    return a + b, a * b

soma, prod = stats(2, 3)
print(soma)
print(prod)
```

## Solução

```python
def stats(a, b):
    return a + b, a * b

soma, prod = stats(2, 3)
print(soma)
print(prod)
```
