---
title: Implementar — bubble sort (lista pequena)
slug: aula-16-novo-07-implementar-bubble-sort-lista-pequena
difficulty: hard
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
exercise_type: implement_function
stage: 4
context: pipeline ETL
test_cases:
- input: '3

    1

    2

    5

    4

    '
  output: '1

    2

    3

    4

    5'
---

## Enunciado

Leia 5 inteiros (um por linha), ordene com Bubble Sort e imprima a lista ordenada (um por linha).

## Solução

```python
nums = [int(input()) for _ in range(5)]
for i in range(len(nums)):
    for j in range(0, len(nums) - 1 - i):
        if nums[j] > nums[j + 1]:
            aux = nums[j]
            nums[j] = nums[j + 1]
            nums[j + 1] = aux
for n in nums:
    print(n)
```
