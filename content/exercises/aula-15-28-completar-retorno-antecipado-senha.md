---
title: "Completar — retorno antecipado em validador de senha"
slug: "aula-15-28-completar-retorno-antecipado-senha"
difficulty: "medium"
concepts: ["return", "if/elif/else", "parâmetros com valor padrão"]
discipline: "python"
learning_goal: "Completar função com múltiplos pontos de return para validação de senha."
exercise_type: "complete_the_code"
stage: 3
context: "validação de dados"
test_cases:
  - input: ""
    output: "False Senha deve ter ao menos 8 caracteres\nTrue Senha válida"
---

## Enunciado

Complete os `return` para implementar validação de senha com retornos antecipados:

```python
def validar_senha(senha: str, min_tamanho: int = 8) -> tuple:
    if len(senha) < min_tamanho:
        ___ (False, f"Senha deve ter ao menos {min_tamanho} caracteres")
    if not any(c.isdigit() for c in senha):
        ___ (False, "Senha deve conter ao menos um número")
    if not any(c.isupper() for c in senha):
        ___ (False, "Senha deve conter ao menos uma letra maiúscula")
    ___ (True, "Senha válida")

ok, msg = validar_senha("abc123")
print(ok, msg)
ok, msg = validar_senha("Abcdef1!")
print(ok, msg)
```

## Solução

```python
def validar_senha(senha: str, min_tamanho: int = 8) -> tuple:
    if len(senha) < min_tamanho:
        return (False, f"Senha deve ter ao menos {min_tamanho} caracteres")
    if not any(c.isdigit() for c in senha):
        return (False, "Senha deve conter ao menos um número")
    if not any(c.isupper() for c in senha):
        return (False, "Senha deve conter ao menos uma letra maiúscula")
    return (True, "Senha válida")
```
