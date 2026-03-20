---
title: "Corrigir — definir função antes da chamada"
slug: "aula-14-10-corrigir-nameerror-ordem-def"
difficulty: "easy"
concepts: ["NameError (definição não executada no notebook)", "def e chamada de função"]
discipline: "python"
learning_goal: "Evitar NameError: colocar def antes do uso."
exercise_type: "fix_bug"
stage: 3
context: "automação"
test_cases:
  - input: ""
    output: "5"
---

## Enunciado

```python
print(proximo(4))

def proximo(n):
    return n + 1
```

## Solução

```python
def proximo(n):
    return n + 1

print(proximo(4))
```
