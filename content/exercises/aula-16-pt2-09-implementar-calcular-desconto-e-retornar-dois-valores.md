---
title: Implementar — calcular desconto e retornar dois valores
slug: aula-16-pt2-09-implementar-calcular-desconto-e-retornar-dois-valores
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
context: validação de dados
test_cases:
- input: '300

    '
  output: desconto=30.00 final=270.00
---

## Enunciado

Implemente `calc_desc(total)` que retorna `(desconto, final)` seguindo a tabela:
0% (<100), 5% (<300), 10% (<500), 15% (>=500).
Leia `total` e imprima `desconto=<d> final=<f>` com 2 casas.

## Solução

```python
def calc_desc(total):
    if total < 100:
        d = 0.0
    elif total < 300:
        d = total * 0.05
    elif total < 500:
        d = total * 0.10
    else:
        d = total * 0.15
    return d, total - d

total = float(input())
d, f = calc_desc(total)
print(f"desconto={d:.2f} final={f:.2f}")
```
