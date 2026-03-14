---
title: "Completar docstring de função"
slug: "aula-03-06-completar-docstring"
difficulty: "easy"
concepts: ["comentários e docstrings", "PEP 8"]
discipline: "python"
learning_goal: "Completar docstring que descreve o que a função retorna."
exercise_type: "complete_the_code"
stage: 3
context: "processamento de texto"
expected_output: "5"
---

## Enunciado

Complete a docstring da função para descrever que ela retorna o dobro do valor. Use três aspas.

```python
def dobro(n):
    """_____"""  # preencha: Retorna o dobro de n.
    return n * 2
print(dobro(2) + 1)
```

## Solução

```python
def dobro(n):
    """Retorna o dobro de n."""
    return n * 2
print(dobro(2) + 1)
```
