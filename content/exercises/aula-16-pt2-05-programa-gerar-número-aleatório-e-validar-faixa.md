---
title: Programa — gerar número aleatório e validar faixa
slug: aula-16-pt2-05-programa-gerar-número-aleatório-e-validar-faixa
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
context: monitoramento
test_cases:
- input: '2

    '
  output: ACERTO
- input: '1

    '
  output: ERRO
---

## Enunciado

Use `random.randint(1, 3)` para gerar um número. Leia um palpite (int). Imprima `ACERTO` se igual, senão `ERRO`.
Para permitir correção automática, use `random.seed(0)` antes de gerar.

## Solução

```python
import random
random.seed(0)
secreto = random.randint(1, 3)
p = int(input())
if p == secreto:
    print("ACERTO")
else:
    print("ERRO")
```
