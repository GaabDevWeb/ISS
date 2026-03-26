---
title: Refatorar — usar enumerate em vez de range(len)
slug: aula-12-novo-05-refatorar-usar-enumerate-em-vez-de-rangelen
difficulty: medium
concepts:
- range (stop, start/stop, start/stop/step)
- acumuladores
- operadores de atribuição composta (+=)
- tabuada
- enumerate
- loops aninhados
discipline: python
learning_goal: 'Praticar: range (stop, start/stop, start/stop/step), acumuladores,
  operadores de atribuição composta (+=)'
exercise_type: refactor
stage: 4
context: pipeline ETL
test_cases:
- input: 'a

    b

    c

    '
  output: 'idx=0 val=a

    idx=1 val=b

    idx=2 val=c'
---

## Enunciado

Leia 3 strings e imprima `idx=<i> val=<s>` usando enumerate.

## Solução

```python
vals = [input().strip(), input().strip(), input().strip()]
for i, s in enumerate(vals):
    print(f"idx={i} val={s}")
```
