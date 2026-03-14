---
title: "Estender — exibir linhas de log numeradas"
slug: "aula-11-10-estender-for-log"
difficulty: "medium"
concepts: ["for", "range(len())", "listas"]
discipline: "python"
learning_goal: "Percorrer lista de mensagens e exibir com número de linha."
exercise_type: "extend_code"
stage: 8
context: "logs"
expected_output: "1: ERRO\n2: OK\n3: OK"
---

## Enunciado

O código abaixo tem uma lista de mensagens. Complete o for para exibir cada mensagem no formato "N: MSG", onde N é o número da linha (1, 2, 3). Use range(len(msgs)) e índice i.

```python
msgs = ["ERRO", "OK", "OK"]
for i in range(len(msgs)):
    print(_____)  # formato "i+1: msgs[i]"
```

## Solução

```python
msgs = ["ERRO", "OK", "OK"]
for i in range(len(msgs)):
    print(f"{i + 1}: {msgs[i]}")
```
