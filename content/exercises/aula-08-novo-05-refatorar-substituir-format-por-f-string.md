---
title: Refatorar — substituir format() por f-string
slug: aula-08-novo-05-refatorar-substituir-format-por-f-string
difficulty: medium
concepts:
- interpolação de strings
- operador % para formatação
- método format() de str
- f-strings
- input()
- conversão de tipos após input
discipline: python
learning_goal: 'Praticar: interpolação de strings, operador % para formatação, método
  format() de str'
exercise_type: refactor
stage: 4
context: processamento de texto
test_cases:
- input: 'Ana

    20

    '
  output: Ana tem 20 anos
---

## Enunciado

Refatore para usar f-string e manter a mesma saída.

## Solução

```python
nome = input().strip()
idade = int(input())
print(f"{nome} tem {idade} anos")
```
