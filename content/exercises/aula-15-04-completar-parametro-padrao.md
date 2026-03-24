---
title: "Completar — adicionar parâmetro padrão de nível de log"
slug: "aula-15-04-completar-parametro-padrao"
difficulty: "easy"
concepts: ["parâmetros com valor padrão", "return"]
discipline: "python"
learning_goal: "Completar assinatura de função adicionando valor padrão a parâmetro opcional."
exercise_type: "complete_the_code"
stage: 1
context: "análise de logs"
test_cases:
  - input: ""
    output: "[INFO] Serviço iniciado\n[ERROR] Disco cheio"
---

## Enunciado

Complete as lacunas `___` para que a função `formatar_log` use `"INFO"` como nível padrão:

```python
def formatar_log(mensagem, nivel=___):
    return f"[{___}] {mensagem}"

print(formatar_log("Serviço iniciado"))
print(formatar_log("Disco cheio", "ERROR"))
```

**Saída esperada:**
```
[INFO] Serviço iniciado
[ERROR] Disco cheio
```

## Solução

```python
def formatar_log(mensagem, nivel="INFO"):
    return f"[{nivel}] {mensagem}"

print(formatar_log("Serviço iniciado"))
print(formatar_log("Disco cheio", "ERROR"))
```
