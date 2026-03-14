---
title: "Refatorar — usar variável para mensagem de rotina"
slug: "aula-01-12-refatorar-print-para-variavel"
difficulty: "easy"
concepts: ["pensamento computacional", "variáveis"]
discipline: "python"
learning_goal: "Refatorar código para usar variável antes de imprimir mensagem de rotina de estudo."
exercise_type: "refactor"
stage: 6
context: "processamento de texto"
expected_output: "Rotina: estudar Python 3x por semana"
---

## Enunciado

Refatore o código abaixo para que a mensagem seja primeiro atribuída a uma variável `rotina` e depois exibida com `print(rotina)`. O texto exibido deve continuar sendo: "Rotina: estudar Python 3x por semana".

```python
print("Rotina: estudar Python 3x por semana")
```

## Solução

```python
rotina = "Rotina: estudar Python 3x por semana"
print(rotina)
```
