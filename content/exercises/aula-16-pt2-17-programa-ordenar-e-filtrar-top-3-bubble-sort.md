---
title: Programa — ordenar e filtrar top-3 (bubble sort)
slug: aula-16-pt2-17-programa-ordenar-e-filtrar-top-3-bubble-sort
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
exercise_type: full_program
stage: 5
context: pipeline ETL
test_cases:
- input: '1

    9

    3

    7

    5

    2

    '
  output: '9

    7

    5'
---

## Enunciado

Leia 6 inteiros. Ordene com Bubble Sort e imprima os 3 maiores (um por linha), do maior para o menor.

## Solução

```python
nums = [int(input()) for _ in range(6)]
for i in range(len(nums)):
    for j in range(0, len(nums) - 1 - i):
        if nums[j] > nums[j + 1]:
            aux = nums[j]
            nums[j] = nums[j + 1]
            nums[j + 1] = aux
# nums está crescente
for v in nums[-1:-4:-1]:
    print(v)
```
