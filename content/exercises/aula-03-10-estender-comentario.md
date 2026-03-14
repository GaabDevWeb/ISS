---
title: "Estender código com comentário explicativo"
slug: "aula-03-10-estender-comentario"
difficulty: "easy"
concepts: ["comentários e docstrings", "PEP 8"]
discipline: "python"
learning_goal: "Adicionar comentário que explica o cálculo, sem alterar a saída."
exercise_type: "extend_code"
stage: 5
context: "validação de dados"
expected_output: "15"
---

## Enunciado

O código abaixo calcula o total. Estende-o com um comentário de linha (#) explicando que o total é quantidade × preço unitário. A saída deve continuar sendo 15.

```python
qtd = 3
preco = 5
total = qtd * preco
print(total)
```

## Solução

```python
qtd = 3
preco = 5
# total é quantidade * preço unitário
total = qtd * preco
print(total)
```
