---
title: "Completar moldura de texto com + e *"
slug: "aula-06-06-completar-moldura"
difficulty: "easy"
concepts: ["concatenação de strings", "repetição", "molduras de texto"]
discipline: "python"
learning_goal: "Completar borda superior usando '+' e repetição de '-'."
exercise_type: "complete_the_code"
stage: 3
context: "processamento de texto"
expected_output: "+----------+"
---

## Enunciado

Complete o código para exibir uma linha no formato "+----------+" (um +, dez hífens, um +). Use concatenação e o operador * para repetir "-".

```python
borda = "+" + _____ * 10 + "+"  # preencha
print(borda)
```

## Solução

```python
borda = "+" + "-" * 10 + "+"
print(borda)
```
