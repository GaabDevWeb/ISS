---
title: Programa — jogo de adivinhação (while True)
slug: aula-16-novo-02-programa-jogo-de-adivinhação-while-true
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
exercise_type: full_program
stage: 1
context: validação de entrada
test_cases:
- input: '7

    1

    2

    7

    '
  output: ACERTOU
- input: '7

    0

    '
  output: DESISTIU
---

## Enunciado

Leia um inteiro secreto `s` e depois uma sequência de palpites (um por linha). Quando o palpite for igual a `s`, imprima `ACERTOU` e pare. Se o palpite for `0`, imprima `DESISTIU` e pare.

## Solução

```python
s = int(input())
while True:
    p = int(input())
    if p == 0:
        print("DESISTIU")
        break
    if p == s:
        print("ACERTOU")
        break
```
