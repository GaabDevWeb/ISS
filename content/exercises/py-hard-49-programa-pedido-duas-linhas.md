---
title: "HARD — Subtotal e total com funções"
slug: "py-hard-49-programa-pedido-duas-linhas"
difficulty: "hard"
concepts: ["def e chamada de função", "argumentos posicionais e nomeados", "PEP 8 snake_case e funções coesas"]
discipline: "python"
learning_goal: "Compor funções pequenas para um mini pedido."
exercise_type: "full_program"
stage: 20
context: "automação"
test_cases:
  - input: "2\n3 10.0\n1 5.0"
    output: "35.00"
---

## Enunciado

Leia N (número de itens). Para cada item leia `qtd preco` (int, float). Defina `subtotal(q, p)` retorna q*p e `total_pedido(n)` lê n linhas e retorna soma dos subtotais. Imprima total com 2 casas. **Implementação:** leia N no main, use loop chamando subtotal.

## Solução

```python
def subtotal(q, p):
    return q * p


n = int(input())
s = 0.0
for _ in range(n):
    linha = input().split()
    q = int(linha[0])
    p = float(linha[1])
    s += subtotal(q, p)
print(f'{s:.2f}')
```
