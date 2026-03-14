---
title: "Desconto por quantidade (combo de produtos)"
slug: "contexto-48-desconto-combo-produtos"
difficulty: "medium"
concepts: ["if/elif/else", "formatação"]
discipline: "python"
learning_goal: "Aplicar desconto progressivo por quantidade e exibir total."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "15\n10.00"
    output: "127.50"
  - input: "5\n10.00"
    output: "47.50"
---

## Enunciado

A loja vende um produto: até 5 unidades sem desconto; 6 a 15 unidades 5% de desconto; 16 a 30 unidades 10%; mais de 30 unidades 15%. O programa recebe a quantidade (int) e o preço unitário (float) e exibe o total a pagar com 2 decimais.

**Tarefa**  
Calcule subtotal, aplique o desconto pela faixa e exiba o total.

**Entrada**  
Duas linhas: quantidade e preço unitário.

**Saída**  
Total com duas casas decimais.

## Solução

```python
qtd = int(input())
preco = float(input())
sub = qtd * preco
if qtd <= 5: d = 0
elif qtd <= 15: d = 0.05
elif qtd <= 30: d = 0.10
else: d = 0.15
print(f"{sub * (1 - d):.2f}")
```
