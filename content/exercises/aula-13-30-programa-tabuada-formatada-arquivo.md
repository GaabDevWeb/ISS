---
title: "Programa — tabuada formatada com cabeçalho e alinhamento"
slug: "aula-13-30-programa-tabuada-formatada-arquivo"
difficulty: "medium"
concepts: ["tabuada", "range(11)", "formatação", "f-string"]
discipline: "python"
learning_goal: "Programa completo: ler número, exibir tabuada 0-10 com cabeçalho e formatação (.format ou f-string)."
exercise_type: "full_program"
stage: 15
context: "processamento de dados"
expected_output: "Tabuada do numero: 5\n\n5 x 0 = 0\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50"
---

## Enunciado

Escreva um programa que lê um inteiro, imprime o cabeçalho "Tabuada do numero: X", uma linha em branco e a tabuada de 0 a 10 no formato "X x i = produto" (uma por linha). Use `range(11)` e f-string ou .format().

## Solução

```python
numero = int(input('Digite um numero: '))
print(f'Tabuada do numero: {numero}\n')
for i in range(11):
    print(f'{numero} x {i} = {numero * i}')
```

Para auto-grading com entrada fixa (ex.: 5), use `numero = 5` ou leia com input(); a saída esperada acima assume entrada 5.
