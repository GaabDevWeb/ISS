---
title: "Prever saída — return vs print dentro da função"
slug: "aula-15-02-prever-return-vs-print"
difficulty: "easy"
concepts: ["return", "None"]
discipline: "python"
learning_goal: "Distinguir função que usa print de função que usa return observando a saída."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "Valor: 42\nNone\nValor: 42"
---

## Enunciado

O código abaixo possui duas funções: uma usa `print`, outra usa `return`. Escreva **exatamente** o que será impresso:

```python
def com_print(valor):
    print(f"Valor: {valor}")

def com_return(valor):
    return f"Valor: {valor}"

r1 = com_print(42)
r2 = com_return(42)
print(r1)
print(r2)
```

## Solução

```
Valor: 42
None
Valor: 42
```
