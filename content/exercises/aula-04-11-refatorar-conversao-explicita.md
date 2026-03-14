---
title: "Refatorar — conversão explícita após input"
slug: "aula-04-11-refatorar-conversao-explicita"
difficulty: "easy"
concepts: ["conversão de tipos", "tipagem forte"]
discipline: "python"
learning_goal: "Refatorar para converter input() para int antes de operação aritmética."
exercise_type: "refactor"
stage: 6
context: "validação de entrada"
test_cases:
  - input: "5"
    output: "10"
---

## Enunciado

O código abaixo soma 5 ao valor lido, mas pode falhar se não converter a entrada. Refatore para usar int(input()) e armazenar em variável antes de somar. Para entrada "5", a saída deve ser 10.

```python
valor = input()
print(valor + 5)  # bug: valor é string
```

## Solução

```python
valor = int(input())
print(valor + 5)
```
