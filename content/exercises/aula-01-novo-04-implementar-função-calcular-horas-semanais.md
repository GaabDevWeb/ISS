---
title: Implementar função — calcular horas semanais
slug: aula-01-novo-04-implementar-função-calcular-horas-semanais
difficulty: medium
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
exercise_type: implement_function
stage: 4
context: scripts de automação
test_cases:
- input: '5

    2

    '
  output: '10'
---

## Enunciado

Implemente a função `horas_semanais(aulas_por_semana, horas_por_aula)` que retorna o total de horas por semana.

A entrada do programa são dois inteiros (um por linha) e a saída é o total.

## Solução

```python
def horas_semanais(aulas_por_semana, horas_por_aula):
    return aulas_por_semana * horas_por_aula

a = int(input())
h = int(input())
print(horas_semanais(a, h))
```
