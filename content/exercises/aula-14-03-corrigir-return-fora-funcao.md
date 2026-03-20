---
title: "Corrigir — indentação de return"
slug: "aula-14-03-corrigir-return-fora-funcao"
difficulty: "easy"
concepts: ["def e chamada de função"]
discipline: "python"
learning_goal: "return dentro do corpo da função."
exercise_type: "fix_bug"
stage: 3
context: "automação"
test_cases:
  - input: "4"
    output: "16"
---

## Enunciado

```python
def quadrado(n):
return n * n

print(quadrado(int(input())))
```

## Solução

```python
def quadrado(n):
    return n * n

print(quadrado(int(input())))
```
