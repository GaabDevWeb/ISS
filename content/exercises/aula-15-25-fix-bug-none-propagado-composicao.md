---
title: "Corrigir bug — None propagado em cadeia de composição"
slug: "aula-15-25-fix-bug-none-propagado-composicao"
difficulty: "hard"
concepts: ["composição de funções", "return", "None"]
discipline: "python"
learning_goal: "Identificar e corrigir None propagado em cadeia de composição por ausência de return."
exercise_type: "fix_bug"
stage: 5
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "Token: USR_ALIC"
---

## Enunciado

O pipeline abaixo levanta `TypeError` porque uma função usa `print` em vez de `return`. **Localize e corrija**:

```python
def normalizar(texto: str) -> str:
    limpo = texto.strip().lower()
    print(limpo)

def prefixar(texto: str, prefixo: str = "usr_") -> str:
    return f"{prefixo}{texto}"

def gerar_token(identificador: str) -> str:
    return identificador[:8].upper()

usuario = "  Alice  "
token = gerar_token(prefixar(normalizar(usuario)))
print(f"Token: {token}")
```

## Solução

```python
def normalizar(texto: str) -> str:
    return texto.strip().lower()

def prefixar(texto: str, prefixo: str = "usr_") -> str:
    return f"{prefixo}{texto}"

def gerar_token(identificador: str) -> str:
    return identificador[:8].upper()

usuario = "  Alice  "
token = gerar_token(prefixar(normalizar(usuario)))
print(f"Token: {token}")
```
