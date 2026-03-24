---
title: "Prever saída — composição com três funções e parâmetro padrão"
slug: "aula-15-26-prever-composicao-tres-funcoes"
difficulty: "easy"
concepts: ["composição de funções", "parâmetros com valor padrão", "return"]
discipline: "python"
learning_goal: "Rastrear o fluxo de dados em composição de três funções com parâmetros padrão."
exercise_type: "predict_output"
stage: 1
context: "processamento de texto"
expected_output: "R$ 110.00\n€ 105.00"
---

## Enunciado

Escreva **exatamente** o que será impresso:

```python
def dobrar(n: float) -> float:
    return n * 2

def somar_taxa(n: float, taxa: float = 10.0) -> float:
    return n + taxa

def formatar(n: float, simbolo: str = "R$") -> str:
    return f"{simbolo} {n:.2f}"

print(formatar(somar_taxa(dobrar(50.0))))
print(formatar(somar_taxa(dobrar(50.0), taxa=5.0), simbolo="€"))
```

## Solução

```
R$ 110.00
€ 105.00
```
