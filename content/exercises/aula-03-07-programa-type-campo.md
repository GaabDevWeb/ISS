---
title: "Programa — exibir tipo de campo lido"
slug: "aula-03-07-programa-type-campo"
difficulty: "medium"
concepts: ["funções built-in type", "investigar objetos com type()"]
discipline: "python"
learning_goal: "Ler um valor, atribuir a variável e exibir o tipo resultante."
exercise_type: "full_program"
stage: 11
context: "validação de dados"
test_cases:
  - input: "42"
    output: "<class 'str'>"
---

## Enunciado

Escreva um programa que leia uma linha de entrada, armazene em uma variável e exiba o tipo dessa variável (usando `type()`). Para entrada "42", a saída será `<class 'str'>` porque `input()` retorna string.

## Solução

```python
campo = input()
print(type(campo))
```
