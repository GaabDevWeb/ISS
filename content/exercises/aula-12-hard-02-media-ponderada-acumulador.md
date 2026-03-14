---
title: "Média ponderada com acumuladores (soma de peso*valor e soma de pesos)"
slug: "aula-12-hard-02-media-ponderada-acumulador"
difficulty: "hard"
concepts: ["acumuladores", "+=", "for", "range"]
discipline: "python"
learning_goal: "Ler N pares (valor, peso) e calcular média ponderada."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "3\n10\n1\n20\n2\n30\n1"
    output: "20.0"
---

## Enunciado

Escreva um programa que leia N (int) e depois N pares: para cada um, valor (float) e peso (float). Calcule a média ponderada: (soma de valor*peso) / (soma dos pesos). Use dois acumuladores: soma_peso_valor += valor * peso e soma_pesos += peso. Exiba o resultado com 1 casa decimal.

## Solução

```python
n = int(input())
soma_pv = 0
soma_pesos = 0
for _ in range(n):
    valor = float(input())
    peso = float(input())
    soma_pv += valor * peso
    soma_pesos += peso
media = soma_pv / soma_pesos
print(f"{media:.1f}")
```
