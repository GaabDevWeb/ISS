---
title: Prever saída — uma passada do bubble sort
slug: aula-16-pt2-04-prever-saída-uma-passada-do-bubble-sort
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
- acumuladores em loop while
- retorno múltiplo (tupla)
- tuple unpacking de retorno de função
- composição de três funções
- validação de entrada com float(input())
- tabela de descontos progressivos com if/elif/else
discipline: python
learning_goal: 'Praticar aula 16: controle de fluxo (while/break/continue), listas
  por referência/cópia, bubble sort, random e composição.'
exercise_type: predict_output
stage: 1
context: pipeline ETL
test_cases:
- input: ''
  output: '[1, 2, 3]'
---

## Enunciado

Qual a saída?

```python
nums = [2, 1, 3]
for j in range(2):
    if nums[j] > nums[j + 1]:
        aux = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = aux
print(nums)
```

## Solução

```python
nums = [2, 1, 3]
for j in range(2):
    if nums[j] > nums[j + 1]:
        aux = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = aux
print(nums)
```
