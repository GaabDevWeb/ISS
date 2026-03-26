---
title: Completar — inicialização do acumulador
slug: aula-13-novo-02-completar-inicialização-do-acumulador
difficulty: easy
concepts:
- teste de mesa
- acumulador (inicialização e +=)
- tabuada com range(11)
- enumerate e range(len)
- len() em coleções
- loops aninhados (linha e coluna)
discipline: python
learning_goal: 'Praticar: teste de mesa, acumulador (inicialização e +=), tabuada
  com range(11)'
exercise_type: complete_the_code
stage: 2
context: pipeline ETL
test_cases:
- input: ''
  output: '6'
---

## Enunciado

Complete a inicialização correta do acumulador.

```python
nums = [1, 2, 3]
____ = 0
for n in nums:
    soma += n
print(soma)
```

## Solução

```python
nums = [1, 2, 3]
soma = 0
for n in nums:
    soma += n
print(soma)
```
