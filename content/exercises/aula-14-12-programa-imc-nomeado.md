---
title: "Programa — IMC com argumentos nomeados"
slug: "aula-14-12-programa-imc-nomeado"
difficulty: "medium"
concepts: ["argumentos posicionais e nomeados", "builtins print, input, int, float, type, len", "return explícito e None implícito"]
discipline: "python"
learning_goal: "Chamar função com peso_kg= e altura_m= após conversão."
exercise_type: "full_program"
stage: 11
context: "validação de dados"
test_cases:
  - input: "70\n1.75"
    output: "22.86"
---

## Enunciado

Defina `imc(peso_kg, altura_m)` que retorna peso_kg / altura_m ** 2. Leia peso e altura (float). Imprima o IMC com duas casas: use `round` e formatação `f'{v:.2f}'`.

## Solução

```python
def imc(peso_kg, altura_m):
    return peso_kg / altura_m ** 2

p = float(input())
a = float(input())
v = imc(peso_kg=p, altura_m=a)
print(f'{round(v, 2):.2f}')
```
