---
title: "Completar string multilinha com três aspas"
slug: "aula-05-02-completar-multilinha"
difficulty: "easy"
concepts: ["strings multilinha com três aspas"]
discipline: "python"
learning_goal: "Completar literal multilinha para exibir duas linhas de texto."
exercise_type: "complete_the_code"
stage: 2
context: "processamento de texto"
expected_output: |
  Linha A
  Linha B
---

## Enunciado

Complete o código usando string de três aspas para que a saída tenha duas linhas: "Linha A" e "Linha B".

```python
texto = """
_____
_____
"""  # preencha as duas linhas
print(texto.strip())
```

## Solução

```python
texto = """Linha A
Linha B
"""
print(texto.strip())
```
