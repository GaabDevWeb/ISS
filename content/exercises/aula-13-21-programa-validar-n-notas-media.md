---
title: "Programa — validar N notas e exibir média e status"
slug: "aula-13-21-programa-validar-n-notas-media"
difficulty: "medium"
concepts: ["acumulador", "range", "condicional", "média"]
discipline: "python"
learning_goal: "Ler N notas, calcular média e exibir 'Aprovado' se média >= 6, senão 'Reprovado'."
exercise_type: "full_program"
stage: 11
context: "validação de entrada de usuário"
test_cases:
  - input: "3\n7.0\n8.0\n6.0"
    output: "Media: 7.00\nAprovado"
  - input: "2\n4.0\n5.0"
    output: "Media: 4.50\nReprovado"
---

## Enunciado

Escreva um programa que lê um inteiro N, depois N notas (float), calcula a média com duas casas decimais e exibe "Media: X.XX" e na linha seguinte "Aprovado" se média >= 6.0, caso contrário "Reprovado". Use acumulador para a soma.

## Solução

```python
n = int(input())
soma = 0
for i in range(n):
    soma += float(input())
media = soma / n if n > 0 else 0
print(f'Media: {media:.2f}')
if media >= 6.0:
    print('Aprovado')
else:
    print('Reprovado')
```
