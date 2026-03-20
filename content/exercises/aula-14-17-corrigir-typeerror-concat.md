---
title: "Corrigir — TypeError ao juntar número e string"
slug: "aula-14-17-corrigir-typeerror-concat"
difficulty: "medium"
concepts: ["TypeError por ordem ou tipo de argumentos", "builtins print, input, int, float, type, len"]
discipline: "python"
learning_goal: "Converter tipo antes de concatenar com str."
exercise_type: "fix_bug"
stage: 7
context: "processamento de texto"
test_cases:
  - input: ""
    output: "Total: 15"
---

## Enunciado

```python
def rotulo_total(n):
    return 'Total: ' + n

print(rotulo_total(15))
```

## Solução

```python
def rotulo_total(n):
    return 'Total: ' + str(n)

print(rotulo_total(15))
```
