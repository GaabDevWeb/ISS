---
title: Refatorar — construir mensagem multi-linha
slug: aula-06-novo-05-refatorar-construir-mensagem-multi-linha
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
exercise_type: refactor
stage: 4
context: análise de logs
test_cases:
- input: ''
  output: 'OK

    FIM'
---

## Enunciado

Refatore para usar `\n` em vez de dois prints, mantendo a saída.

## Solução

```python
print("OK\nFIM")
```
