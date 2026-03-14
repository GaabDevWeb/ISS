---
title: "Implementar função calcular horas semanais"
slug: "aula-01-04-implementar-calcular-horas"
difficulty: "easy"
concepts: ["programação como ferramenta", "pensamento computacional"]
discipline: "python"
learning_goal: "Implementar função que calcula horas semanais de estudo a partir de parâmetros."
exercise_type: "implement_function"
stage: 4
context: "validação de dados"
test_cases:
  - input: "3\n4"
    output: "12"
  - input: "5\n2"
    output: "10"
---

## Enunciado

Implemente a função `calcular_horas_semanais(aulas_por_semana, horas_livres_por_dia)` que retorna o total de horas disponíveis por semana (aulas_por_semana × horas_livres_por_dia). O programa principal deve ler dois números (um por linha), chamar a função e imprimir apenas o resultado numérico.

## Solução

```python
def calcular_horas_semanais(aulas_por_semana, horas_livres_por_dia):
    return aulas_por_semana * horas_livres_por_dia

a = int(input())
b = int(input())
print(calcular_horas_semanais(a, b))
```
