---
title: "HARD — IMC com elif encadeado"
slug: "py-hard-17-programa-imc-quatro-faixas"
difficulty: "hard"
concepts: ["if/elif/else", "operadores relacionais", "conversão de tipos"]
discipline: "python"
learning_goal: "Faixas contíguas sem buracos."
exercise_type: "full_program"
stage: 20
context: "validação de dados"
test_cases:
  - input: "2\n100"
    output: "sobrepeso"
  - input: "2\n40"
    output: "baixo"
---

## Enunciado

Leia altura (m) e peso (kg). IMC = peso/altura². `<18.5`→`baixo`; `<25`→`normal`; `<30`→`sobrepeso`; senão→`obeso`.

## Solução

```python
h = float(input())
p = float(input())
imc = p / h ** 2
if imc < 18.5:
    print('baixo')
elif imc < 25:
    print('normal')
elif imc < 30:
    print('sobrepeso')
else:
    print('obeso')
```
