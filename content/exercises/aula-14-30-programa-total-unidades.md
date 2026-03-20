---
title: "Programa — total de unidades a partir de lista em texto"
slug: "aula-14-30-programa-total-unidades"
difficulty: "hard"
concepts: ["def e chamada de função", "builtins int", "PEP 8 snake_case e funções coesas"]
discipline: "python"
learning_goal: "Separar responsabilidades: parsing vs totalização."
exercise_type: "full_program"
stage: 14
context: "automação"
test_cases:
  - input: "2 3 4"
    output: "9"
---

## Enunciado

Implemente `total_unidades(partes)` que recebe uma lista de strings numéricas (já sem validar erros) e retorna a soma dos inteiros. No programa: leia uma linha, use `split()`, chame `total_unidades` e imprima o resultado.

## Solução

```python
def total_unidades(partes):
    s = 0
    for p in partes:
        s += int(p)
    return s

print(total_unidades(input().split()))
```
