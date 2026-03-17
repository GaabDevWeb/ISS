---
title: "Prever saída — enumerate em lista"
slug: "aula-13-02-prever-saida-enumerate-lista"
difficulty: "easy"
concepts: ["enumerate", "índice e valor"]
discipline: "python"
learning_goal: "Prever a saída de um loop com enumerate()."
exercise_type: "predict_output"
stage: 1
context: "processamento de texto"
expected_output: "item 0: maca\nitem 1: uva\nitem 2: laranja"
---

## Enunciado

Qual é a saída exata do programa abaixo?

```python
frutas = ['maca', 'uva', 'laranja']
for i, nome in enumerate(frutas):
    print(f'item {i}: {nome}')
```

## Solução

A saída é:

```
item 0: maca
item 1: uva
item 2: laranja
```

Cada par (índice, valor) é impresso na forma "item i: nome".
