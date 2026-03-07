---
title: "Multiplicação e Divisão de Preços"
slug: "preco-unitario-fardo"
difficulty: "easy"
concepts: ["float", "divisão", "variáveis"]
discipline: "python"
---

## Enunciado

Um supermercado vende fardos de produtos e o gerente precisa saber o preço unitário para etiquetagem. O cenário envolve um fardo de 8 unidades que custa 32.00 reais. O programa deve calcular o custo de uma única unidade para automação da precificação de gôndola.

**Tarefa:** Defina `preco_fardo = 32.0` e `unidades = 8`. Calcule o `preco_unitario` e exiba o resultado.

## Solução

```python
preco_fardo = 32.0
unidades = 8
preco_unitario = preco_fardo / unidades
print(preco_unitario)
```
