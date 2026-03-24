---
title: "Prever saída — TypeError ao operar com None"
slug: "aula-15-03-prever-none-typeerror"
difficulty: "easy"
concepts: ["return", "None"]
discipline: "python"
learning_goal: "Identificar que usar None em operação aritmética levanta TypeError."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "TypeError: can only concatenate str (not \"NoneType\") to str"
---

## Enunciado

Qual **exceção** será levantada ao executar o código abaixo? Escreva o tipo do erro e uma explicação de uma linha:

```python
def saudacao(nome):
    print(f"Olá, {nome}!")

resultado = saudacao("Carlos")
total = resultado + " — bem-vindo ao sistema"
print(total)
```

## Solução

`TypeError: can only concatenate str (not "NoneType") to str`

`saudacao` usa `print`, não `return`. Logo `resultado` é `None`. Concatenar `None` com string levanta `TypeError`.
