---
title: "Completar leitura e formatação com float e :.3f"
slug: "aula-08-06-completar-input-float"
difficulty: "easy"
concepts: ["input()", "conversão de tipos após input", ":.3f"]
discipline: "python"
learning_goal: "Ler número com float(input()) e exibir com três decimais."
exercise_type: "complete_the_code"
stage: 3
context: "validação de dados"
test_cases:
  - input: "3.14159"
    output: "3.142"
---

## Enunciado

Complete o código para ler um número real, converter com float(), e exibir com exatamente três casas decimais usando f-string.

```python
valor = _____(input())  # preencha: float
print(f"{valor:.3f}")
```

## Solução

```python
valor = float(input())
print(f"{valor:.3f}")
```
