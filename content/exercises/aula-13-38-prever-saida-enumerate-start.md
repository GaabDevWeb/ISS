---
title: "Prever saída — enumerate com start"
slug: "aula-13-38-prever-saida-enumerate-start"
difficulty: "easy"
concepts: ["enumerate e range(len)"]
discipline: "python"
learning_goal: "Interpretar enumerate(seq, start=1)."
exercise_type: "predict_output"
stage: 2
context: "configuração"
expected_output: "1: x\n2: y"
---

## Enunciado

Saída exata?

```python
for k, item in enumerate(['x', 'y'], start=1):
    print(f'{k}: {item}')
```

## Solução

```
1: x
2: y
```
