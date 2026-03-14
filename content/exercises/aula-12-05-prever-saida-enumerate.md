---
title: "Prever saída — enumerate"
slug: "aula-12-05-prever-saida-enumerate"
difficulty: "easy"
concepts: ["enumerate"]
discipline: "python"
learning_goal: "Prever saída de for com enumerate (índice, valor)."
exercise_type: "predict_output"
stage: 2
context: "processamento de dados"
expected_output: "0 a\n1 b\n2 c"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
for i, letra in enumerate("abc"):
    print(i, letra)
```

## Solução

A saída é:

```
0 a
1 b
2 c
```

enumerate produz (índice, elemento) a cada iteração.
