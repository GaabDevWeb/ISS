---
title: "Implementar tabuada com range e loop"
slug: "aula-12-04-implementar-tabuada"
difficulty: "easy"
concepts: ["tabuada", "range", "loops"]
discipline: "python"
learning_goal: "Exibir tabuada do 2 (2x1 até 2x10) usando for e range."
exercise_type: "implement_function"
stage: 4
context: "validação de dados"
expected_output: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
---

## Enunciado

Implemente um programa que exiba os resultados da tabuada do 2: 2*1, 2*2, ..., 2*10 (um resultado por linha). Use for i in range(1, 11) e print(2 * i).

## Solução

```python
for i in range(1, 11):
    print(2 * i)
```
