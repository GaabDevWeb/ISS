---
title: "Refatorar — usar variáveis para mensagens"
slug: "aula-02-11-refatorar-prints-variaveis"
difficulty: "easy"
concepts: ["algoritmos", "código claro"]
discipline: "python"
learning_goal: "Refatorar prints literais para usar variáveis com os textos."
exercise_type: "refactor"
stage: 5
context: "configuração"
expected_output: |
  Fase 1
  Fase 2
---

## Enunciado

Refatore o código para que as duas mensagens sejam primeiro atribuídas a variáveis `fase1` e `fase2` e depois exibidas com print. A saída deve continuar sendo duas linhas: "Fase 1" e "Fase 2".

```python
print("Fase 1")
print("Fase 2")
```

## Solução

```python
fase1 = "Fase 1"
fase2 = "Fase 2"
print(fase1)
print(fase2)
```
