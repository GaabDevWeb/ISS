---
title: "Formatação com estilo % e .format()"
slug: "format-percent"
difficulty: "medium"
concepts: "interpolação, %s %d %f, .format()"
discipline: "python"
---

## Enunciado

Crie um programa que armazene um nome (string) e um valor numérico (float) em variáveis. Exiba uma mensagem usando o estilo de formatação com `%`: use `%s` para o nome e `%.2f` para o valor com duas casas decimais.

Exemplo: para nome `"Produto"` e valor `19.9`, a saída deve ser algo como `Produto custa 19.90 reais.`

Depois exiba a mesma mensagem usando o método `.format()` com placeholders `{}` e formatação `:.2f` para o valor.

## Solução

```python
nome = "Produto"
valor = 19.9
print("%s custa %.2f reais." % (nome, valor))
print("{} custa {:.2f} reais.".format(nome, valor))
```
