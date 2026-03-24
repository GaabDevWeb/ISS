---
title: "Completar — usar retorno de função diretamente em print e f-string"
slug: "aula-15-37-completar-retorno-em-print-fstring"
difficulty: "easy"
concepts: ["return", "composição de funções", "strings"]
discipline: "python"
learning_goal: "Usar o retorno de uma função diretamente dentro de f-string e chamada de print."
exercise_type: "complete_the_code"
stage: 2
context: "processamento de texto"
test_cases:
  - input: ""
    output: "A.S.\nOlá, Carlos Pereira! Suas iniciais: C.P."
---

## Enunciado

Complete as lacunas para usar os retornos das funções sem criar variáveis intermediárias:

```python
def nome_completo(primeiro: str, ultimo: str) -> str:
    return f"{primeiro.strip().title()} {ultimo.strip().title()}"

def iniciais(nome: str) -> str:
    partes = nome.split()
    return "".join(p[0].upper() + "." for p in partes)

print(___(   ___("  ana", "SILVA")   ))
print(f"Olá, {___('carlos', 'PEREIRA')}! Suas iniciais: {___(  ___('carlos', 'PEREIRA')  )}")
```

## Solução

```python
print(iniciais(nome_completo("  ana", "SILVA")))
print(f"Olá, {nome_completo('carlos', 'PEREIRA')}! Suas iniciais: {iniciais(nome_completo('carlos', 'PEREIRA'))}")
```
