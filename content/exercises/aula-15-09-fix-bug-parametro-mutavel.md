---
title: "Corrigir bug — parâmetro padrão mutável"
slug: "aula-15-09-fix-bug-parametro-mutavel"
difficulty: "medium"
concepts: ["parâmetros com valor padrão", "return"]
discipline: "python"
learning_goal: "Identificar e corrigir o bug do parâmetro padrão mutável em Python."
exercise_type: "fix_bug"
stage: 3
context: "análise de logs"
test_cases:
  - input: ""
    output: "['timeout']\n['conexão recusada']\n['não autorizado']"
---

## Enunciado

O código abaixo acumula entradas entre chamadas por causa de parâmetro padrão mutável. **Corrija-o**:

```python
def registrar_erro(mensagem, historico=[]):
    historico.append(mensagem)
    return historico

print(registrar_erro("timeout"))
print(registrar_erro("conexão recusada"))
print(registrar_erro("não autorizado"))
```

## Solução

```python
def registrar_erro(mensagem, historico=None):
    if historico is None:
        historico = []
    historico.append(mensagem)
    return historico

print(registrar_erro("timeout"))
print(registrar_erro("conexão recusada"))
print(registrar_erro("não autorizado"))
```
