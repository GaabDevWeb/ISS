---
title: "Estender log com timestamp no início"
slug: "aula-06-10-estender-log-timestamp"
difficulty: "medium"
concepts: ["concatenação de strings", "mensagens de log"]
discipline: "python"
learning_goal: "Estender código para prefixar mensagem de log com timestamp fixo."
exercise_type: "extend_code"
stage: 7
context: "logs"
expected_output: "2024-01-15 10:00 | Iniciando processo"
---

## Enunciado

O código abaixo imprime apenas a mensagem. Estenda para que a saída seja "2024-01-15 10:00 | MENSAGEM". Use uma variável para o timestamp e concatene.

```python
msg = "Iniciando processo"
# exiba "2024-01-15 10:00 | " + msg
print(msg)
```

## Solução

```python
msg = "Iniciando processo"
timestamp = "2024-01-15 10:00"
print(timestamp + " | " + msg)
```
