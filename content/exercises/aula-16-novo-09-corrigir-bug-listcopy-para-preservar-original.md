---
title: Corrigir bug — list.copy() para preservar original
slug: aula-16-novo-09-corrigir-bug-listcopy-para-preservar-original
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
exercise_type: fix_bug
stage: 5
context: pipeline ETL
test_cases:
- input: ''
  output: '[3, 1, 2]

    [1, 2, 3]'
---

## Enunciado

O objetivo é ordenar uma cópia e imprimir original e ordenada. Corrija.

## Solução

```python
nums = [3, 1, 2]
ord = nums
ord.sort()
print(nums)
print(ord)
```
