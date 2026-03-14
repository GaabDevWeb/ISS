---
title: "Gerar linhas de arquivo INI a partir de entradas"
slug: "aula-08-hard-10-config-ini-saida"
difficulty: "hard"
concepts: ["f-strings", "input()", "interpolação", "formatação"]
discipline: "python"
learning_goal: "Ler seção e pares chave=valor e exibir formato INI [seção] e chave = valor."
exercise_type: "full_program"
stage: 18
context: "arquivos de configuração"
test_cases:
  - input: "database\n2\nhost\nlocalhost\nport\n5432"
    output: "[database]\nhost = localhost\nport = 5432"
---

## Enunciado

Escreva um programa que leia o nome de uma seção, um inteiro K e K pares (chave, valor). Exiba na primeira linha "[SECAO]" e nas K linhas seguintes "chave = valor", uma por par. Use f-strings. Use for e range(K) para ler os pares.

## Solução

```python
secao = input()
k = int(input())
print(f"[{secao}]")
for _ in range(k):
    chave = input()
    valor = input()
    print(f"{chave} = {valor}")
```
