---
title: "Implementar — imprimir coordenadas de matriz M×N"
slug: "aula-13-13-implementar-matriz-coordenadas"
difficulty: "medium"
concepts: ["loops aninhados", "print(end=)"]
discipline: "python"
learning_goal: "Implementar função que imprime coordenadas (i,j) com uma linha do console por linha da matriz."
exercise_type: "implement_function"
stage: 4
context: "processamento de dados"
expected_output: "(0,0) (0,1) (0,2) \n(1,0) (1,1) (1,2) \n"
---

## Enunciado

Implemente a função `imprimir_matriz_coordenadas(linhas: int, colunas: int)` que imprime as coordenadas (i, j) da matriz, com uma linha do console por linha da matriz. Use dois `for` aninhados e `print(f'({i},{j})', end=' ')` dentro do interno; após o loop interno, use `print()` para quebrar a linha.

## Solução

```python
def imprimir_matriz_coordenadas(linhas: int, colunas: int) -> None:
    for i in range(linhas):
        for j in range(colunas):
            print(f'({i},{j})', end=' ')
        print()

imprimir_matriz_coordenadas(2, 3)
```
