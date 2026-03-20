---
title: "HARD — Substituir if/elif por match"
slug: "py-hard-27-refatorar-if-para-match"
difficulty: "hard"
concepts: ["match/case", "if/elif/else"]
discipline: "python"
learning_goal: "Traduzir ramos em cases."
exercise_type: "refactor"
stage: 20
context: "configuração"
test_cases:
  - input: "b"
    output: "2"
---

## Enunciado

Reescreva com `match`/`case`, mesmo comportamento:

```python
c = input().strip()
if c == 'a':
    print(1)
elif c == 'b':
    print(2)
else:
    print(0)
```

## Solução

```python
c = input().strip()
match c:
    case 'a':
        print(1)
    case 'b':
        print(2)
    case _:
        print(0)
```
