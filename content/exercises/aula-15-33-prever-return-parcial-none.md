---
title: "Prever saída — return parcial retorna None em else implícito"
slug: "aula-15-33-prever-return-parcial-none"
difficulty: "easy"
concepts: ["return", "None", "if/elif/else"]
discipline: "python"
learning_goal: "Identificar que um return dentro de if sem else retorna None quando a condição é falsa."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "Em estoque: 5 unidades\nNone\n<class 'NoneType'>"
---

## Enunciado

Escreva **exatamente** o que será impresso:

```python
def checar_estoque(quantidade: int):
    if quantidade > 0:
        return f"Em estoque: {quantidade} unidades"

r1 = checar_estoque(5)
r2 = checar_estoque(0)
print(r1)
print(r2)
print(type(r2))
```

## Solução

```
Em estoque: 5 unidades
None
<class 'NoneType'>
```
