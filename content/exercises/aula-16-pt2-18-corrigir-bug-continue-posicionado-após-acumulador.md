---
title: Corrigir bug — continue posicionado após acumulador
slug: aula-16-pt2-18-corrigir-bug-continue-posicionado-após-acumulador
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
context: validação de entrada
test_cases:
- input: '1

    -2

    3

    0

    '
  output: '4.0'
---

## Enunciado

O objetivo é ignorar negativos. Corrija para que negativos não sejam somados.

## Solução

```python
total = 0.0
while True:
    v = float(input())
    if v == 0:
        break
    total += v
    if v < 0:
        continue
print(f"{total:.1f}")
```
