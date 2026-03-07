---
title: "Replace e formatação de caixa"
slug: "replace-capitalize"
difficulty: "medium"
concepts: "replace(), capitalize(), title(), métodos de string"
discipline: "python"
---

## Enunciado

Crie um programa que armazene a string `"hello python world"` em uma variável. Em seguida:

1. Substitua todas as ocorrências de `"o"` por `"0"` (zero) usando `replace()` e exiba o resultado.
2. Exiba a string com a primeira letra de cada palavra em maiúscula usando `title()`.
3. Exiba a string apenas com a primeira letra da frase em maiúscula usando `capitalize()`.

Cada resultado em uma linha.

## Solução

```python
texto = "hello python world"
print(texto.replace("o", "0"))
print(texto.title())
print(texto.capitalize())
```
