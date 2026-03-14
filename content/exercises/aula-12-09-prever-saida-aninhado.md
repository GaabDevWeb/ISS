---
title: "Prever saída — loops aninhados"
slug: "aula-12-09-prever-saida-aninhado"
difficulty: "easy"
concepts: ["loops aninhados"]
discipline: "python"
learning_goal: "Prever ordem de execução de dois for aninhados."
exercise_type: "predict_output"
stage: 2
context: "processamento de dados"
expected_output: "1 1\n1 2\n2 1\n2 2"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
for i in range(1, 3):
    for j in range(1, 3):
        print(i, j)
```

## Solução

A saída é:

```
1 1
1 2
2 1
2 2
```

Para cada i (1, 2), o loop interno percorre j (1, 2).
