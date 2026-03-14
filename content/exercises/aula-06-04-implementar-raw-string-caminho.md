---
title: "Implementar raw string para caminho de arquivo"
slug: "aula-06-04-implementar-raw-string-caminho"
difficulty: "easy"
concepts: ["raw strings", "caminhos de arquivo"]
discipline: "python"
learning_goal: "Usar raw string para representar caminho com barras invertidas."
exercise_type: "implement_function"
stage: 4
context: "processamento de dados"
expected_output: "C:\Users\aluno\dados.csv"
---

## Enunciado

Implemente uma variável `caminho` que contenha exatamente o texto `C:\Users\aluno\dados.csv` e exiba com print. Use raw string (r"...") para evitar que a barra invertida seja interpretada como escape.

## Solução

```python
caminho = r"C:\Users\aluno\dados.csv"
print(caminho)
```
