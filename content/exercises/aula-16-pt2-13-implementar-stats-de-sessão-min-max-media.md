---
title: Implementar — stats de sessão (min, max, media)
slug: aula-16-pt2-13-implementar-stats-de-sessão-min-max-media
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
exercise_type: implement_function
stage: 5
context: monitoramento
test_cases:
- input: '1

    2

    4

    '
  output: min=1.0 max=4.0 media=2.3
---

## Enunciado

Leia 3 floats. Implemente `stats(a,b,c)` que retorna `(menor, maior, media)` e imprima `min=<m> max=<M> media=<x>` (1 casa).

## Solução

```python
def stats(a, b, c):
    menor = min(a, b, c)
    maior = max(a, b, c)
    media = (a + b + c) / 3
    return menor, maior, media

a = float(input())
b = float(input())
c = float(input())
mn, mx, md = stats(a, b, c)
print(f"min={mn:.1f} max={mx:.1f} media={md:.1f}")
```
