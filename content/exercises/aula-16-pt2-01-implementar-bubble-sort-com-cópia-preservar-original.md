---
title: Implementar — bubble sort com cópia (preservar original)
slug: aula-16-pt2-01-implementar-bubble-sort-com-cópia-preservar-original
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
exercise_type: implement_function
stage: 4
context: pipeline ETL
test_cases:
- input: '3

    1

    2

    2

    '
  output: '[3, 1, 2, 2]

    [1, 2, 2, 3]'
---

## Enunciado

Leia 4 inteiros. Faça uma cópia da lista com `list.copy()`, ordene a cópia com Bubble Sort e imprima:
1) a lista original em uma linha (formato Python)
2) a lista ordenada em uma linha

## Solução

```python
nums = [int(input()) for _ in range(4)]
orig = nums.copy()
arr = nums.copy()
for i in range(len(arr)):
    for j in range(0, len(arr) - 1 - i):
        if arr[j] > arr[j + 1]:
            aux = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = aux
print(orig)
print(arr)
```
