---
title: "Implementar — validar payload de API com múltiplos retornos"
slug: "aula-15-22-implementar-validar-payload-api"
difficulty: "hard"
concepts: ["múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "return"]
discipline: "python"
learning_goal: "Implementar validador de payload que retorna múltiplos valores de diagnóstico."
exercise_type: "implement_function"
stage: 5
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "True [] 3\nFalse ['Campo ausente: moeda', 'Valor deve ser positivo'] 2\nFalse ['Campo ausente: id', 'Campo ausente: valor', 'Campo ausente: moeda'] 0"
---

## Enunciado

Implemente `validar_payload(payload, campos_obrigatorios=None)` que retorna `(valido, erros, campos_ok)`:

```python
def validar_payload(payload: dict, campos_obrigatorios: list = None) -> tuple:
    pass

ok, erros, qtd = validar_payload({"id": "TX-001", "valor": 150.0, "moeda": "BRL"})
print(ok, erros, qtd)

ok, erros, qtd = validar_payload({"id": "TX-002", "valor": -5.0})
print(ok, erros, qtd)

ok, erros, qtd = validar_payload({})
print(ok, erros, qtd)
```

## Solução

```python
def validar_payload(payload: dict, campos_obrigatorios: list = None) -> tuple:
    if campos_obrigatorios is None:
        campos_obrigatorios = ["id", "valor", "moeda"]
    erros = []
    campos_ok = 0
    for campo in campos_obrigatorios:
        if campo not in payload:
            erros.append(f"Campo ausente: {campo}")
        else:
            campos_ok += 1
    if "valor" in payload and payload["valor"] <= 0:
        erros.append("Valor deve ser positivo")
    return len(erros) == 0, erros, campos_ok
```
