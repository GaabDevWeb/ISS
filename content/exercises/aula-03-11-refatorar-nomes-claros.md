---
title: "Refatorar — nomes de variáveis claros"
slug: "aula-03-11-refatorar-nomes-claros"
difficulty: "easy"
concepts: ["PEP 8 e Zen do Python", "nomes claros e válidos"]
discipline: "python"
learning_goal: "Refatorar variáveis com nomes mais descritivos (a, b -> quantidade, preco)."
exercise_type: "refactor"
stage: 6
context: "validação de dados"
expected_output: "150"
---

## Enunciado

Refatore o código usando nomes de variáveis mais claros: em vez de `a` e `b`, use `quantidade` e `preco`. A saída deve continuar sendo 150.

```python
a = 15
b = 10
print(a * b)
```

## Solução

```python
quantidade = 15
preco = 10
print(quantidade * preco)
```
