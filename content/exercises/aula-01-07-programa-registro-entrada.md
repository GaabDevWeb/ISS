---
title: "Programa — simular registro de entrada de estudo"
slug: "aula-01-07-programa-registro-entrada"
difficulty: "medium"
concepts: ["programação como ferramenta", "pensamento computacional", "avaliação por competência"]
discipline: "python"
learning_goal: "Escrever programa que lê dia, minutos e descrição e exibe linha de registro formatada."
exercise_type: "full_program"
stage: 11
context: "logs"
test_cases:
  - input: "segunda\n45\nExercícios de variáveis"
    output: "segunda | 45 min | Exercícios de variáveis"
---

## Enunciado

Escreva um programa que leia três entradas (uma por linha): dia da semana, minutos de estudo e descrição da atividade. Exiba uma única linha no formato: `DIA | MIN min | DESCRIÇÃO`. Exemplo: `segunda | 45 min | Exercícios de variáveis`.

## Solução

```python
dia = input()
minutos = input()
descricao = input()
print(dia, "|", minutos, "min |", descricao)
```
