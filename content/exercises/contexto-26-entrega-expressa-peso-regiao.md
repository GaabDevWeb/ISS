---
title: "Frete expresso por peso e região"
slug: "contexto-26-entrega-expressa-peso-regiao"
difficulty: "medium"
concepts: ["if/elif/else", "and", "múltiplas variáveis"]
discipline: "python"
learning_goal: "Calcular valor do frete por faixas de peso e tipo de região."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5.0\ncapital"
    output: "25.00"
  - input: "12.0\ninterior"
    output: "48.00"
---

## Enunciado

A transportadora cobra: capital até 5 kg R$ 5/kg, 5–10 kg R$ 4/kg, >10 kg R$ 3/kg; interior até 5 kg R$ 7/kg, 5–10 kg R$ 6/kg, >10 kg R$ 4/kg. O programa recebe peso (float) e região ("capital" ou "interior") e exibe o valor total com 2 decimais.

**Tarefa**  
Calcule peso * preço por kg conforme faixa e região.

**Entrada**  
Duas linhas: peso (kg) e região.

**Saída**  
Valor com duas casas decimais.

## Solução

```python
peso = float(input())
regiao = input().strip().lower()
if regiao == "capital":
    if peso <= 5: p = 5
    elif peso <= 10: p = 4
    else: p = 3
else:
    if peso <= 5: p = 7
    elif peso <= 10: p = 6
    else: p = 4
print(f"{peso * p:.2f}")
```
