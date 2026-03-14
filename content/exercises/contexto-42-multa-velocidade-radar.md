---
title: "Valor da multa por velocidade (radar)"
slug: "contexto-42-multa-velocidade-radar"
difficulty: "medium"
concepts: ["if/elif/else", "faixas"]
discipline: "python"
learning_goal: "Calcular valor da multa por faixa de excesso de velocidade."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "95\n80"
    output: "130.16"
  - input: "100\n60"
    output: "293.47"
---

## Enunciado

Em uma via com limite L (km/h), a multa é: até 20% acima de L → R$ 130,16; até 50% acima → R$ 195,23; acima de 50% → R$ 293,47. O programa recebe a velocidade registrada (float) e o limite (int) e exibe o valor da multa com 2 decimais. Se velocidade <= limite, exiba "Sem multa".

**Tarefa**  
Calcule o percentual de excesso e escolha a faixa.

**Entrada**  
Duas linhas: velocidade e limite.

**Saída**  
Valor da multa com 2 decimais ou "Sem multa".

## Solução

```python
vel = float(input())
lim = int(input())
if vel <= lim:
    print("Sem multa")
else:
    excesso = (vel - lim) / lim
    if excesso <= 0.20: print("130.16")
    elif excesso <= 0.50: print("195.23")
    else: print("293.47")
```
