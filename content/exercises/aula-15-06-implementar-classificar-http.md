---
title: "Implementar — classificar status HTTP com padrão"
slug: "aula-15-06-implementar-classificar-http"
difficulty: "easy"
concepts: ["parâmetros com valor padrão", "return", "if/elif/else"]
discipline: "python"
learning_goal: "Implementar função com parâmetro padrão que retorna classificação baseada em faixas."
exercise_type: "implement_function"
stage: 2
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "[HTTP] Sucesso\n[HTTP] Erro do cliente\n[API] Erro do servidor"
---

## Enunciado

Implemente `classificar_status(codigo, prefixo="HTTP")` que retorna a classificação do código HTTP:
- `"[prefixo] Sucesso"` se `200 <= codigo < 300`
- `"[prefixo] Redirecionamento"` se `300 <= codigo < 400`
- `"[prefixo] Erro do cliente"` se `400 <= codigo < 500`
- `"[prefixo] Erro do servidor"` se `500 <= codigo < 600`
- `"[prefixo] Desconhecido"` em qualquer outro caso

```python
def classificar_status(codigo, prefixo="HTTP"):
    pass

print(classificar_status(200))
print(classificar_status(404))
print(classificar_status(500, "API"))
```

## Solução

```python
def classificar_status(codigo, prefixo="HTTP"):
    if 200 <= codigo < 300:
        return f"[{prefixo}] Sucesso"
    elif 300 <= codigo < 400:
        return f"[{prefixo}] Redirecionamento"
    elif 400 <= codigo < 500:
        return f"[{prefixo}] Erro do cliente"
    elif 500 <= codigo < 600:
        return f"[{prefixo}] Erro do servidor"
    return f"[{prefixo}] Desconhecido"
```
