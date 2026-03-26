---
title: Estender — desistência com 0 (continue não usado)
slug: aula-16-pt2-07-estender-desistência-com-0-continue-não-usado
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
exercise_type: extend_code
stage: 5
context: validação de entrada
test_cases:
- input: '3

    1

    2

    3

    '
  output: ACERTOU
- input: '3

    0

    '
  output: DESISTIU
---

## Enunciado

Leia um inteiro `secreto`. Depois leia palpites. Se o palpite for `0`, imprima `DESISTIU` e pare. Se for diferente do secreto, continue lendo. Se acertar, imprima `ACERTOU`.

## Solução

```python
secreto = int(input())
while True:
    p = int(input())
    if p == 0:
        print("DESISTIU")
        break
    if p == secreto:
        print("ACERTOU")
        break
```
