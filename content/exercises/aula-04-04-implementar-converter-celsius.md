---
title: "Implementar conversão de temperatura (str para float)"
slug: "aula-04-04-implementar-converter-celsius"
difficulty: "easy"
concepts: ["conversão de tipos", "tratar ValueError"]
discipline: "python"
learning_goal: "Ler string com temperatura em Fahrenheit e exibir Celsius usando float()."
exercise_type: "implement_function"
stage: 4
context: "validação de entrada"
test_cases:
  - input: "32"
    output: "0.0"
  - input: "212"
    output: "100.0"
---

## Enunciado

Implemente um programa que leia uma linha (temperatura em Fahrenheit), converta para float, calcule Celsius com a fórmula `C = (F - 32) * 5/9` e exiba o resultado (número).

## Solução

```python
f = float(input())
c = (f - 32) * 5 / 9
print(c)
```
