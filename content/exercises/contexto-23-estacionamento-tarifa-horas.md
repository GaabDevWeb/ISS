---
title: "Tarifa de estacionamento por faixa de horas"
slug: "contexto-23-estacionamento-tarifa-horas"
difficulty: "medium"
concepts: ["if/elif/else", "faixas numéricas"]
discipline: "python"
learning_goal: "Calcular valor a pagar por horas estacionado."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "2"
    output: "10.00"
  - input: "5"
    output: "22.50"
---

## Enunciado

O estacionamento cobra: até 1h R$ 5; até 3h R$ 5 + R$ 2,50 por hora extra; até 6h R$ 10 + R$ 2 por hora extra; acima de 6h R$ 18 + R$ 1,50 por hora extra. O programa recebe o número de horas (float) e exibe o valor com 2 decimais.

**Tarefa**  
Calcule o valor conforme as faixas e exiba formatado.

**Entrada**  
Uma linha com as horas (número real positivo).

**Saída**  
Valor com duas casas decimais.

## Solução

```python
h = float(input())
if h <= 1:
    v = 5
elif h <= 3:
    v = 5 + (h - 1) * 2.5
elif h <= 6:
    v = 10 + (h - 3) * 2
else:
    v = 18 + (h - 6) * 1.5
print(f"{v:.2f}")
```
