---
title: "Corrigir nome de variável (case sensitive)"
slug: "aula-03-03-corrigir-nome-variavel"
difficulty: "easy"
concepts: ["atribuição e case sensitive", "variáveis em Python"]
discipline: "python"
learning_goal: "Corrigir uso inconsistente de nome de variável (Python é case sensitive)."
exercise_type: "fix_bug"
stage: 3
context: "configuração"
expected_output: "42"
---

## Enunciado

O código abaixo deveria exibir 42. Há um bug: a variável é atribuída com um nome e usada com outro (erro de capitalização). Corrija.

```python
valor = 42
print(Valor)
```

## Solução

```python
valor = 42
print(valor)
```
