---
title: "Montar URL com query params a partir de entradas"
slug: "aula-08-hard-05-montar-url-query-params"
difficulty: "hard"
concepts: ["f-strings", "input()", "interpolação de strings"]
discipline: "python"
learning_goal: "Construir URL de API com base e parâmetros nome=valor concatenados com &."
exercise_type: "full_program"
stage: 18
context: "API"
test_cases:
  - input: "https://api.exemplo.com/consulta\n2\npagina\n1\nlimite\n10"
    output: "https://api.exemplo.com/consulta?pagina=1&limite=10"
---

## Enunciado

Escreva um programa que leia: a base da URL (ex.: https://api.exemplo.com/consulta), um inteiro K e depois K pares (nome do parâmetro, valor). Monte e exiba a URL completa no formato BASE?nome1=valor1&nome2=valor2. Use um for para ler os K pares e acumule os fragmentos "nome=valor" em uma string com "&" entre eles; no final exiba base + "?" + essa string. Use apenas strings e f-strings (sem listas).

## Solução

```python
base = input()
k = int(input())
params = ""
for i in range(k):
    nome = input()
    valor = input()
    if i > 0:
        params += "&"
    params += f"{nome}={valor}"
print(f"{base}?{params}")
```
