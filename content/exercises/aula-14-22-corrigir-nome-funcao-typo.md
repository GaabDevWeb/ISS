---
title: "Corrigir — typo no nome da função chamada"
slug: "aula-14-22-corrigir-nome-funcao-typo"
difficulty: "easy"
concepts: ["NameError (definição não executada no notebook)", "def e chamada de função"]
discipline: "python"
learning_goal: "Alinhar nome da chamada ao def (snake_case)."
exercise_type: "fix_bug"
stage: 4
context: "scripts de automação"
test_cases:
  - input: "5"
    output: "25"
---

## Enunciado

```python
def calcular_quadrado(n):
    return n * n

print(calc_quad(int(input())))
```

## Solução

```python
def calcular_quadrado(n):
    return n * n

print(calcular_quadrado(int(input())))
```
