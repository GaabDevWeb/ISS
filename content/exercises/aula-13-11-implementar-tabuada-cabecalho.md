---
title: "Implementar — tabuada com cabeçalho formatado"
slug: "aula-13-11-implementar-tabuada-cabecalho"
difficulty: "medium"
concepts: ["tabuada", "range(11)", "formatação", "f-string"]
discipline: "python"
learning_goal: "Implementar função que imprime tabuada de 0 a 10 com cabeçalho e formatação."
exercise_type: "implement_function"
stage: 4
context: "processamento de dados"
expected_output: "Tabuada do numero: 5\n\n5 x 0 = 0\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50"
---

## Enunciado

Implemente a função `imprimir_tabuada(numero: int)` que imprime um cabeçalho "Tabuada do numero: X", uma linha em branco e depois as linhas da tabuada de 0 a 10 no formato "numero x i = produto". Use `range(11)` e f-string.

## Solução

```python
def imprimir_tabuada(numero: int) -> None:
    print(f'Tabuada do numero: {numero}\n')
    for i in range(11):
        print(f'{numero} x {i} = {numero * i}')

imprimir_tabuada(5)
```
