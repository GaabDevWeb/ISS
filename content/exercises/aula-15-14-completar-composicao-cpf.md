---
title: "Completar — composição de funções de validação de CPF"
slug: "aula-15-14-completar-composicao-cpf"
difficulty: "medium"
concepts: ["composição de funções", "return", "strings"]
discipline: "python"
learning_goal: "Completar expressão de composição de funções sem armazenar valores intermediários."
exercise_type: "complete_the_code"
stage: 4
context: "validação de dados"
test_cases:
  - input: ""
    output: "True\nFalse\nFalse"
---

## Enunciado

Complete as lacunas para que o código valide CPF por tamanho e conteúdo usando composição:

```python
def tem_tamanho_correto(texto: str) -> bool:
    return ___(texto) == 11

def so_digitos(texto: str) -> bool:
    return texto.___()

def cpf_valido(cpf: str) -> bool:
    return ___(cpf) and ___(cpf)

print(cpf_valido("12345678901"))
print(cpf_valido("123456789"))
print(cpf_valido("1234567890a"))
```

## Solução

```python
def tem_tamanho_correto(texto: str) -> bool:
    return len(texto) == 11

def so_digitos(texto: str) -> bool:
    return texto.isdigit()

def cpf_valido(cpf: str) -> bool:
    return tem_tamanho_correto(cpf) and so_digitos(cpf)
```
