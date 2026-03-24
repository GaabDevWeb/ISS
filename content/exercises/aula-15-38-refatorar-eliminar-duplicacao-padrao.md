---
title: "Refatorar — eliminar duplicação com parâmetro padrão"
slug: "aula-15-38-refatorar-eliminar-duplicacao-padrao"
difficulty: "medium"
concepts: ["parâmetros com valor padrão", "return", "strings"]
discipline: "python"
learning_goal: "Refatorar código duplicado extraindo função com parâmetro padrão que cobre os diferentes casos."
exercise_type: "refactor"
stage: 4
context: "análise de logs"
test_cases:
  - input: ""
    output: "[INFO][sistema] Inicializado\n[ERROR][db] Falha na conexão\n[INFO][cache] Cache limpo"
---

## Enunciado

Refatore `formatar_info` e `formatar_erro` em uma única função `formatar_evento(mensagem, nivel="INFO", servico="sistema")`:

```python
def formatar_info(mensagem: str, servico: str = "sistema") -> str:
    return f"[INFO][{servico}] {mensagem}"

def formatar_erro(mensagem: str, servico: str = "sistema") -> str:
    return f"[ERROR][{servico}] {mensagem}"

print(formatar_info("Inicializado"))
print(formatar_erro("Falha na conexão", "db"))
print(formatar_info("Cache limpo", "cache"))
```

## Solução

```python
def formatar_evento(mensagem: str, nivel: str = "INFO", servico: str = "sistema") -> str:
    return f"[{nivel}][{servico}] {mensagem}"

print(formatar_evento("Inicializado"))
print(formatar_evento("Falha na conexão", nivel="ERROR", servico="db"))
print(formatar_evento("Cache limpo", servico="cache"))
```
