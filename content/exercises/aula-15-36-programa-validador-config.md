---
title: "Programa — validador de arquivo de configuração chave=valor"
slug: "aula-15-36-programa-validador-config"
difficulty: "hard"
concepts: ["composição de funções", "múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "loops for", "strings"]
discipline: "python"
learning_goal: "Implementar validador completo de arquivo de configuração usando composição e múltiplos retornos."
exercise_type: "full_program"
stage: 5
context: "arquivos de configuração"
test_cases:
  - input: ""
    output: "Config válida: {'host': 'localhost', 'porta': '5432', 'timeout': '30', 'debug': 'true'}\nErros: ['Chave não permitida: usuario', 'Linha inválida: linha-sem-igual']"
---

## Enunciado

Implemente 3 funções para validar arquivo de configuração `chave=valor`:

1. `parsear_linha(linha)` — retorna `(chave, valor)` ou `(None, None)`.
2. `validar_chave(chave, permitidas=None)` — `True` se chave em `["host","porta","timeout","debug"]`.
3. `validar_config(linhas)` — retorna `(config_valida: dict, erros: list)`.

```python
config = ["host=localhost", "porta=5432", "timeout=30", "debug=true", "usuario=admin", "linha-sem-igual"]

config_ok, erros = validar_config(config)
print("Config válida:", config_ok)
print("Erros:", erros)
```

## Solução

```python
def parsear_linha(linha: str) -> tuple:
    if "=" not in linha:
        return None, None
    partes = linha.split("=", 1)
    return partes[0], partes[1]

def validar_chave(chave: str, permitidas: list = None) -> bool:
    if permitidas is None:
        permitidas = ["host", "porta", "timeout", "debug"]
    return chave in permitidas

def validar_config(linhas: list) -> tuple:
    config_valida = {}
    erros = []
    for linha in linhas:
        chave, valor = parsear_linha(linha)
        if chave is None:
            erros.append(f"Linha inválida: {linha}")
            continue
        if not validar_chave(chave):
            erros.append(f"Chave não permitida: {chave}")
            continue
        config_valida[chave] = valor
    return config_valida, erros
```
