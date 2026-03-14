---
title: "Programa — roteiro de etapas a partir de entrada"
slug: "aula-02-12-programa-roteiro-etapas"
difficulty: "medium"
concepts: ["decompor problemas", "executar e testar programas Python"]
discipline: "python"
learning_goal: "Ler nome de etapa e exibir roteiro no formato 'Etapa: NOME'."
exercise_type: "full_program"
stage: 12
context: "configuração"
test_cases:
  - input: "Extração"
    output: "Etapa: Extração"
---

## Enunciado

Escreva um programa que leia uma string (nome de uma etapa) e exiba uma linha no formato: "Etapa: NOME_DA_ETAPA".

## Solução

```python
nome = input()
print("Etapa:", nome)
```
