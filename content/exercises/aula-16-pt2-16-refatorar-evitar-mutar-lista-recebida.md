---
title: Refatorar — evitar mutar lista recebida
slug: aula-16-pt2-16-refatorar-evitar-mutar-lista-recebida
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
exercise_type: refactor
stage: 5
context: pipeline ETL
test_cases:
- input: ''
  output: '[3, 1, 2]

    [1, 2, 3]'
---

## Enunciado

Implemente `ordenada(nums)` que retorna uma lista ordenada sem mutar a lista original (use `copy()` e Bubble Sort). Depois imprima original e retorno.

## Solução

```python
def ordenada(nums):
    arr = nums.copy()
    for i in range(len(arr)):
        for j in range(0, len(arr) - 1 - i):
            if arr[j] > arr[j + 1]:
                aux = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = aux
    return arr

nums = [3, 1, 2]
print(nums)
print(ordenada(nums))
```
