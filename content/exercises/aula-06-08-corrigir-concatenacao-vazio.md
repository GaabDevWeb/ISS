---
title: "Corrigir concatenação que produz saída vazia"
slug: "aula-06-08-corrigir-concatenacao-vazio"
difficulty: "easy"
concepts: ["concatenação de strings", "tipagem forte"]
discipline: "python"
learning_goal: "Corrigir uso de variável não definida ou tipo errado na concatenação."
exercise_type: "fix_bug"
stage: 4
context: "API"
expected_output: "status: 200"
---

## Enunciado

O código deveria exibir "status: 200". Há um bug: está concatenando com variável de nome errado. Corrija.

```python
codigo = 200
print("status: " + codigo_str)  # codigo_str não existe
```

## Solução

```python
codigo = 200
print("status: " + str(codigo))
```
