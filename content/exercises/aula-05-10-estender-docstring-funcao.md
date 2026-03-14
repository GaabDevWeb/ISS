---
title: "Estender função com docstring multilinha"
slug: "aula-05-10-estender-docstring-funcao"
difficulty: "easy"
concepts: ["strings multilinha", "docstring"]
discipline: "python"
learning_goal: "Adicionar docstring de três aspas descrevendo a função."
exercise_type: "extend_code"
stage: 6
context: "processamento de texto"
expected_output: "ok"
---

## Enunciado

Estenda a função abaixo com uma docstring (três aspas) na primeira linha após o `def`, descrevendo: "Retorna a string 'ok'." A saída do programa deve continuar sendo "ok".

```python
def ok():
    return "ok"
print(ok())
```

## Solução

```python
def ok():
    """Retorna a string 'ok'."""
    return "ok"
print(ok())
```
