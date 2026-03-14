---
title: "Verificar se horário está dentro do funcionamento"
slug: "aula-09-hard-06-horario-funcionamento"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "blocos identados"]
discipline: "python"
learning_goal: "Comparar hora e minuto com faixa de abertura/fechamento."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "10\n30"
    output: "aberto"
  - input: "8\n0"
    output: "fechado"
  - input: "18\n1"
    output: "fechado"
---

## Enunciado

Escreva um programa que leia hora (int, 0-23) e minuto (int, 0-59). O estabelecimento abre às 9h e fecha às 18h (até 17h59 está aberto). Exiba "aberto" se o horário estiver entre 9:00 e 17:59 inclusive; "fechado" caso contrário. Use if/else. Dica: converta para minutos desde meia-noite (h*60 + m) e teste se 9*60 <= total < 18*60.

## Solução

```python
h = int(input())
m = int(input())
total_min = h * 60 + m
if 9 * 60 <= total_min < 18 * 60:
    print("aberto")
else:
    print("fechado")
```
