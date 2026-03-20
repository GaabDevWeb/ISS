---
title: "Estender — arredondar celsius para uma casa"
slug: "aula-14-27-estender-celsius-com-round"
difficulty: "medium"
concepts: ["builtins print, input, int, float, type, len", "return explícito e None implícito"]
discipline: "python"
learning_goal: "Aplicar round no resultado sem mudar a função de conversão."
exercise_type: "extend_code"
stage: 6
context: "monitoramento"
test_cases:
  - input: "98.6"
    output: "37.0"
---

## Enunciado

```python
def f_para_c(f):
    return (f - 32) * 5 / 9

print(f_para_c(float(input())))
```

Estenda apenas o `print` para exibir `round(..., 1)` do valor retornado (uma casa decimal). Entrada 98.6 → saída `37.0`.

## Solução

```python
def f_para_c(f):
    return (f - 32) * 5 / 9

print(round(f_para_c(float(input())), 1))
```
