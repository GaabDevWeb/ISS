---
title: "Completar slice para substring"
slug: "aula-07-02-completar-slice"
difficulty: "easy"
concepts: ["slicing [inicio:fim:passo]", "substrings"]
discipline: "python"
learning_goal: "Completar slice que extrai 'dados' de 'meus_dados.csv'."
exercise_type: "complete_the_code"
stage: 2
context: "parsing de CSV/arquivos"
expected_output: "dados"
---

## Enunciado

Complete o slice para que extraia a substring "dados" de `s` (posições 5 a 10).

```python
s = "meus_dados.csv"
parte = s[_____:_____]  # preencha inicio e fim
print(parte)
```

## Solução

```python
s = "meus_dados.csv"
parte = s[5:10]
print(parte)
```
