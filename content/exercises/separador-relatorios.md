---
title: "Linha de Separação para Relatórios"
slug: "separador-relatorios"
difficulty: "easy"
concepts: ["input()", "multiplicação de strings", "concatenação"]
discipline: "python"
---

## Enunciado

Um analista de dados precisa organizar seus relatórios de forma mais eficiente. Para facilitar a leitura e a organização visual, é fundamental que existam separadores claros entre as diferentes seções. O comprimento desejado para essas linhas de separação, bem como o caractere a ser usado, serão definidos previamente. Desenvolva um programa que automatize a criação dessas linhas.

**Tarefa:** Desenvolva um programa que, a partir de um caractere específico (por exemplo, `-`) e um comprimento desejado (por exemplo, `30`), gere uma linha de separação visual padronizada. A entrada consiste em duas informações: primeiro um caractere único e depois um número inteiro positivo. A saída deve ser uma única linha formada pela repetição do caractere, com o comprimento total informado.

## Solução

```python
caractere = input()
comprimento = int(input())
linha = caractere * comprimento
print(linha)
```
