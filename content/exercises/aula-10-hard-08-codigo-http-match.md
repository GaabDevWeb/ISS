---
title: "Mensagem por código HTTP com match/case"
slug: "aula-10-hard-08-codigo-http-match"
difficulty: "hard"
concepts: ["match/case", "seleção múltipla"]
discipline: "python"
learning_goal: "Mapear códigos HTTP (200, 201, 400, 401, 404, 500) para mensagens."
exercise_type: "full_program"
stage: 17
context: "API"
test_cases:
  - input: "200"
    output: "OK"
  - input: "404"
    output: "Not Found"
  - input: "503"
    output: "Erro desconhecido"
---

## Enunciado

Escreva um programa que leia um código HTTP (int). Use match/case: 200 -> "OK", 201 -> "Created", 400 -> "Bad Request", 401 -> "Unauthorized", 404 -> "Not Found", 500 -> "Internal Server Error". Para qualquer outro código exiba "Erro desconhecido".

## Solução

```python
codigo = int(input())
match codigo:
    case 200: print("OK")
    case 201: print("Created")
    case 400: print("Bad Request")
    case 401: print("Unauthorized")
    case 404: print("Not Found")
    case 500: print("Internal Server Error")
    case _: print("Erro desconhecido")
```
