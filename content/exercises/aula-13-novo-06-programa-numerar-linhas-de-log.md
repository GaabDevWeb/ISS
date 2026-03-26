---
title: Programa — numerar linhas de log
slug: aula-13-novo-06-programa-numerar-linhas-de-log
difficulty: hard
concepts:
- teste de mesa
- acumulador (inicialização e +=)
- tabuada com range(11)
- enumerate e range(len)
- len() em coleções
- loops aninhados (linha e coluna)
discipline: python
learning_goal: 'Praticar: teste de mesa, acumulador (inicialização e +=), tabuada
  com range(11)'
exercise_type: full_program
stage: 5
context: análise de logs
test_cases:
- input: 'a

    b

    c

    '
  output: '#1 a

    #2 b

    #3 c'
---

## Enunciado

Leia 3 linhas de log e imprima `#<n> <linha>` (n começa em 1).

## Solução

```python
linhas = [input().rstrip("\n"), input().rstrip("\n"), input().rstrip("\n")]
for i, linha in enumerate(linhas, start=1):
    print(f"#{i} {linha}")
```
