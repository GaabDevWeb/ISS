---
title: Completar — f-string com casas decimais
slug: aula-08-novo-01-completar-f-string-com-casas-decimais
difficulty: easy
concepts:
- interpolação de strings
- operador % para formatação
- método format() de str
- f-strings
- input()
- conversão de tipos após input
discipline: python
learning_goal: 'Praticar: interpolação de strings, operador % para formatação, método
  format() de str'
exercise_type: complete_the_code
stage: 1
context: monitoramento
test_cases:
- input: ''
  output: CPU=83.5%
---

## Enunciado

Complete para imprimir `CPU=83.5%` com 1 casa decimal.

```python
cpu = 83.456
print(______________)
```

## Solução

```python
cpu = 83.456
print(f"CPU={cpu:.1f}%")
```
