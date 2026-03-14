---
title: "Conversão de nota numérica para conceito (A a E)"
slug: "aula-09-hard-07-nota-conceito-multiplas-faixas"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "cadeias condicionais"]
discipline: "python"
learning_goal: "Mapear nota em faixas para conceito alfabético."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "9.0"
    output: "A"
  - input: "7.5"
    output: "B"
  - input: "5.0"
    output: "C"
  - input: "3.0"
    output: "D"
  - input: "1.0"
    output: "E"
---

## Enunciado

Escreva um programa que leia a nota (float, 0 a 10) e exiba o conceito: A se >= 9; B se >= 7.5; C se >= 6; D se >= 4; E se < 4. Use if/elif/else. Exiba apenas uma letra.

## Solução

```python
nota = float(input())
if nota >= 9:
    print("A")
elif nota >= 7.5:
    print("B")
elif nota >= 6:
    print("C")
elif nota >= 4:
    print("D")
else:
    print("E")
```
