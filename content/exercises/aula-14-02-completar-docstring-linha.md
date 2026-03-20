---
title: "Completar — docstring da função saudacao"
slug: "aula-14-02-completar-docstring-linha"
difficulty: "easy"
concepts: ["docstrings, __doc__ e help()"]
discipline: "python"
learning_goal: "Fechar docstring PEP 257."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
test_cases:
  - input: ""
    output: "ok"
---

## Enunciado

Complete a linha com uma docstring de uma linha após `def saudacao(nome):`.

```python
def saudacao(nome):
    ________________
    return f'Olá, {nome}'

print('ok')
```

## Solução

```python
def saudacao(nome):
    """Retorna uma saudação com o nome."""
    return f'Olá, {nome}'

print('ok')
```
