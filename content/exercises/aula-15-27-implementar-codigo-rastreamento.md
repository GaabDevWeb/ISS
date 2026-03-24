---
title: "Implementar — gerador de código de rastreamento com composição"
slug: "aula-15-27-implementar-codigo-rastreamento"
difficulty: "medium"
concepts: ["composição de funções", "return", "strings", "parâmetros com valor padrão"]
discipline: "python"
learning_goal: "Implementar gerador de código via composição de funções de normalização e formatação."
exercise_type: "implement_function"
stage: 3
context: "scripts de automação"
test_cases:
  - input: ""
    output: "PED-FER-1042\nORD-CAR-88"
---

## Enunciado

Implemente e compose as três funções:

1. `normalizar_nome(nome)` — remove espaços das pontas e converte para maiúsculas.
2. `abreviar(texto, tamanho=3)` — retorna os primeiros `tamanho` caracteres.
3. `gerar_codigo(nome, numero, prefixo="PED")` — retorna `"PREFIXO-ABR-NUMERO"`.

```python
print(gerar_codigo("  fernanda lima  ", 1042))
print(gerar_codigo("carlos", 88, prefixo="ORD"))
```

## Solução

```python
def normalizar_nome(nome: str) -> str:
    return nome.strip().upper()

def abreviar(texto: str, tamanho: int = 3) -> str:
    return texto[:tamanho]

def gerar_codigo(nome: str, numero: int, prefixo: str = "PED") -> str:
    abreviado = abreviar(normalizar_nome(nome))
    return f"{prefixo}-{abreviado}-{numero}"
```
