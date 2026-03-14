---
title: "Tarifa de manutenção de conta (saldo médio)"
slug: "contexto-45-conta-corrente-tarifa-saldo"
difficulty: "easy"
concepts: ["if/elif/else", "float"]
discipline: "python"
learning_goal: "Cobrar ou isentar tarifa conforme saldo."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "1500.00"
    output: "Sem tarifa"
  - input: "500.00"
    output: "Tarifa: R$ 15.00"
---

## Enunciado

O banco cobra R$ 15 de tarifa de manutenção se o saldo médio for menor que R$ 1000; entre R$ 1000 e R$ 5000 cobra R$ 8; acima de R$ 5000 isenta. O programa recebe o saldo (float) e exibe "Sem tarifa", "Tarifa: R$ 8.00" ou "Tarifa: R$ 15.00".

**Tarefa**  
Exiba a mensagem conforme a faixa de saldo.

**Entrada**  
Uma linha com o saldo.

**Saída**  
Uma das três mensagens.

## Solução

```python
saldo = float(input())
if saldo >= 5000:
    print("Sem tarifa")
elif saldo >= 1000:
    print("Tarifa: R$ 8.00")
else:
    print("Tarifa: R$ 15.00")
```
