---
title: "Refatorar — usar if/else para sinal"
slug: "aula-09-11-refatorar-condicional-positivo"
difficulty: "easy"
concepts: ["if/elif/else", "expressão booleana"]
discipline: "python"
learning_goal: "Refatorar cálculo para usar condicional e exibir 'positivo' ou 'negativo'."
exercise_type: "refactor"
stage: 6
context: "validação de dados"
test_cases:
  - input: "3"
    output: "positivo"
  - input: "-2"
    output: "negativo"
---

## Enunciado

Refatore o código para usar if/else: se o número lido for >= 0 exiba "positivo", senão "negativo". A entrada é um inteiro.

```python
n = int(input())
# substituir por if n >= 0: ... else: ...
print("positivo" if n >= 0 else "negativo")  # refatore para if/else explícito
```

## Solução

```python
n = int(input())
if n >= 0:
    print("positivo")
else:
    print("negativo")
```
