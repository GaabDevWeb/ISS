---
title: Corrigir bug — bubble sort trocando índices errados
slug: aula-16-pt2-02-corrigir-bug-bubble-sort-trocando-índices-errados
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
- acumuladores em loop while
- retorno múltiplo (tupla)
- tuple unpacking de retorno de função
- composição de três funções
- validação de entrada com float(input())
- tabela de descontos progressivos com if/elif/else
discipline: python
learning_goal: 'Praticar aula 16: controle de fluxo (while/break/continue), listas
  por referência/cópia, bubble sort, random e composição.'
exercise_type: fix_bug
stage: 4
context: pipeline ETL
test_cases:
- input: '3

    1

    2

    '
  output: '1

    2

    3'
---

## Enunciado

O código deveria ordenar a lista com Bubble Sort, mas está trocando elementos errados. Corrija.

```python
nums = [int(input()) for _ in range(3)]
for i in range(len(nums)):
    for j in range(0, len(nums) - 1 - i):
        if nums[j] > nums[j + 1]:
            aux = nums[j]
            nums[j] = nums[j + 1]
            nums[j] = aux
for n in nums:
    print(n)
```

## Solução

```python
nums = [int(input()) for _ in range(3)]
for i in range(len(nums)):
    for j in range(0, len(nums) - 1 - i):
        if nums[j] > nums[j + 1]:
            aux = nums[j]
            nums[j] = nums[j + 1]
            nums[j + 1] = aux
for n in nums:
    print(n)
```
