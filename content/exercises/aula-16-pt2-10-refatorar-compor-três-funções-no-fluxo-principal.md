---
title: Refatorar — compor três funções no fluxo principal
slug: aula-16-pt2-10-refatorar-compor-três-funções-no-fluxo-principal
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
exercise_type: refactor
stage: 5
context: pipeline ETL
test_cases:
- input: '90

    '
  output: final=90.00
- input: '500

    '
  output: final=425.00
---

## Enunciado

Crie as funções `ler_total()`, `calc_desc(total)` e `exibir(final)` e componha no final (sem lógica duplicada). Entrada: um float. Saída: `final=<v>`.

## Solução

```python
def ler_total():
    return float(input())

def calc_desc(total):
    if total < 100:
        return 0.0
    if total < 300:
        return total * 0.05
    if total < 500:
        return total * 0.10
    return total * 0.15

def exibir(final):
    print(f"final={final:.2f}")

total = ler_total()
desc = calc_desc(total)
exibir(total - desc)
```
