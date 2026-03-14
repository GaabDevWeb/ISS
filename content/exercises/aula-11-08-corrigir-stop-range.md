---
title: "Corrigir stop do range (não inclusivo)"
slug: "aula-11-08-corrigir-stop-range"
difficulty: "easy"
concepts: ["range()", "parada não inclusiva"]
discipline: "python"
learning_goal: "Ajustar range para incluir o último valor desejado (ex.: 1 a 5)."
exercise_type: "fix_bug"
stage: 4
context: "validação de dados"
expected_output: "1\n2\n3\n4\n5"
---

## Enunciado

O código deveria exibir 1, 2, 3, 4, 5 (um por linha). Corrija o range: o stop deve ser 6 para que 5 seja incluído (range(1, 5) só gera até 4).

```python
for i in range(1, 5):
    print(i)
```

## Solução

```python
for i in range(1, 6):
    print(i)
```
