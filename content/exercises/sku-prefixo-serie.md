---
title: "Código SKU com Prefixo e Série"
slug: "sku-prefixo-serie"
difficulty: "easy"
concepts: ["concatenação", "variáveis", "strings"]
discipline: "python"
---

## Enunciado

A equipe de gerenciamento de estoque de uma loja de varejo busca otimizar a criação de códigos de produtos, conhecidos como SKUs (Stock Keeping Units). Para cada novo item, é necessário gerar um identificador único, combinando um prefixo da categoria do produto e um número de série. O objetivo é desenvolver um pequeno programa em Python que automatize a montagem desses códigos.

**Tarefa:** O programa deve receber um prefixo de categoria e um número de série como dados, armazenados em variáveis (por exemplo, `prefixo = 'ELT'` e `numero_serie = '12345'`). O código SKU completo é construído combinando o prefixo da categoria e, em seguida, o número de série. Ao final, o programa deve exibir o código SKU gerado.

## Solução

```python
prefixo = 'ELT'
numero_serie = '12345'
codigo_sku = prefixo + numero_serie
print(codigo_sku)
```
