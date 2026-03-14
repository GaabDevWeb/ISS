---
title: "Renovação de carteira (idade e anos até vencer)"
slug: "contexto-30-renovacao-carteira-idade-validade"
difficulty: "medium"
concepts: ["if/elif/else", "and/or"]
discipline: "python"
learning_goal: "Decidir se renovação é obrigatória, recomendada ou não necessária."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "70\n1"
    output: "Renovacao obrigatoria"
  - input: "45\n4"
    output: "Renovacao nao necessaria"
---

## Enunciado

A renovação é obrigatória se idade >= 65 ou anos até vencer <= 1; recomendada se idade >= 50 ou anos até vencer <= 2; caso contrário não necessária. O programa recebe idade (int) e anos até o vencimento (int) e exibe "Renovacao obrigatoria", "Renovacao recomendada" ou "Renovacao nao necessaria".

**Tarefa**  
Avalie na ordem: obrigatória > recomendada > não necessária.

**Entrada**  
Duas linhas: idade e anos até vencer.

**Saída**  
Uma das três mensagens.

## Solução

```python
idade = int(input())
anos = int(input())
if idade >= 65 or anos <= 1:
    print("Renovacao obrigatoria")
elif idade >= 50 or anos <= 2:
    print("Renovacao recomendada")
else:
    print("Renovacao nao necessaria")
```
