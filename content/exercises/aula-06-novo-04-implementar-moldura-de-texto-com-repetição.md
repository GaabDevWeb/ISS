---
title: Implementar — moldura de texto com repetição
slug: aula-06-novo-04-implementar-moldura-de-texto-com-repetição
difficulty: medium
concepts:
- caracteres de escape em strings
- quebra de linha com \n
- tabulação com \t
- raw strings
- concatenação de strings
- repetição de strings
discipline: python
learning_goal: 'Praticar: caracteres de escape em strings, quebra de linha com \n,
  tabulação com \t'
exercise_type: implement_function
stage: 4
context: processamento de texto
test_cases:
- input: '5

    '
  output: '-----'
---

## Enunciado

Leia um inteiro `n` e imprima uma linha com `n` caracteres `-`.

## Solução

```python
n = int(input())
print(n * "-")
```
