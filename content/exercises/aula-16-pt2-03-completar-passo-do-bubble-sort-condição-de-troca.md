---
title: Completar — passo do bubble sort (condição de troca)
slug: aula-16-pt2-03-completar-passo-do-bubble-sort-condição-de-troca
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
exercise_type: complete_the_code
stage: 2
context: pipeline ETL
test_cases:
- input: ''
  output: '[2, 1, 3]'
---

## Enunciado

Complete a condição para trocar quando o elemento atual for maior que o próximo.

```python
nums = [3, 2, 1]
for j in range(2):
    if ______________________:
        aux = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = aux
print(nums)
```

## Solução

```python
nums = [3, 2, 1]
for j in range(2):
    if nums[j] > nums[j + 1]:
        aux = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = aux
print(nums)
```
