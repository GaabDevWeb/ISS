---
title: "Parcelamento com Juros Simples e Taxa Administrativa"
slug: "parcelamento-juros-simples"
difficulty: "hard"
concepts: ["input()", "float()", "fórmula financeira", "f-string"]
discipline: "python"
---

## Enunciado

Na loja 'Preço Bom', o gerente precisa calcular o valor total de produtos quando os clientes optam por parcelamentos com juros. O cálculo deve incluir juros simples aplicados sobre o preço à vista, além de uma taxa administrativa que incide sobre o montante financiado. Um programa auxiliará a determinar o valor final e o valor de cada parcela.

**Tarefa:** O sistema recebe, em sequência (uma por linha via `input()`): (1) preço à vista, (2) taxa de juros mensal simples (decimal, ex.: 0.02 para 2%), (3) número de parcelas, (4) taxa administrativa (decimal, ex.: 0.05 para 5%) sobre o valor já com juros. Fórmula de juros simples: `valor_com_juros = valor_inicial * (1 + taxa_juros * meses)`. Depois aplique a taxa administrativa: `valor_final = valor_com_juros * (1 + taxa_admin)`. Exiba o valor total final e o valor de cada parcela (valor_final / meses), ambos com duas casas decimais.

## Solução

```python
preco = float(input())
taxa_juros = float(input())
meses = int(input())
taxa_admin = float(input())
valor_com_juros = preco * (1 + taxa_juros * meses)
valor_final = valor_com_juros * (1 + taxa_admin)
valor_parcela = valor_final / meses
print(f"{valor_final:.2f}")
print(f"{valor_parcela:.2f}")
```
