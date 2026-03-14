---
title: "Corrigir TypeError em cálculo com input"
slug: "aula-08-03-corrigir-typeerror-input"
difficulty: "easy"
concepts: ["conversão de tipos após input", "TypeError ao misturar str e int"]
discipline: "python"
learning_goal: "Converter input() para int antes de operação aritmética."
exercise_type: "fix_bug"
stage: 3
context: "validação de entrada"
test_cases:
  - input: "5"
    output: "10"
---

## Enunciado

O código deveria ler um inteiro, somar 5 e exibir. Há TypeError porque input() retorna string. Corrija convertendo para int.

```python
n = input()
print(n + 5)
```

## Solução

```python
n = int(input())
print(n + 5)
```
