---
title: "Completar condicional — média aprovado/recuperação"
slug: "aula-09-02-completar-condicional-media"
difficulty: "easy"
concepts: ["if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Completar condição para classificar média em aprovado ou recuperação."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
test_cases:
  - input: "6.0"
    output: "Recuperação"
  - input: "8.0"
    output: "Aprovado"
---

## Enunciado

Complete o código para exibir "Aprovado" se media >= 7 e "Recuperação" caso contrário. A variável media já é lida como float.

```python
media = float(input())
if _____:  # media >= 7
    print("Aprovado")
else:
    print("Recuperação")
```

## Solução

```python
media = float(input())
if media >= 7:
    print("Aprovado")
else:
    print("Recuperação")
```
