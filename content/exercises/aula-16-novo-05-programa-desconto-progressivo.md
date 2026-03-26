---
title: Programa — desconto progressivo
slug: aula-16-novo-05-programa-desconto-progressivo
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
stage: 3
context: validação de dados
test_cases:
- input: '90

    '
  output: final=90.00
- input: '300

    '
  output: final=270.00
---

## Enunciado

Leia `total` (float). Calcule desconto: 0% (<100), 5% (<300), 10% (<500), 15% (>=500). Imprima `final=<valor>` com 2 casas.

## Solução

```python
total = float(input())
if total < 100:
    desc = 0.0
elif total < 300:
    desc = total * 0.05
elif total < 500:
    desc = total * 0.10
else:
    desc = total * 0.15
print(f"final={total - desc:.2f}")
```
