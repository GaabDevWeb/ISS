---
title: "Estender — montar URL com parâmetros via f-string"
slug: "aula-08-10-estender-url-parametros"
difficulty: "medium"
concepts: ["f-strings", "interpolação"]
discipline: "python"
learning_goal: "Construir URL de API interpolando base e recurso."
exercise_type: "extend_code"
stage: 8
context: "API"
test_cases:
  - input: "https://api.exemplo.com\n/users"
    output: "https://api.exemplo.com/users"
---

## Enunciado

O código abaixo lê a base da URL. Estenda para ler também o recurso (caminho) e exibir a URL completa no formato BASE/RECURSO (sem barra dupla no meio). Use f-string.

```python
base = input()
# leia recurso e exiba base + "/" + recurso
```

## Solução

```python
base = input()
recurso = input()
print(f"{base}/{recurso}")
```
