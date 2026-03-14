---
title: "Valor do plano de saúde por faixa etária"
slug: "contexto-28-plano-saude-faixa-etaria"
difficulty: "medium"
concepts: ["if/elif/else", "faixas"]
discipline: "python"
learning_goal: "Retornar valor mensal do plano conforme idade."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "30"
    output: "150.00"
  - input: "65"
    output: "350.00"
---

## Enunciado

A operadora de saúde cobra por idade: 0–18 R$ 100, 19–30 R$ 150, 31–45 R$ 220, 46–59 R$ 280, 60 ou mais R$ 350. O programa recebe a idade (int) e exibe o valor mensal com 2 decimais.

**Tarefa**  
Exiba o valor conforme a faixa etária.

**Entrada**  
Uma linha com a idade.

**Saída**  
Valor com duas casas decimais.

## Solução

```python
idade = int(input())
if idade <= 18: v = 100
elif idade <= 30: v = 150
elif idade <= 45: v = 220
elif idade <= 59: v = 280
else: v = 350
print(f"{v:.2f}")
```
