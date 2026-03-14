---
title: "Prever saída — if simples"
slug: "aula-09-01-prever-saida-if"
difficulty: "easy"
concepts: ["if/elif/else", "fluxo condicional"]
discipline: "python"
learning_goal: "Prever qual ramo do if é executado."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "Aprovado"
---

## Enunciado

Qual é a saída do programa abaixo?

```python
media = 8.0
if media >= 7.0:
    print("Aprovado")
else:
    print("Reprovado")
```

## Solução

A saída é:

```
Aprovado
```

media >= 7.0 é True, então executa o primeiro bloco.
