---
title: "Implementar — formatar_linha_log"
slug: "aula-14-11-implementar-formatar-linha-log"
difficulty: "medium"
concepts: ["parâmetros formais vs argumentos", "return explícito e None implícito", "PEP 8 snake_case e funções coesas"]
discipline: "python"
learning_goal: "Função coesa que monta linha de log padronizada."
exercise_type: "implement_function"
stage: 6
context: "análise de logs"
test_cases:
  - input: ""
    output: "[ERRO] | auth | falha"
---

## Enunciado

```python
def formatar_linha_log(nivel, modulo, mensagem):
    pass

print(formatar_linha_log('ERRO', 'auth', 'falha'))
```

## Solução

```python
def formatar_linha_log(nivel, modulo, mensagem):
    return f'[{nivel}] | {modulo} | {mensagem}'

print(formatar_linha_log('ERRO', 'auth', 'falha'))
```
