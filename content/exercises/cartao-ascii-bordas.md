---
title: "Cartão de Boas-Vindas em ASCII"
slug: "cartao-ascii-bordas"
difficulty: "medium"
concepts: ["multiplicação de strings", "concatenação", "\\n"]
discipline: "python"
---

## Enunciado

Uma equipe de eventos está preparando um sistema simples para gerar cartões de boas-vindas em texto (ASCII) para participantes de um workshop. O cartão deve ter uma borda superior e inferior feitas com o caractere `=`, e linhas do meio com bordas laterais feitas com `=` e espaços no conteúdo.

**Tarefa:** Crie um programa que gere e exiba um cartão no formato abaixo, usando o caractere `=` e operações de repetição/concatenação. O cartão deve ser armazenado em uma variável string (por exemplo, `cartao`) e depois exibido. Largura da borda: 34 caracteres.

Formato esperado:
```
==================================
=                                =
=                                =
==================================
```

## Solução

```python
borda = 34 * '='
linha_meio = '=' + (32 * ' ') + '='
cartao = borda + '\n' + linha_meio + '\n' + linha_meio + '\n' + borda
print(cartao)
```
