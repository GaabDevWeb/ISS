---
title: "Completar join para montar CSV"
slug: "aula-07-06-completar-join"
difficulty: "easy"
concepts: ["split() e join()", "remontar textos"]
discipline: "python"
learning_goal: "Usar join() para unir lista com separador vírgula."
exercise_type: "complete_the_code"
stage: 3
context: "parsing de CSV/arquivos"
expected_output: "nome,idade,email"
---

## Enunciado

Complete o código para exibir "nome,idade,email". A lista de campos já está definida; use o método join com ",".

```python
campos = ["nome", "idade", "email"]
linha = _____.join(campos)  # preencha: string com ","
print(linha)
```

## Solução

```python
campos = ["nome", "idade", "email"]
linha = ",".join(campos)
print(linha)
```
