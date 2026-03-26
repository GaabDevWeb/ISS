---
title: Implementar — somar lista fixa com for
slug: aula-11-novo-04-implementar-somar-lista-fixa-com-for
difficulty: medium
concepts:
- laços for e range em Python
- listas e sequências iteráveis
- iteração sobre coleções
- parada não inclusiva de range()
- objeto iterável
discipline: python
learning_goal: 'Praticar: laços for e range em Python, listas e sequências iteráveis,
  iteração sobre coleções'
exercise_type: implement_function
stage: 4
context: pipeline ETL
test_cases:
- input: ''
  output: '10'
---

## Enunciado

Some os valores da lista `[2, 3, 5]` e imprima o total.

## Solução

```python
nums = [2, 3, 5]
total = 0
for n in nums:
    total += n
print(total)
```
