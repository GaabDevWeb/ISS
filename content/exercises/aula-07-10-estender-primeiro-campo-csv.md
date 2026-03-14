---
title: "Estender — extrair primeiro campo de linha CSV"
slug: "aula-07-10-estender-primeiro-campo-csv"
difficulty: "medium"
concepts: ["split()", "substrings", "parsing de CSV"]
discipline: "python"
learning_goal: "Usar split(',') e índice para obter primeiro campo."
exercise_type: "extend_code"
stage: 8
context: "parsing de CSV/arquivos"
test_cases:
  - input: "João,25,SP"
    output: "João"
---

## Enunciado

O código abaixo lê uma linha no formato CSV (ex.: "João,25,SP"). Estenda-o para exibir apenas o primeiro campo (antes da primeira vírgula). Use split(',').

```python
linha = input()
# exiba apenas o primeiro campo
```

## Solução

```python
linha = input()
campos = linha.split(",")
print(campos[0])
```
