---
title: Prever saída — plano de revisão em dias
slug: aula-01-novo-01-prever-saída-plano-de-revisão-em-dias
difficulty: easy
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
exercise_type: predict_output
stage: 1
context: scripts de automação
test_cases:
- input: ''
  output: 'Revisar em 1 dia(s)

    Revisar em 3 dia(s)

    Revisar em 7 dia(s)'
---

## Enunciado

Considere o programa abaixo. Qual é a saída exata?

```python
offsets = [1, 3, 7]
for d in offsets:
    print(f"Revisar em {d} dia(s)")
```

## Solução

```python
offsets = [1, 3, 7]
for d in offsets:
    print(f"Revisar em {d} dia(s)")
```
