---
title: "Completar condição com not"
slug: "aula-10-06-completar-not"
difficulty: "easy"
concepts: ["operadores lógicos not"]
discipline: "python"
learning_goal: "Usar not para inverter condição (ex.: exibir quando não está ativo)."
exercise_type: "complete_the_code"
stage: 3
context: "configuração"
expected_output: "Inativo"
---

## Enunciado

Complete a condição para exibir "Inativo" quando ativo for False. Use o operador not.

```python
ativo = False
if _____ ativo:  # preencha: not
    print("Inativo")
else:
    print("Ativo")
```

## Solução

```python
ativo = False
if not ativo:
    print("Inativo")
else:
    print("Ativo")
```
