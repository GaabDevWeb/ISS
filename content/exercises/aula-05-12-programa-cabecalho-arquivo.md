---
title: "Programa — gerar cabeçalho de arquivo em multilinha"
slug: "aula-05-12-programa-cabecalho-arquivo"
difficulty: "medium"
concepts: ["strings multilinha", "reescrever textos como literais"]
discipline: "python"
learning_goal: "Ler título e autor e exibir cabeçalho no formato: Título: X / Autor: Y."
exercise_type: "full_program"
stage: 12
context: "arquivos de configuração"
test_cases:
  - input: "Relatório\nJoão"
    output: "Título: Relatório\nAutor: João"
---

## Enunciado

Escreva um programa que leia duas linhas: título e autor. Exiba duas linhas: "Título: TITULO" e "Autor: AUTOR".

## Solução

```python
titulo = input()
autor = input()
print("Título:", titulo)
print("Autor:", autor)
```
