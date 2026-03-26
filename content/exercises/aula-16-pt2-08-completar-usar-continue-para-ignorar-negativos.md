---
title: Completar — usar continue para ignorar negativos
slug: aula-16-pt2-08-completar-usar-continue-para-ignorar-negativos
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
context: validação de entrada
test_cases:
- input: '1

    -2

    3

    0

    '
  output: qtd=2 total=4.0
---

## Enunciado

Complete para ignorar entradas negativas. O programa lê valores float até ler `0` (encerra). Imprima `qtd=<q> total=<t>` (total com 1 casa).

```python
qtd = 0
total = 0.0
while True:
    v = float(input())
    if v == 0:
        break
    if v < 0:
        __________
    qtd += 1
    total += v
print(f"qtd={qtd} total={total:.1f}")
```

## Solução

```python
qtd = 0
total = 0.0
while True:
    v = float(input())
    if v == 0:
        break
    if v < 0:
        continue
    qtd += 1
    total += v
print(f"qtd={qtd} total={total:.1f}")
```
