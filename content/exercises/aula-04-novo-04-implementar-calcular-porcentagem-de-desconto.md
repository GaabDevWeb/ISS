---
title: Implementar — calcular porcentagem de desconto
slug: aula-04-novo-04-implementar-calcular-porcentagem-de-desconto
difficulty: medium
concepts:
- conversão de tipos
- tipagem dinâmica
- tipagem forte
- int, float, bool, string
- operadores aritméticos
- precedência de operadores
discipline: python
learning_goal: 'Praticar: conversão de tipos, tipagem dinâmica, tipagem forte'
exercise_type: implement_function
stage: 4
context: validação de dados
test_cases:
- input: '100

    15

    '
  output: '85.00'
---

## Enunciado

Leia `preco` (float) e `desconto_percentual` (int). Imprima o preço final.

## Solução

```python
preco = float(input())
d = int(input())
final = preco * (1 - d / 100)
print(f"{final:.2f}")
```
