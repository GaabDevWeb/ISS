---
title: "Implementar — matriz coordenadas acumulando string"
slug: "aula-13-20-implementar-matriz-result-string"
difficulty: "medium"
concepts: ["loops aninhados", "concatenação por linha", "result"]
discipline: "python"
learning_goal: "Imprimir coordenadas de matriz acumulando pares em uma string por linha."
exercise_type: "implement_function"
stage: 6
context: "processamento de dados"
expected_output: "(0,0) (0,1) \n(1,0) (1,1) \n"
---

## Enunciado

Implemente a função `matriz_coordenadas_string(linhas: int, colunas: int)` que imprime as coordenadas (i, j) usando a técnica de acumular em uma string por linha: dentro do loop externo, `result = ''`; no interno, `result += f'({i},{j}) '`; ao sair do interno, `print(result)`.

## Solução

```python
def matriz_coordenadas_string(linhas: int, colunas: int) -> None:
    for i in range(linhas):
        result = ''
        for j in range(colunas):
            result += f'({i},{j}) '
        print(result)

matriz_coordenadas_string(2, 2)
```
