---
title: "Programa — pipeline de normalização de preços via composição"
slug: "aula-15-18-programa-pipeline-normalizacao-precos"
difficulty: "medium"
concepts: ["composição de funções", "return", "parâmetros com valor padrão", "strings"]
discipline: "python"
learning_goal: "Implementar pipeline de três funções compostas para normalizar preços vindos de uma fonte de dados."
exercise_type: "full_program"
stage: 4
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "R$1169.91\nR$405.00\nR$80.99"
---

## Enunciado

Implemente `limpar_valor`, `converter_para_float` e `aplicar_desconto(valor, desconto=0.1)` e use composição direta:

```python
def limpar_valor(s: str) -> str:
    pass

def converter_para_float(s: str) -> float:
    pass

def aplicar_desconto(valor: float, desconto: float = 0.1) -> float:
    pass

entradas = ["R$ 1.299,90", "R$ 450,00", "R$ 89,99"]
for e in entradas:
    print(f"R${aplicar_desconto(converter_para_float(limpar_valor(e))):.2f}")
```

## Solução

```python
def limpar_valor(s: str) -> str:
    return s.replace("R$", "").replace(".", "").replace(",", ".").strip()

def converter_para_float(s: str) -> float:
    return float(s)

def aplicar_desconto(valor: float, desconto: float = 0.1) -> float:
    return round(valor * (1 - desconto), 2)

entradas = ["R$ 1.299,90", "R$ 450,00", "R$ 89,99"]
for e in entradas:
    print(f"R${aplicar_desconto(converter_para_float(limpar_valor(e))):.2f}")
```
