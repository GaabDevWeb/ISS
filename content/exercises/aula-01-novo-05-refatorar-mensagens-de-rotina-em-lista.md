---
title: Refatorar — mensagens de rotina em lista
slug: aula-01-novo-05-refatorar-mensagens-de-rotina-em-lista
difficulty: medium
concepts:
- programação como ferramenta
- pensamento computacional
- curva de aprendizado
- curva do esquecimento
- tipagem dinâmica e forte em Python
- avaliação por competência
discipline: python
learning_goal: 'Praticar: programação como ferramenta, pensamento computacional, curva
  de aprendizado'
exercise_type: refactor
stage: 4
context: scripts de automação
test_cases:
- input: ''
  output: 'Aquecimento

    Exercícios

    Revisão'
---

## Enunciado

Refatore para evitar repetição: o programa deve imprimir cada item da lista em uma linha.

Entrada: vazia. Saída: três linhas.

## Solução

```python
tarefas = ["Aquecimento", "Exercícios", "Revisão"]
for t in tarefas:
    print(t)
```
