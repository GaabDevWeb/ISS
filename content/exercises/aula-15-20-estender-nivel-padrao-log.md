---
title: "Estender — adicionar nível padrão ao pipeline de log"
slug: "aula-15-20-estender-nivel-padrao-log"
difficulty: "medium"
concepts: ["parâmetros com valor padrão", "composição de funções", "return"]
discipline: "python"
learning_goal: "Estender pipeline de funções adicionando parâmetro padrão sem quebrar chamadas existentes."
exercise_type: "extend_code"
stage: 4
context: "análise de logs"
test_cases:
  - input: ""
    output: "[INFO][LOG] auth: Login bem-sucedido\n[ERROR][LOG] db: Conexão perdida"
---

## Enunciado

Estenda `formatar_entrada` e `gerar_linha_log` para aceitar `nivel="INFO"`. Chamadas sem `nivel` devem continuar funcionando:

```python
def formatar_entrada(servico: str, mensagem: str) -> str:
    return f"{servico}: {mensagem}"

def gerar_linha_log(servico: str, mensagem: str) -> str:
    entrada = formatar_entrada(servico, mensagem)
    return f"[LOG] {entrada}"

print(gerar_linha_log("auth", "Login bem-sucedido"))
print(gerar_linha_log("db", "Conexão perdida", nivel="ERROR"))
```

## Solução

```python
def formatar_entrada(servico: str, mensagem: str, nivel: str = "INFO") -> str:
    return f"[{nivel}] {servico}: {mensagem}"

def gerar_linha_log(servico: str, mensagem: str, nivel: str = "INFO") -> str:
    entrada = formatar_entrada(servico, mensagem, nivel)
    return f"[LOG] {entrada}"

print(gerar_linha_log("auth", "Login bem-sucedido"))
print(gerar_linha_log("db", "Conexão perdida", nivel="ERROR"))
```
