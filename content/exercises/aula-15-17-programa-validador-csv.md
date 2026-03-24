---
title: "Programa — validador de linha CSV com múltiplos retornos"
slug: "aula-15-17-programa-validador-csv"
difficulty: "medium"
concepts: ["múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "strings"]
discipline: "python"
learning_goal: "Escrever programa completo que usa múltiplos retornos para validar campos de uma linha CSV."
exercise_type: "full_program"
stage: 4
context: "parsing de CSV/arquivos"
test_cases:
  - input: ""
    output: "True ['Ana', '28', 'ana@email.com'] \nTrue ['Bruno', '45', 'bruno@email.com'] \nFalse ['Carlos', 'abc', 'carlos@email.com'] Idade não é numérica"
---

## Enunciado

Implemente `validar_linha_csv(linha, separador=",")` que retorna `(valido, campos, erro)`:

```python
def validar_linha_csv(linha: str, separador: str = ",") -> tuple:
    pass

ok, campos, erro = validar_linha_csv("Ana,28,ana@email.com")
print(ok, campos, erro)

ok, campos, erro = validar_linha_csv("Bruno;45;bruno@email.com", separador=";")
print(ok, campos, erro)

ok, campos, erro = validar_linha_csv("Carlos,abc,carlos@email.com")
print(ok, campos, erro)
```

## Solução

```python
def validar_linha_csv(linha: str, separador: str = ",") -> tuple:
    campos = linha.split(separador)
    if len(campos) != 3:
        return False, campos, "Número de campos inválido"
    if not campos[1].isdigit():
        return False, campos, "Idade não é numérica"
    return True, campos, ""
```
