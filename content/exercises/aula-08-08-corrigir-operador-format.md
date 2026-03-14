---
title: "Corrigir formatação — usar :.2f para decimal"
slug: "aula-08-08-corrigir-operador-format"
difficulty: "easy"
concepts: ["formatação :.2f", "f-strings"]
discipline: "python"
learning_goal: "Corrigir f-string para exibir preço com duas casas decimais."
exercise_type: "fix_bug"
stage: 4
context: "validação de dados"
expected_output: "Preço: 9.99"
---

## Enunciado

O código deveria exibir "Preço: 9.99" (duas casas decimais). O valor 9.99 está em variável. Corrija a f-string para usar formatação :.2f.

```python
preco = 9.99
print(f"Preço: {preco}")  # exibe 9.99 sem garantir duas decimais
```

## Solução

```python
preco = 9.99
print(f"Preço: {preco:.2f}")
```
