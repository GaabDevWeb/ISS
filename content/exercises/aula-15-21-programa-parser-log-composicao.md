---
title: "Programa — parser de linha de log com composição de funções"
slug: "aula-15-21-programa-parser-log-composicao"
difficulty: "hard"
concepts: ["composição de funções", "return", "múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão"]
discipline: "python"
learning_goal: "Implementar parser de log usando composição de funções e múltiplos retornos."
exercise_type: "full_program"
stage: 5
context: "análise de logs"
test_cases:
  - input: ""
    output: "🚨 [2024-03-15T10:23:45] auth-service: Token expirado para usuário #4821\nℹ️ [2024-03-15T10:24:01] api-gateway: Requisição recebida"
---

## Enunciado

Implemente 4 funções e componha-as para parsear e formatar linhas de log no formato `"TS | NIVEL | SERVICO | MENSAGEM"`:

1. `dividir_campos(linha, sep=" | ")` — divide pelo separador.
2. `extrair_metadados(campos)` — retorna `(timestamp, nivel, servico, mensagem)`.
3. `e_alerta(nivel, niveis_criticos=None)` — `True` se nível em `["ERROR","CRITICAL"]`.
4. `formatar_alerta(timestamp, servico, mensagem, critico)` — retorna string com `🚨` ou `ℹ️`.

```python
linha = "2024-03-15T10:23:45 | ERROR | auth-service | Token expirado para usuário #4821"
campos = dividir_campos(linha)
ts, nivel, servico, msg = extrair_metadados(campos)
print(formatar_alerta(ts, servico, msg, e_alerta(nivel)))

linha2 = "2024-03-15T10:24:01 | INFO | api-gateway | Requisição recebida"
campos2 = dividir_campos(linha2)
ts2, nivel2, servico2, msg2 = extrair_metadados(campos2)
print(formatar_alerta(ts2, servico2, msg2, e_alerta(nivel2)))
```

## Solução

```python
def dividir_campos(linha: str, sep: str = " | ") -> list:
    return linha.split(sep)

def extrair_metadados(campos: list) -> tuple:
    return campos[0], campos[1], campos[2], campos[3]

def e_alerta(nivel: str, niveis_criticos: list = None) -> bool:
    if niveis_criticos is None:
        niveis_criticos = ["ERROR", "CRITICAL"]
    return nivel in niveis_criticos

def formatar_alerta(timestamp: str, servico: str, mensagem: str, critico: bool) -> str:
    icone = "🚨" if critico else "ℹ️"
    return f"{icone} [{timestamp}] {servico}: {mensagem}"
```
