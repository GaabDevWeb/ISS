---
title: "Necessidade de retorno na consulta médica"
slug: "contexto-33-consulta-medica-retorno"
difficulty: "easy"
concepts: ["if/else", "input"]
discipline: "python"
learning_goal: "Recomendar ou não retorno conforme resposta do médico (S/N)."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "S"
    output: "Agendar retorno"
  - input: "N"
    output: "Retorno nao necessario"
---

## Enunciado

O sistema registra se o médico solicitou retorno (S ou N). O programa recebe uma linha e exibe "Agendar retorno" se S ou s, "Retorno nao necessario" se N ou n, e "Resposta invalida" caso contrário.

**Tarefa**  
Leia a entrada e exiba a mensagem correspondente.

**Entrada**  
Uma linha com S ou N (ou em minúsculas).

**Saída**  
Uma das três mensagens.

## Solução

```python
r = input().strip().upper()
if r == "S":
    print("Agendar retorno")
elif r == "N":
    print("Retorno nao necessario")
else:
    print("Resposta invalida")
```
