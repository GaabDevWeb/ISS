---
title: Corrigir bug — loop infinito por falta de atualização
slug: aula-16-pt2-11-corrigir-bug-loop-infinito-por-falta-de-atualização
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

    2

    0

    '
  output: '3.0'
---

## Enunciado

O objetivo é somar valores positivos até ler `0`. Corrija o loop.

## Solução

```python
total = 0.0
v = float(input())
while v != 0:
    if v > 0:
        total += v
print(f"{total:.1f}")
```
