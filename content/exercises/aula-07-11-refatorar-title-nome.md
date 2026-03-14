---
title: "Refatorar — usar title() para nome próprio"
slug: "aula-07-11-refatorar-title-nome"
difficulty: "easy"
concepts: ["métodos de string (title, capitalize)"]
discipline: "python"
learning_goal: "Refatorar para usar .title() em vez de manipulação manual."
exercise_type: "refactor"
stage: 6
context: "validação de dados"
expected_output: "Maria Silva"
---

## Enunciado

Refatore o código para usar o método .title() da string, que capitaliza cada palavra. A saída deve ser "Maria Silva" quando a entrada for "maria silva".

```python
nome = input()
# sem title: primeira letra maiúscula manual
print(nome.title())
```

O código já usa title(); a tarefa é garantir que a entrada seja exibida com title(). Se o código original fosse algo como print(nome) com nome "maria silva", refatore para print(nome.title()).

## Solução

```python
nome = input()
print(nome.title())
```
