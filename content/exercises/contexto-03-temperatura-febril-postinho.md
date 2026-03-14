---
title: "Indício de febre em triagem (posto de saúde)"
slug: "contexto-03-temperatura-febril-postinho"
difficulty: "easy"
concepts: ["if/elif/else", "float", "operadores relacionais"]
discipline: "python"
learning_goal: "Classificar temperatura em faixas e exibir mensagem adequada."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "38.5"
    output: "Febre. Encaminhar ao médico."
  - input: "37.6"
    output: "Estado febril. Observar."
  - input: "36.5"
    output: "Temperatura normal."
---

## Enunciado

Em um posto de saúde, a enfermagem realiza triagem e anota a temperatura corporal dos pacientes. Para padronizar o atendimento, foi solicitado um programa em Python (Deepnote) que analise a temperatura informada e indique se há estado febril ou febre, com base em limiares clínicos, para que a equipe saiba quando encaminhar ao médico.

**Tarefa**  
Implemente um programa que classifique a temperatura corporal (em °C) e exiba uma única mensagem conforme as faixas definidas.

**Entrada**  
Uma linha com um número real representando a temperatura em graus Celsius (valor positivo e em faixa humana típica).

**Saída**  
- Se temperatura >= 38,0: exiba `Febre. Encaminhar ao médico.`
- Se temperatura >= 37,5 e < 38,0: exiba `Estado febril. Observar.`
- Caso contrário: exiba `Temperatura normal.`

## Solução

```python
temp = float(input())
if temp >= 38.0:
    print("Febre. Encaminhar ao médico.")
elif temp >= 37.5:
    print("Estado febril. Observar.")
else:
    print("Temperatura normal.")
```
