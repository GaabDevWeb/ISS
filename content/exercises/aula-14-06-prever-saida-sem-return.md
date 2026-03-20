---
title: "Prever saída — retorno implícito None"
slug: "aula-14-06-prever-saida-sem-return"
difficulty: "easy"
concepts: ["return explícito e None implícito", "builtins print, input, int, float, type, len"]
discipline: "python"
learning_goal: "Associar side-effect print ao retorno None."
exercise_type: "predict_output"
stage: 2
context: "processamento de texto"
expected_output: "ping\n<class 'NoneType'>"
---

## Enunciado

```python
def aviso():
    print('ping')

print(type(aviso()))
```

## Solução

Primeiro `aviso()` imprime `ping` e retorna `None`; `type(None)` imprime `<class 'NoneType'>`. Linhas: `ping` e `<class 'NoneType'>`.
