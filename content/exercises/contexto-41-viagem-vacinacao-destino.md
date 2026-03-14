---
title: "Recomendação de vacina por destino da viagem"
slug: "contexto-41-viagem-vacinacao-destino"
difficulty: "easy"
concepts: ["if/elif/else", "strings"]
discipline: "python"
learning_goal: "Exibir vacina recomendada conforme destino."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "amazonia"
    output: "Febre amarela"
  - input: "europa"
    output: "Nenhuma obrigatoria"
---

## Enunciado

A ANVISA recomenda: amazonia → "Febre amarela", africa → "Febre amarela e malaria", Asia → "Consulte posto"; europa, sul do brasil → "Nenhuma obrigatoria". O programa recebe o destino (uma palavra, minúsculas) e exibe a mensagem correspondente. Para qualquer outro destino, exiba "Consulte posto".

**Tarefa**  
Use if/elif/else e exiba uma única linha.

**Entrada**  
Uma linha com o destino.

**Saída**  
A mensagem correspondente ao destino.

## Solução

```python
dest = input().strip().lower()
if dest == "amazonia":
    print("Febre amarela")
elif dest == "africa":
    print("Febre amarela e malaria")
elif dest == "asia":
    print("Consulte posto")
elif dest == "europa" or dest == "sul do brasil":
    print("Nenhuma obrigatoria")
else:
    print("Consulte posto")
```
