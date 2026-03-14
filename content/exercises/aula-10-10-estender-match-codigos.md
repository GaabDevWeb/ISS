---
title: "Estender match/case com novo código de status"
slug: "aula-10-10-estender-match-codigos"
difficulty: "medium"
concepts: ["match/case", "seleção múltipla"]
discipline: "python"
learning_goal: "Adicionar novo case ao match para código 3."
exercise_type: "extend_code"
stage: 8
context: "API"
test_cases:
  - input: "200"
    output: "OK"
  - input: "404"
    output: "Not Found"
  - input: "500"
    output: "Erro servidor"
---

## Enunciado

O código abaixo trata códigos 200 e 404. Estenda com um case para 500 exibindo "Erro servidor". Mantenha case _ para outros valores exibindo "Desconhecido".

```python
codigo = int(input())
match codigo:
    case 200:
        print("OK")
    case 404:
        print("Not Found")
    case _:
        print("Desconhecido")
```

## Solução

```python
codigo = int(input())
match codigo:
    case 200:
        print("OK")
    case 404:
        print("Not Found")
    case 500:
        print("Erro servidor")
    case _:
        print("Desconhecido")
```
