---
title: Completar — tuple unpacking do retorno
slug: aula-16-pt2-15-completar-tuple-unpacking-do-retorno
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
stage: 3
context: pipeline ETL
test_cases:
- input: ''
  output: maior=9
---

## Enunciado

Complete para desestruturar o retorno e imprimir `maior=9`.

```python
def min_max(a, b):
    if a < b:
        return a, b
    return b, a

menor, ______ = min_max(9, 2)
print(f"maior={maior}")
```

## Solução

```python
def min_max(a, b):
    if a < b:
        return a, b
    return b, a

menor, maior = min_max(9, 2)
print(f"maior={maior}")
```
