---
title: "Refatorar — eliminar variáveis intermediárias em composição de funções"
slug: "aula-15-16-refatorar-composicao-sem-variaveis"
difficulty: "medium"
concepts: ["composição de funções", "return"]
discipline: "python"
learning_goal: "Refatorar código que armazena retornos intermediários desnecessários em composição de funções."
exercise_type: "refactor"
stage: 4
context: "análise de logs"
test_cases:
  - input: ""
    output: "🚨 Verificar imediatamente"
---

## Enunciado

Refatore eliminando variáveis intermediárias usadas apenas uma vez, sem alterar a saída:

```python
def extrair_nivel(linha_log: str) -> str:
    partes = linha_log.split("|")
    nivel = partes[0].strip()
    return nivel

def e_critico(nivel: str) -> bool:
    resultado = nivel in ("ERROR", "CRITICAL")
    return resultado

def gerar_alerta(critico: bool, mensagem: str) -> str:
    texto = f"🚨 {mensagem}" if critico else f"ℹ️ {mensagem}"
    return texto

linha = "ERROR | Falha na autenticação do usuário admin"
nivel_extraido = extrair_nivel(linha)
eh_critico = e_critico(nivel_extraido)
alerta = gerar_alerta(eh_critico, "Verificar imediatamente")
print(alerta)
```

## Solução

```python
def extrair_nivel(linha_log: str) -> str:
    return linha_log.split("|")[0].strip()

def e_critico(nivel: str) -> bool:
    return nivel in ("ERROR", "CRITICAL")

def gerar_alerta(critico: bool, mensagem: str) -> str:
    return f"🚨 {mensagem}" if critico else f"ℹ️ {mensagem}"

linha = "ERROR | Falha na autenticação do usuário admin"
print(gerar_alerta(e_critico(extrair_nivel(linha)), "Verificar imediatamente"))
```
