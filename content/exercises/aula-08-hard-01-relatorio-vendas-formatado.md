---
title: "Relatório de vendas com formatação decimal e colunas"
slug: "aula-08-hard-01-relatorio-vendas-formatado"
difficulty: "hard"
concepts: ["f-strings", "input()", "formatação :.2f e :.3f", "conversão de tipos após input"]
discipline: "python"
learning_goal: "Montar relatório com múltiplas entradas, conversão e formatação consistente."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "3\nProduto A\n10.5\n20\nProduto B\n7.25\n15\nProduto C\n100\n2"
    output: "Produto A | 10.500 | 20 | 210.00\nProduto B | 7.250 | 15 | 108.75\nProduto C | 100.000 | 2 | 200.00"
---

## Enunciado

Escreva um programa que leia um inteiro N e, para cada um dos N produtos: nome (string), preço unitário (float) e quantidade (int). Para cada produto exiba uma linha no formato: `NOME | PRECO_UNIT (3 decimais) | QTD | TOTAL (2 decimais)`, onde TOTAL = preço × quantidade. Use f-strings com `:.3f` e `:.2f`. Não use listas; leia e imprima um produto por vez em um loop com range(N).

## Solução

```python
n = int(input())
for _ in range(n):
    nome = input()
    preco = float(input())
    qtd = int(input())
    total = preco * qtd
    print(f"{nome} | {preco:.3f} | {qtd} | {total:.2f}")
```
