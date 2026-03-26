---
title: Programa — validação de entrada (float) com retry
slug: aula-16-pt2-20-programa-validação-de-entrada-float-com-retry
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
- input: '0

    -2

    3

    '
  output: 'invalido

    invalido

    ok 3.0'
---

## Enunciado

Leia floats até obter um valor > 0. Para cada valor inválido (<=0), imprima `invalido` e continue. Quando for válido, imprima `ok <valor>` com 1 casa e pare.

## Solução

```python
while True:
    v = float(input())
    if v <= 0:
        print("invalido")
        continue
    print(f"ok {v:.1f}")
    break
```
