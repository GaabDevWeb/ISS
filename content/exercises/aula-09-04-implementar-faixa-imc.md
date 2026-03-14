---
title: "Implementar classificação IMC com if/elif/else"
slug: "aula-09-04-implementar-faixa-imc"
difficulty: "easy"
concepts: ["if/elif/else", "expressão booleana", "operadores relacionais"]
discipline: "python"
learning_goal: "Classificar IMC em faixa (abaixo, normal, acima) com elif."
exercise_type: "implement_function"
stage: 4
context: "validação de dados"
test_cases:
  - input: "18.0"
    output: "normal"
  - input: "16.0"
    output: "abaixo"
  - input: "26.0"
    output: "acima"
---

## Enunciado

Implemente um programa que leia um número (IMC). Exiba "abaixo" se imc < 18.5, "normal" se 18.5 <= imc < 25, "acima" caso contrário. Use if/elif/else.

## Solução

```python
imc = float(input())
if imc < 18.5:
    print("abaixo")
elif imc < 25:
    print("normal")
else:
    print("acima")
```
