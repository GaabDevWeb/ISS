---
title: Programa — contagem de palpites com break
slug: aula-16-pt2-06-programa-contagem-de-palpites-com-break
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
context: validação de entrada
test_cases:
- input: '5

    1

    2

    5

    '
  output: tentativas=3
---

## Enunciado

Leia um inteiro `secreto`. Depois leia palpites até acertar. Ao acertar, imprima `tentativas=<n>` e pare.

## Solução

```python
secreto = int(input())
cont = 0
while True:
    p = int(input())
    cont += 1
    if p == secreto:
        print(f"tentativas={cont}")
        break
```
