---
title: "Corrigir TypeError na concatenação com número"
slug: "aula-06-03-corrigir-typeerror-concat"
difficulty: "easy"
concepts: ["tipagem forte com int e str", "TypeError"]
discipline: "python"
learning_goal: "Corrigir concatenação entre str e int usando str()."
exercise_type: "fix_bug"
stage: 3
context: "logs"
expected_output: "Total: 42"
---

## Enunciado

O código abaixo gera TypeError ao concatenar string com int. Corrija convertendo o número para string.

```python
total = 42
print("Total: " + total)
```

## Solução

```python
total = 42
print("Total: " + str(total))
```
