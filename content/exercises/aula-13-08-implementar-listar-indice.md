---
title: "Implementar — listar itens com índice (enumerate)"
slug: "aula-13-08-implementar-listar-indice"
difficulty: "easy"
concepts: ["enumerate", "len"]
discipline: "python"
learning_goal: "Implementar função que imprime cada elemento com seu índice usando enumerate."
exercise_type: "implement_function"
stage: 3
context: "processamento de texto"
expected_output: "0: maca\n1: uva\n2: laranja"
---

## Enunciado

Implemente a função `listar_com_indice(itens: list)` que recebe uma lista e imprime cada elemento no formato "índice: valor", um por linha. Use `enumerate(itens)`.

## Solução

```python
def listar_com_indice(itens: list) -> None:
    for i, valor in enumerate(itens):
        print(f'{i}: {valor}')

# Exemplo de uso:
listar_com_indice(['maca', 'uva', 'laranja'])
```
