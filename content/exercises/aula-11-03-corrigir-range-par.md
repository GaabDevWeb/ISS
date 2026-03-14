---
title: "Corrigir range para números pares"
slug: "aula-11-03-corrigir-range-par"
difficulty: "easy"
concepts: ["range(start, stop, step)"]
discipline: "python"
learning_goal: "Usar range(2, 11, 2) para gerar 2, 4, 6, 8, 10."
exercise_type: "fix_bug"
stage: 3
context: "validação de dados"
expected_output: "2\n4\n6\n8\n10"
---

## Enunciado

O código deveria exibir os pares de 2 a 10 (2, 4, 6, 8, 10). Corrija o range: use start=2, stop=11 (ou 12), step=2.

```python
for i in range(10):  # bug: gera 0..9
    print(i)
```

## Solução

```python
for i in range(2, 11, 2):
    print(i)
```
