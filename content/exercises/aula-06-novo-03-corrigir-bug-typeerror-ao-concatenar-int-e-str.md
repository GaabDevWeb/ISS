---
title: Corrigir bug — TypeError ao concatenar int e str
slug: aula-06-novo-03-corrigir-bug-typeerror-ao-concatenar-int-e-str
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
exercise_type: fix_bug
stage: 3
context: análise de logs
test_cases:
- input: ''
  output: ID=10
---

## Enunciado

O programa deve imprimir `ID=10`. Corrija.

```python
id = 10
print("ID=" + id)
```

## Solução

```python
id = 10
print("ID=" + str(id))
```
