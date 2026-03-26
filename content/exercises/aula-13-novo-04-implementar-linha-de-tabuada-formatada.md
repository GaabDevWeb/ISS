---
title: Implementar — linha de tabuada formatada
slug: aula-13-novo-04-implementar-linha-de-tabuada-formatada
difficulty: medium
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
exercise_type: implement_function
stage: 4
context: scripts de automação
test_cases:
- input: ''
  output: 7 x 3 = 21
---

## Enunciado

Imprima `7 x 3 = 21` usando f-string, com `n=7` e `i=3`.

## Solução

```python
n = 7
i = 3
print(f"{n} x {i} = {n * i}")
```
