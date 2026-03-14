---
title: "Corrigir tipo na mensagem de horas"
slug: "aula-01-03-corrigir-tipo-horas"
difficulty: "easy"
concepts: ["tipagem dinâmica e forte em Python"]
discipline: "python"
learning_goal: "Corrigir erro de tipo ao concatenar número com string na exibição de horas."
exercise_type: "fix_bug"
stage: 2
context: "processamento de texto"
expected_output: "Você tem 10 horas disponíveis esta semana."
---

## Enunciado

O script abaixo deveria exibir: "Você tem 10 horas disponíveis esta semana." Porém há um bug (erro de tipo). Corrija-o sem alterar a lógica do cálculo.

```python
aulas = 2
horas_por_dia = 5
total = aulas * horas_por_dia
print("Você tem " + total + " horas disponíveis esta semana.")
```

## Solução

```python
aulas = 2
horas_por_dia = 5
total = aulas * horas_por_dia
print("Você tem " + str(total) + " horas disponíveis esta semana.")
```
