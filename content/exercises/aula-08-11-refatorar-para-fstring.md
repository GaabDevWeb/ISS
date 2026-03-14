---
title: "Refatorar — usar f-string em vez de concatenação"
slug: "aula-08-11-refatorar-para-fstring"
difficulty: "easy"
concepts: ["f-strings", "preferir f-strings em código novo"]
discipline: "python"
learning_goal: "Refatorar concatenação com str() para f-string."
exercise_type: "refactor"
stage: 6
context: "logs"
expected_output: "Status: 200 OK"
---

## Enunciado

Refatore o código para usar f-string em vez de concatenação. A saída deve continuar sendo "Status: 200 OK".

```python
codigo = 200
msg = "OK"
print("Status: " + str(codigo) + " " + msg)
```

## Solução

```python
codigo = 200
msg = "OK"
print(f"Status: {codigo} {msg}")
```
