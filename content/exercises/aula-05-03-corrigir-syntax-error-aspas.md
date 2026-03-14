---
title: "Corrigir SyntaxError por aspas não fechadas"
slug: "aula-05-03-corrigir-syntax-error-aspas"
difficulty: "easy"
concepts: ["SyntaxError por string não terminada"]
discipline: "python"
learning_goal: "Corrigir string que quebra por aspas não balanceadas."
exercise_type: "fix_bug"
stage: 3
context: "processamento de texto"
expected_output: "Nome do arquivo: dados.csv"
---

## Enunciado

O código abaixo gera SyntaxError porque a string não está fechada corretamente. Corrija usando aspas duplas externas e simples internas (ou o contrário) para que exiba: Nome do arquivo: dados.csv

```python
nome = "Nome do arquivo: dados.csv'
print(nome)
```

## Solução

```python
nome = "Nome do arquivo: dados.csv"
print(nome)
```
