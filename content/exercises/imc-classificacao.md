---
title: "IMC e classificação"
slug: "imc-classificacao"
difficulty: "hard"
concepts: "input(), float(), if/elif/else, notação de intervalo"
discipline: "python"
---

## Enunciado

Crie um programa que leia o peso (kg) e a altura (m) de uma pessoa, calcule o IMC (peso / altura²) e classifique de acordo com a tabela:

- Abaixo de 18.5: Abaixo do peso
- De 18.5 até 24.9: Peso ideal (Normal)
- De 25.0 até 29.9: Sobrepeso
- 30.0 ou mais: Obesidade

Use `float(input(...))` para as entradas, calcule o IMC e exiba o valor do IMC com uma casa decimal e a classificação. Use `if/elif/else` e notação de intervalo (ex.: `18.5 <= imc <= 24.9`).

## Solução

```python
peso = float(input("Digite o peso (kg): "))
altura = float(input("Digite a altura (m): "))
imc = peso / (altura ** 2)
if imc < 18.5:
    classificacao = "Abaixo do peso"
elif 18.5 <= imc <= 24.9:
    classificacao = "Peso ideal (Normal)"
elif 25.0 <= imc <= 29.9:
    classificacao = "Sobrepeso"
else:
    classificacao = "Obesidade"
print(f"IMC: {imc:.1f} - {classificacao}")
```
