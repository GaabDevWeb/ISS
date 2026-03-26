---
title: Implementar — gerar lista aleatória e ordenar (seed)
slug: aula-16-pt2-19-implementar-gerar-lista-aleatória-e-ordenar-seed
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
stage: 5
context: pipeline ETL
test_cases:
- input: ''
  output: '[2, 2, 3, 5, 9]'
---

## Enunciado

Use `random.seed(1)` e gere 5 inteiros com `randint(1, 9)`. Ordene com Bubble Sort e imprima a lista ordenada (formato Python).

## Solução

```python
import random
random.seed(1)
nums = [random.randint(1, 9) for _ in range(5)]
for i in range(len(nums)):
    for j in range(0, len(nums) - 1 - i):
        if nums[j] > nums[j + 1]:
            aux = nums[j]
            nums[j] = nums[j + 1]
            nums[j + 1] = aux
print(nums)
```
