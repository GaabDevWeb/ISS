---
title: "Desconto progressivo e cartão fidelidade (loja)"
slug: "contexto-07-desconto-progressivo-cartao-loja"
difficulty: "medium"
concepts: ["if/elif/else", "operadores lógicos", "formatação :.2f"]
discipline: "python"
learning_goal: "Aplicar faixas de desconto e desconto adicional por cartão."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "350.00\nS"
    output: "318.50"
  - input: "1200.00\nN"
    output: "1020.00"
---

## Enunciado

A loja TecnoMais aplica desconto progressivo pelo valor da compra: até R$ 100 sem desconto; de R$ 100,01 a R$ 500, 5%; de R$ 500,01 a R$ 1000, 10%; acima de R$ 1000, 15%. Quem paga com o Cartão TecnoMais (resposta S ou s) recebe 2 pontos percentuais a mais na mesma faixa. O programa em Python (Deepnote) deve ler o valor bruto e se o pagamento é com o cartão (S/N), e exibir o valor final com duas casas decimais.

**Tarefa**  
Calcule o valor final após descontos. Exemplo: R$ 350 com cartão = 5% + 2% = 7% → 325,50.

**Entrada**  
Duas linhas: valor total bruto (real positivo) e uma string S ou N (maiúscula ou minúscula) para uso do Cartão TecnoMais.

**Saída**  
Um único número real com duas casas decimais (valor final).

## Solução

```python
valor = float(input())
cartao = input().strip().upper()
if valor <= 100:
    taxa = 0
elif valor <= 500:
    taxa = 0.05
elif valor <= 1000:
    taxa = 0.10
else:
    taxa = 0.15
if cartao == 'S' and taxa > 0:
    taxa += 0.02
final = valor * (1 - taxa)
print(f"{final:.2f}")
```
