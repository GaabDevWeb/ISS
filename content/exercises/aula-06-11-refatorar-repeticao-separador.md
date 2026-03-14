---
title: "Refatorar — usar repetição para separador"
slug: "aula-06-11-refatorar-repeticao-separador"
difficulty: "easy"
concepts: ["repetição de strings", "operador *"]
discipline: "python"
learning_goal: "Refatorar linha longa usando repetição (ex.: 20 * '-')."
exercise_type: "refactor"
stage: 6
context: "processamento de texto"
expected_output: "--------------------"
---

## Enunciado

Refatore o código para usar o operador * e gerar uma linha com 20 hífens, em vez de escrever os 20 caracteres à mão. A saída deve ser "--------------------".

```python
sep = "--------------------"
print(sep)
```

## Solução

```python
sep = "-" * 20
print(sep)
```
