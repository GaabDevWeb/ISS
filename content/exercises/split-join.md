---
title: "Split e join"
slug: "split-join"
difficulty: "medium"
concepts: "split(), join(), métodos de string"
discipline: "python"
---

## Enunciado

Crie um programa que armazene a string `"python java javascript"` (três palavras separadas por espaço). Use `split()` para obter uma lista das palavras e, em seguida, use `join()` para reunir as palavras separadas por vírgula e espaço (`, `). Exiba a nova string resultante.

Exemplo de saída: `python, java, javascript`

## Solução

```python
linguagens = "python java javascript"
lista = linguagens.split()
nova_string = ", ".join(lista)
print(nova_string)
```
