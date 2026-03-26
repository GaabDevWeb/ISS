---
title: Corrigir bug — match sem wildcard
slug: aula-10-novo-04-corrigir-bug-match-sem-wildcard
difficulty: medium
concepts:
- operadores lógicos and, or, not
- tabela-verdade
- truthy e falsy em Python
- match/case
- pattern matching estrutural
discipline: python
learning_goal: 'Praticar: operadores lógicos and, or, not, tabela-verdade, truthy
  e falsy em Python'
exercise_type: fix_bug
stage: 4
context: API
test_cases:
- input: '200

    '
  output: OK
- input: '500

    '
  output: Erro desconhecido
---

## Enunciado

O programa deve imprimir `Erro desconhecido` para códigos não mapeados. Corrija.

```python
codigo = int(input())
match codigo:
    case 200:
        print("OK")
```

## Solução

```python
codigo = int(input())
match codigo:
    case 200:
        print("OK")
    case _:
        print("Erro desconhecido")
```
