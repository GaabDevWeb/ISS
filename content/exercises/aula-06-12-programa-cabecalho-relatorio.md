---
title: "Programa — cabeçalho de relatório com bordas"
slug: "aula-06-12-programa-cabecalho-relatorio"
difficulty: "medium"
concepts: ["concatenação", "repetição", "molduras de texto"]
discipline: "python"
learning_goal: "Ler título e exibir moldura: borda, linha com título, borda."
exercise_type: "full_program"
stage: 12
context: "processamento de texto"
expected_output: |
  +----------+
  Vendas
  +----------+
---

## Enunciado

Escreva um programa que leia um título e exiba: uma linha com "+" e 10 "-" e "+", depois uma linha com o título, depois a mesma borda novamente. Use repetição para a borda. Exemplo para título "Vendas": primeira linha "+----------+", segunda "Vendas", terceira "+----------+".

## Solução

```python
titulo = input()
borda = "+" + "-" * 10 + "+"
print(borda)
print(titulo)
print(borda)
```
