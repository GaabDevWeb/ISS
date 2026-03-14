---
title: "Contar pares e ímpares em N números (for e range)"
slug: "aula-11-hard-03-par-impar-range"
difficulty: "hard"
concepts: ["for", "range()", "iteração"]
discipline: "python"
learning_goal: "Ler N e N inteiros, exibir quantidade de pares e de ímpares."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "5\n2\n3\n4\n5\n6"
    output: "3 2"
---

## Enunciado

Escreva um programa que leia N (int) e depois N inteiros. Conte quantos são pares (divisíveis por 2) e quantos são ímpares. Exiba duas contagens na mesma linha: "pares ímpares". Use for _ in range(N): e dois acumuladores (cont_pares, cont_impares) com condicional (if numero % 2 == 0).

## Solução

```python
n = int(input())
pares = 0
impares = 0
for _ in range(n):
    num = int(input())
    if num % 2 == 0:
        pares += 1
    else:
        impares += 1
print(pares, impares)
```
