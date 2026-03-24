---
title: "Refatorar — pipeline ETL com composição direta"
slug: "aula-15-23-refatorar-etl-composicao-direta"
difficulty: "hard"
concepts: ["composição de funções", "return", "parâmetros com valor padrão"]
discipline: "python"
learning_goal: "Refatorar pipeline ETL eliminando variáveis intermediárias e usando composição direta."
exercise_type: "refactor"
stage: 5
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "R$ 1.349,90"
---

## Enunciado

Refatore eliminando as 5 variáveis intermediárias (cada usada apenas uma vez), sem alterar a saída:

```python
def extrair_numero(texto: str) -> str:
    return texto.replace(".", "").replace(",", ".").strip()

def converter(texto: str) -> float:
    return float(texto)

def arredondar(valor: float, casas: int = 2) -> float:
    return round(valor, casas)

def formatar_brl(valor: float) -> str:
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

entrada = "1.349,90"
numero_str = extrair_numero(entrada)
numero_float = converter(numero_str)
arredondado = arredondar(numero_float)
formatado = formatar_brl(arredondado)
print(formatado)
```

## Solução

```python
def extrair_numero(texto: str) -> str:
    return texto.replace(".", "").replace(",", ".").strip()

def converter(texto: str) -> float:
    return float(texto)

def arredondar(valor: float, casas: int = 2) -> float:
    return round(valor, casas)

def formatar_brl(valor: float) -> str:
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

entrada = "1.349,90"
print(formatar_brl(arredondar(converter(extrair_numero(entrada)))))
```
