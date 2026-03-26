---
title: Corrigir bug — conversão de minutos
slug: aula-01-novo-03-corrigir-bug-conversão-de-minutos
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
exercise_type: fix_bug
stage: 3
context: scripts de automação
test_cases:
- input: ''
  output: '90'
---

## Enunciado

O objetivo é converter horas (float) para minutos (int). Corrija o bug.

```python
horas = 1.5
minutos = horas * "60"
print(minutos)
```

## Solução

```python
horas = 1.5
minutos = int(horas * 60)
print(minutos)
```
