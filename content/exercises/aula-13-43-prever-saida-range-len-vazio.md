---
title: "Prever saída — range(len) em lista vazia"
slug: "aula-13-43-prever-saida-range-len-vazio"
difficulty: "easy"
concepts: ["len() em coleções", "enumerate e range(len)"]
discipline: "python"
learning_goal: "Prever laço vazio com len 0."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "0"
---

## Enunciado

```python
itens = []
c = 0
for i in range(len(itens)):
    c += 1
print(c)
```

## Solução

Saída: `0`.
