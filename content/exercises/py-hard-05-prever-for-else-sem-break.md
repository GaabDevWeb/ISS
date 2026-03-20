---
title: "HARD — else do for"
slug: "py-hard-05-prever-for-else-sem-break"
difficulty: "hard"
concepts: ["laços for e range em Python", "fluxo condicional"]
discipline: "python"
learning_goal: "Saber quando o else do for corre."
exercise_type: "predict_output"
stage: 20
context: "validação de dados"
expected_output: "ok"
---

## Enunciado

```python
for k in range(3):
    if k * k > 20:
        break
else:
    print('ok')
```

## Solução

Nenhum `k` em 0,1,2 tem quadrado >20; não há `break`; executa o `else` → `ok`.
