---
title: Programa — resumo de compra com formatação
slug: aula-08-novo-06-programa-resumo-de-compra-com-formatação
difficulty: hard
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
exercise_type: full_program
stage: 5
context: validação de dados
test_cases:
- input: 'cafe

    3

    4.2

    '
  output: TOTAL=12.60
---

## Enunciado

Leia `produto` (str), `qtd` (int), `preco` (float). Imprima `TOTAL=<valor>` com 2 casas.

## Solução

```python
produto = input().strip()
qtd = int(input())
preco = float(input())
_ = produto
print(f"TOTAL={qtd * preco:.2f}")
```
