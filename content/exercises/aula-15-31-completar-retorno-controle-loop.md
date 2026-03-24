---
title: "Completar — usar retorno de função como controle de loop"
slug: "aula-15-31-completar-retorno-controle-loop"
difficulty: "medium"
concepts: ["return", "composição de funções", "loops for", "if/elif/else"]
discipline: "python"
learning_goal: "Usar o retorno booleano de uma função diretamente como condição em estrutura de controle."
exercise_type: "complete_the_code"
stage: 3
context: "validação de dados"
test_cases:
  - input: ""
    output: "IDs válidos: [1, 4]"
---

## Enunciado

Complete as lacunas para filtrar apenas os registros válidos usando o retorno da função:

```python
def registro_valido(r: dict) -> bool:
    return r.get("ativo") is True and isinstance(r.get("score"), (int, float))

registros = [
    {"id": 1, "ativo": True, "score": 87.5},
    {"id": 2, "ativo": False, "score": 92.0},
    {"id": 3, "ativo": True, "score": None},
    {"id": 4, "ativo": True, "score": 65},
]

validos = []
for r in registros:
    if ___(___):
        validos.append(r["id"])

print(f"IDs válidos: {validos}")
```

## Solução

```python
for r in registros:
    if registro_valido(r):
        validos.append(r["id"])
```
