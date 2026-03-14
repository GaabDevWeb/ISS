---
title: "Corrigir uso de palavra reservada como nome"
slug: "aula-03-08-corrigir-palavra-reservada"
difficulty: "easy"
concepts: ["palavras reservadas (keywords)"]
discipline: "python"
learning_goal: "Substituir nome de variável que usa keyword por nome válido."
exercise_type: "fix_bug"
stage: 4
context: "configuração"
expected_output: "10"
---

## Enunciado

O código abaixo usa um nome que é palavra reservada em Python, causando erro. Corrija usando um nome válido (ex.: `valor_print` ou `resultado`).

```python
print = 10
print(print)
```

## Solução

```python
resultado = 10
print(resultado)
```
