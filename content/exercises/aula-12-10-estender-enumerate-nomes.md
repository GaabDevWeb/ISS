---
title: "Estender — listar itens com enumerate"
slug: "aula-12-10-estender-enumerate-nomes"
difficulty: "medium"
concepts: ["enumerate", "relatórios numéricos"]
discipline: "python"
learning_goal: "Usar enumerate para exibir lista de nomes numerada (1-based)."
exercise_type: "extend_code"
stage: 8
context: "processamento de dados"
expected_output: "1. João\n2. Maria\n3. Pedro"
---

## Enunciado

O código abaixo tem uma lista de nomes. Complete o print para exibir cada nome no formato "N. NOME", com N começando em 1 (use i+1 no lugar de N). Use enumerate(nomes).

```python
nomes = ["João", "Maria", "Pedro"]
for i, nome in enumerate(nomes):
    print(_____)  # formato "i+1. nome"
```

## Solução

```python
nomes = ["João", "Maria", "Pedro"]
for i, nome in enumerate(nomes):
    print(f"{i + 1}. {nome}")
```
