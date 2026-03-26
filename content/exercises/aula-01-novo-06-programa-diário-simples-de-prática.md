---
title: Programa — diário simples de prática
slug: aula-01-novo-06-programa-diário-simples-de-prática
difficulty: hard
concepts:
- programação como ferramenta
- pensamento computacional
- curva de aprendizado
- curva do esquecimento
- tipagem dinâmica e forte em Python
- avaliação por competência
discipline: python
learning_goal: 'Praticar: programação como ferramenta, pensamento computacional, curva
  de aprendizado'
exercise_type: full_program
stage: 5
context: scripts de automação
test_cases:
- input: 'quinta

    35

    '
  output: No quinta, você praticou 35 min.
---

## Enunciado

Leia (em linhas separadas) `dia` (str) e `minutos` (int). Imprima: `No <dia>, você praticou <minutos> min.`

## Solução

```python
dia = input().strip()
minutos = int(input())
print(f"No {dia}, você praticou {minutos} min.")
```
