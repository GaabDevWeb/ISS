---
title: "Corrigir inicialização do acumulador"
slug: "aula-12-08-corrigir-inicializacao-acumulador"
difficulty: "easy"
concepts: ["acumuladores", "inicialização"]
discipline: "python"
learning_goal: "Inicializar acumulador com 0 antes do loop."
exercise_type: "fix_bug"
stage: 4
context: "validação de dados"
expected_output: "10"
---

## Enunciado

O código deveria somar os valores da lista e exibir 10. O bug é que total não foi inicializado antes do loop. Corrija.

```python
valores = [3, 7]
for v in valores:
    total += v
print(total)
```

## Solução

```python
valores = [3, 7]
total = 0
for v in valores:
    total += v
print(total)
```
