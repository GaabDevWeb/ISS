---
title: "Refatorar — print(end=) para string acumulada"
slug: "aula-13-44-refatorar-end-espaco-para-acumulo"
difficulty: "medium"
concepts: ["print(end=) e concatenação por linha"]
discipline: "python"
learning_goal: "Substituir end= por acumulação e um print final."
exercise_type: "refactor"
stage: 8
context: "pipeline ETL"
expected_output: "A|B|C|"
---

## Enunciado

Sem usar `end=` em `print`.

```python
for ch in ['A', 'B', 'C']:
    print(ch, end='|')
```

## Solução

```python
s = ''
for ch in ['A', 'B', 'C']:
    s += ch + '|'
print(s)
```
