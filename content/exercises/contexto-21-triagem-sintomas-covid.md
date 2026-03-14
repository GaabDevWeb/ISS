---
title: "Triagem de sintomas (febre e tosse)"
slug: "contexto-21-triagem-sintomas-covid"
difficulty: "easy"
concepts: ["if/elif/else", "input"]
discipline: "python"
learning_goal: "Encaminhar paciente com base em febre e tosse (S/N)."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "S\nS"
    output: "Encaminhar ao medico"
  - input: "N\nN"
    output: "Manter observacao"
---

## Enunciado

Em uma triagem, o paciente informa se tem febre (S/N) e se tem tosse (S/N). Se ambos S, exibir "Encaminhar ao medico"; se apenas um S, "Avaliacao adicional"; se ambos N, "Manter observacao". Comparação insensível a maiúsculas.

**Tarefa**  
Leia duas linhas (S ou N) e exiba a mensagem correspondente.

**Entrada**  
Duas linhas: febre e tosse.

**Saída**  
Uma das três mensagens acima.

## Solução

```python
febre = input().strip().upper()
tosse = input().strip().upper()
if febre == "S" and tosse == "S":
    print("Encaminhar ao medico")
elif febre == "S" or tosse == "S":
    print("Avaliacao adicional")
else:
    print("Manter observacao")
```
