---
title: Refatorar — evitar concatenação manual com \n
slug: aula-05-novo-05-refatorar-evitar-concatenação-manual-com-n
difficulty: medium
concepts:
- literais de string
- aspas simples e duplas
- strings multilinha com três aspas
- SyntaxError por string não terminada
discipline: python
learning_goal: 'Praticar: literais de string, aspas simples e duplas, strings multilinha
  com três aspas'
exercise_type: refactor
stage: 4
context: processamento de texto
test_cases:
- input: ''
  output: 'Linha 1

    Linha 2'
---

## Enunciado

Refatore para usar string multilinha (três aspas) mantendo a mesma saída.

## Solução

```python
msg = """Linha 1
Linha 2"""
print(msg)
```
