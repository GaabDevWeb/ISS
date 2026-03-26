---
title: Programa — checklist de tarefas (3 itens)
slug: aula-02-novo-06-programa-checklist-de-tarefas-3-itens
difficulty: hard
concepts:
- algoritmos
- pensamento computacional
- linguagem de programação Python
- notebooks e IDE
- Deepnote
discipline: python
learning_goal: 'Praticar: algoritmos, pensamento computacional, linguagem de programação
  Python'
exercise_type: full_program
stage: 5
context: scripts de automação
test_cases:
- input: 'ler

    aulas

    praticar

    '
  output: '- ler

    - aulas

    - praticar'
---

## Enunciado

Leia três strings (uma por linha) e imprima um checklist no formato `- <tarefa>`.

## Solução

```python
t1 = input().strip()
t2 = input().strip()
t3 = input().strip()
print(f"- {t1}")
print(f"- {t2}")
print(f"- {t3}")
```
