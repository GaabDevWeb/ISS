---
title: "Aceitar apenas string não vazia ou número positivo"
slug: "aula-10-hard-09-not-vazio-ou-numero"
difficulty: "hard"
concepts: ["truthy e falsy", "operadores not e or"]
discipline: "python"
learning_goal: "Validar entrada: rejeitar string vazia e número <= 0."
exercise_type: "full_program"
stage: 16
context: "validação de entrada"
test_cases:
  - input: "abc"
    output: "ok"
  - input: ""
    output: "rejeitado"
  - input: "0"
    output: "rejeitado"
---

## Enunciado

Escreva um programa que leia uma linha. Se for string não vazia (após strip), exiba "ok". Se for número (tente int ou float), exiba "ok" apenas se for positivo ( > 0); senão "rejeitado". Para string vazia exiba "rejeitado". Dica: use truthy para string e try/except para número; se converter para int/float, teste se valor > 0.

## Solução

```python
linha = input().strip()
if not linha:
    print("rejeitado")
else:
    try:
        num = float(linha)
        if num > 0:
            print("ok")
        else:
            print("rejeitado")
    except ValueError:
        print("ok")
```
