---
title: "Controle de peso de encomenda (transportadora)"
slug: "contexto-04-peso-encomenda-transportadora"
difficulty: "easy"
concepts: ["if/elif/else", "float", "operadores relacionais"]
discipline: "python"
learning_goal: "Sinalizar excesso, limite ou permitido com base em peso."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "10.5"
    output: "Excesso de peso."
  - input: "9.8"
    output: "Peso próximo ao limite. Verificar embalagem."
  - input: "5.0"
    output: "Permitido."
---

## Enunciado

Uma transportadora estabeleceu que encomendas acima de 10,0 kg não são aceitas no modal padrão, e que aquelas entre 9,5 kg e 10,0 kg devem ser verificadas. O operador informa o peso de cada pacote ao sistema. Desenvolva um programa em Python (Deepnote) que indique se o pacote está permitido, próximo ao limite ou em excesso, agilizando a triagem no pátio.

**Tarefa**  
Implemente um programa que, dado o peso em kg, exiba uma única mensagem conforme as faixas da empresa.

**Entrada**  
Uma linha com um número real positivo representando o peso do pacote em quilogramas.

**Saída**  
- Se peso > 10,0: exiba `Excesso de peso.`
- Se peso >= 9,5 e <= 10,0: exiba `Peso próximo ao limite. Verificar embalagem.`
- Caso contrário: exiba `Permitido.`

## Solução

```python
peso = float(input())
if peso > 10.0:
    print("Excesso de peso.")
elif peso >= 9.5:
    print("Peso próximo ao limite. Verificar embalagem.")
else:
    print("Permitido.")
```
