---
title: "Programa — saudação com input e função"
slug: "aula-14-19-programa-saudacao-input"
difficulty: "medium"
concepts: ["def e chamada de função", "builtins input"]
discipline: "python"
learning_goal: "Encadear input, função e print."
exercise_type: "full_program"
stage: 10
context: "validação de entrada"
test_cases:
  - input: "Ana"
    output: "Ol\u00e1, Ana"
---

## Enunciado

Defina `cumprimentar(nome)` que retorna `Olá, ` + nome. Leia um nome com input e imprima o retorno.

## Solução

```python
def cumprimentar(nome):
    return 'Olá, ' + nome

print(cumprimentar(input()))
```
