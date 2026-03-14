---
title: "Completar f-string com casas decimais"
slug: "aula-08-02-completar-fstring-casas"
difficulty: "easy"
concepts: ["formatação de casas decimais com :.2f e :.3f", "f-strings"]
discipline: "python"
learning_goal: "Usar :.2f em f-string para exibir número com duas casas decimais."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
expected_output: "Total: 19.90"
---

## Enunciado

Complete a f-string para exibir o preço com exatamente duas casas decimais. Ex.: 19.9 deve aparecer como "Total: 19.90".

```python
preco = 19.9
print(f"Total: {preco_____}")  # preencha :.2f
```

## Solução

```python
preco = 19.9
print(f"Total: {preco:.2f}")
```
