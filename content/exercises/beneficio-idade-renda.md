---
title: "Benefício por idade e renda"
slug: "beneficio-idade-renda"
difficulty: "hard"
concepts: "if, and, input(), comparação"
discipline: "python"
---

## Enunciado

Um programa de benefício social atende pessoas com 60 anos ou mais e renda mensal menor que 2000 reais. Crie um programa que leia a idade (inteiro) e a renda mensal (número real) de uma pessoa. Se a pessoa tiver 60 anos ou mais **e** renda menor que 2000, exiba "Pode receber o benefício." Caso contrário, exiba "Não atende aos critérios."

Use o operador lógico `and` para combinar as duas condições. Converta a idade com `int()` e a renda com `float()`.

## Solução

```python
idade = int(input("Digite a idade: "))
renda = float(input("Digite a renda mensal (R$): "))
if idade >= 60 and renda < 2000:
    print("Pode receber o benefício.")
else:
    print("Não atende aos critérios.")
```
