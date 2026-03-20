---
title: "HARD — Tabuada 0..10"
slug: "py-hard-36-corrigir-tabuada-incompleta"
difficulty: "hard"
concepts: ["tabuada com range(11)"]
discipline: "python"
learning_goal: "Corrigir limite superior do range."
exercise_type: "fix_bug"
stage: 19
context: "validação de entrada"
test_cases:
  - input: ""
    output: "55"
---

## Enunciado

Deve imprimir soma de 0+1+…+10 (use laço `for i in range(???):` sobre a tabuada do 1?). **Correção do enunciado:** some os números 0 a 10 inclusive com um único `for` e acumulador.

```python
s = 0
for i in range(10):
    s += i
print(s)
```

## Solução

`range(10)` omite 10. Use `range(11)` → soma 0..10 = 55.

```python
s = 0
for i in range(11):
    s += i
print(s)
```
