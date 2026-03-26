---
title: Programa — relatório de compras (qtd, total, caros)
slug: aula-16-pt2-12-programa-relatório-de-compras-qtd-total-caros
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
exercise_type: full_program
stage: 5
context: pipeline ETL
test_cases:
- input: '10

    -1

    100

    250

    0

    '
  output: 'qtd=3

    total=360.00

    caros=2'
---

## Enunciado

Leia preços (float) até ler `0`. Ignore negativos (continue). Conte `qtd` de itens válidos, some `total` e conte `caros` (preço >= 100). Ao final imprima:
`qtd=<q>`
`total=<t>` (2 casas)
`caros=<c>`

## Solução

```python
qtd = 0
total = 0.0
caros = 0
while True:
    v = float(input())
    if v == 0:
        break
    if v < 0:
        continue
    qtd += 1
    total += v
    if v >= 100:
        caros += 1
print(f"qtd={qtd}")
print(f"total={total:.2f}")
print(f"caros={caros}")
```
