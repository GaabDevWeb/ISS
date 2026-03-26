---
title: Prever saída — while com break e acumulador
slug: aula-16-pt2-14-prever-saída-while-com-break-e-acumulador
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
stage: 2
context: validação de entrada
test_cases:
- input: ''
  output: '6'
---

## Enunciado

Qual a saída?

```python
total = 0
while True:
    total += 2
    if total >= 6:
        break
print(total)
```

## Solução

```python
total = 0
while True:
    total += 2
    if total >= 6:
        break
print(total)
```
