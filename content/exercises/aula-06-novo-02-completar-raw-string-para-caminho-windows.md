---
title: Completar — raw string para caminho Windows
slug: aula-06-novo-02-completar-raw-string-para-caminho-windows
difficulty: easy
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
exercise_type: complete_the_code
stage: 2
context: scripts de automação
test_cases:
- input: ''
  output: C:\tmp\logs
---

## Enunciado

Complete para imprimir exatamente `C:\\tmp\\logs`.

```python
caminho = _________
print(caminho)
```

## Solução

```python
caminho = r"C:\tmp\logs"
print(caminho)
```
