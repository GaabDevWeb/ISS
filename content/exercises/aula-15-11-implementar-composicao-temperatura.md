---
title: "Implementar — pipeline converter + formatar temperatura"
slug: "aula-15-11-implementar-composicao-temperatura"
difficulty: "medium"
concepts: ["composição de funções", "return", "parâmetros com valor padrão"]
discipline: "python"
learning_goal: "Implementar duas funções e compô-las passando o retorno de uma como argumento da outra."
exercise_type: "implement_function"
stage: 3
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "212.0°F"
---

## Enunciado

Implemente as duas funções e use composição direta:

1. `celsius_para_fahrenheit(c: float) -> float` — converte temperatura.
2. `formatar_temperatura(valor: float, unidade: str = "°F") -> str` — retorna `"XX.X°F"`.

```python
def celsius_para_fahrenheit(c: float) -> float:
    pass

def formatar_temperatura(valor: float, unidade: str = "°F") -> str:
    pass

print(formatar_temperatura(celsius_para_fahrenheit(100)))
```

## Solução

```python
def celsius_para_fahrenheit(c: float) -> float:
    return c * 9 / 5 + 32

def formatar_temperatura(valor: float, unidade: str = "°F") -> str:
    return f"{valor}{unidade}"

print(formatar_temperatura(celsius_para_fahrenheit(100)))
```
