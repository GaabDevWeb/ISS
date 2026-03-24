---
title: "Corrigir bug — SyntaxError por parâmetro obrigatório após padrão"
slug: "aula-15-13-fix-bug-ordem-parametros"
difficulty: "medium"
concepts: ["parâmetros com valor padrão", "parâmetros posicionais"]
discipline: "python"
learning_goal: "Corrigir SyntaxError causado por parâmetro obrigatório após parâmetro com padrão."
exercise_type: "fix_bug"
stage: 3
context: "arquivos de configuração"
test_cases:
  - input: ""
    output: "host (string): obrigatório\nporta (int): opcional"
---

## Enunciado

O código abaixo levanta `SyntaxError`. **Corrija a assinatura** mantendo o comportamento:

```python
def ler_config(tipo="string", chave, obrigatorio):
    return f"{chave} ({tipo}): {'obrigatório' if obrigatorio else 'opcional'}"

print(ler_config("host", True))
print(ler_config("porta", False, tipo="int"))
```

## Solução

```python
def ler_config(chave, obrigatorio, tipo="string"):
    return f"{chave} ({tipo}): {'obrigatório' if obrigatorio else 'opcional'}"

print(ler_config("host", True))
print(ler_config("porta", False, tipo="int"))
```
