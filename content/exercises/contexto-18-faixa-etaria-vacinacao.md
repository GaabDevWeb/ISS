---
title: "Prioridade de vacinação por faixa etária"
slug: "contexto-18-faixa-etaria-vacinacao"
difficulty: "easy"
concepts: ["if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Classificar idade em faixas e exibir prioridade."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "75"
    output: "Prioridade maxima"
  - input: "45"
    output: "Prioridade media"
  - input: "25"
    output: "Prioridade baixa"
---

## Enunciado

Na campanha de vacinação, idosos (60 ou mais) têm prioridade máxima; adultos de 40 a 59, prioridade média; demais, prioridade baixa. O programa recebe a idade (int) e exibe a prioridade correspondente.

**Tarefa**  
Exiba exatamente: "Prioridade maxima", "Prioridade media" ou "Prioridade baixa".

**Entrada**  
Uma linha com a idade (inteiro positivo).

**Saída**  
Uma das três mensagens acima.

## Solução

```python
idade = int(input())
if idade >= 60:
    print("Prioridade maxima")
elif idade >= 40:
    print("Prioridade media")
else:
    print("Prioridade baixa")
```
