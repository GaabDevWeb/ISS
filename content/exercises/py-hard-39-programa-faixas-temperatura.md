---
title: "HARD — Quatro faixas de temperatura"
slug: "py-hard-39-programa-faixas-temperatura"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "expressão booleana"]
discipline: "python"
learning_goal: "Quatro limiares contíguos sem lacunas."
exercise_type: "full_program"
stage: 20
context: "dados de monitoramento"
test_cases:
  - input: "15"
    output: "mild"
---

## Enunciado

Leia temperatura inteira. Com **if/elif** imprima: `<0`→`frio`; `0..15`→`mild`; `16..30`→`quente`; caso contrário→`extremo`.

## Solução

```python
t = int(input())
if t < 0:
    print('frio')
elif t <= 15:
    print('mild')
elif t <= 30:
    print('quente')
else:
    print('extremo')
```
