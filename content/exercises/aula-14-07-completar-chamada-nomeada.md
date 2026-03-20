---
title: "Completar — chamada com argumentos nomeados"
slug: "aula-14-07-completar-chamada-nomeada"
difficulty: "medium"
concepts: ["argumentos posicionais e nomeados"]
discipline: "python"
learning_goal: "Montar chamada com inst= e prj= para obter valor esperado."
exercise_type: "complete_the_code"
stage: 5
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "99"
---

## Enunciado

```python
def montar_id(prj, inst):
    return prj * 10 + inst

print(montar_id(____________________))
```

## Solução

```python
def montar_id(prj, inst):
    return prj * 10 + inst

print(montar_id(inst=9, prj=9))
```
