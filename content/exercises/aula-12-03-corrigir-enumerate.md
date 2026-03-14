---
title: "Corrigir uso de enumerate"
slug: "aula-12-03-corrigir-enumerate"
difficulty: "easy"
concepts: ["enumerate"]
discipline: "python"
learning_goal: "Usar enumerate para obter índice e elemento na iteração."
exercise_type: "fix_bug"
stage: 3
context: "processamento de dados"
expected_output: "0: x\n1: y\n2: z"
---

## Enunciado

O código abaixo usa range(len(lista)). Refatore para usar enumerate(lista) e desempacotar (i, item) em cada iteração. A saída deve continuar "0: x", "1: y", "2: z".

```python
lista = ["x", "y", "z"]
for i in range(len(lista)):
    print(f"{i}: {lista[i]}")
```

## Solução

```python
lista = ["x", "y", "z"]
for i, item in enumerate(lista):
    print(f"{i}: {item}")
```
