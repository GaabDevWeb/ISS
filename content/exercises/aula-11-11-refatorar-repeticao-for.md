---
title: "Refatorar repetição com for"
slug: "aula-11-11-refatorar-repeticao-for"
difficulty: "easy"
concepts: ["laços for", "evitar código duplicado"]
discipline: "python"
learning_goal: "Substituir três prints iguais por um for com range(3)."
exercise_type: "refactor"
stage: 6
context: "processamento de texto"
expected_output: "---\n---\n---"
---

## Enunciado

Refatore o código para usar um for que repete 3 vezes a mesma linha, em vez de três prints. A saída deve ser três linhas com "---".

```python
print("---")
print("---")
print("---")
```

## Solução

```python
for _ in range(3):
    print("---")
```
