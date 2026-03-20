---
title: "Estender — coordenadas com marcação na diagonal"
slug: "aula-13-37-estender-matriz-diagonal-msg"
difficulty: "medium"
concepts: ["loops aninhados (linha e coluna)", "concatenação por linha"]
discipline: "python"
learning_goal: "Destacar células onde linha == coluna."
exercise_type: "extend_code"
stage: 10
context: "validação de dados"
expected_output: "0,0 *\n0,1\n1,0\n1,1 *"
---

## Enunciado

Quando `linha == coluna`, imprima `linha,coluna *`; senão `linha,coluna`.

```python
for linha in range(2):
    for col in range(2):
        print(f'{linha},{col}')
```

## Solução

```python
for linha in range(2):
    for col in range(2):
        if linha == col:
            print(f'{linha},{col} *')
        else:
            print(f'{linha},{col}')
```
