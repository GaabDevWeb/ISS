---
title: "Refatorar — usar string multilinha em vez de \\n"
slug: "aula-05-11-refatorar-para-multilinha"
difficulty: "easy"
concepts: ["strings multilinha com três aspas"]
discipline: "python"
learning_goal: "Refatorar string com \\n para equivalente em três aspas."
exercise_type: "refactor"
stage: 5
context: "processamento de texto"
expected_output: |
  Um
  Dois
---

## Enunciado

Refatore o código para usar uma única string de três aspas em vez de "Um\nDois". A saída deve continuar sendo duas linhas: Um e Dois.

```python
t = "Um\nDois"
print(t)
```

## Solução

```python
t = """Um
Dois"""
print(t)
```
