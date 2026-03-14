---
title: "Programa — log formatado com tabulação"
slug: "aula-06-07-programa-log-formatado"
difficulty: "medium"
concepts: ["formatar mensagens de log com \\n e \\t"]
discipline: "python"
learning_goal: "Ler nível e mensagem e exibir linha de log com tabulação."
exercise_type: "full_program"
stage: 11
context: "logs"
test_cases:
  - input: "INFO\nConexão aberta"
    output: "INFO\tConexão aberta"
---

## Enunciado

Escreva um programa que leia duas linhas: nível do log (ex.: INFO) e mensagem. Exiba uma linha no formato: NIVEL\tMENSAGEM (com tabulação entre eles).

## Solução

```python
nivel = input()
msg = input()
print(nivel + "\t" + msg)
```
