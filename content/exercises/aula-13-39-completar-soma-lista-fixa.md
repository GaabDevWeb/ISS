---
title: "Completar — soma de pedidos com acumulador"
slug: "aula-13-39-completar-soma-lista-fixa"
difficulty: "medium"
concepts: ["acumulador (inicialização e +=)", "teste de mesa"]
discipline: "python"
learning_goal: "Inicializar acumulador e usar += em lista fixa."
exercise_type: "complete_the_code"
stage: 4
context: "automação"
expected_output: "60"
---

## Enunciado

Complete.

```python
pedidos = [10, 25, 25]
total = ________
for valor in pedidos:
    total ________ valor
print(total)
```

## Solução

```python
pedidos = [10, 25, 25]
total = 0
for valor in pedidos:
    total += valor
print(total)
```
