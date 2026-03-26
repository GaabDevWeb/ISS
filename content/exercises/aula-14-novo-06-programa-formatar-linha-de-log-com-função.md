---
title: Programa — formatar linha de log com função
slug: aula-14-novo-06-programa-formatar-linha-de-log-com-função
difficulty: hard
concepts:
- def e chamada de função
- parâmetros formais vs argumentos
- argumentos posicionais e nomeados
- return explícito e None implícito
- docstrings, __doc__ e help()
- builtins print, input, int, float, type, len
discipline: python
learning_goal: 'Praticar: def e chamada de função, parâmetros formais vs argumentos,
  argumentos posicionais e nomeados'
exercise_type: full_program
stage: 5
context: análise de logs
test_cases:
- input: 'info

    auth

    falhou

    '
  output: '[INFO] auth | falhou'
---

## Enunciado

Implemente `formatar(nivel, modulo, msg)` que retorna `[{nivel}] {modulo} | {msg}`. Leia 3 linhas (nivel, modulo, msg) e imprima o retorno.

## Solução

```python
def formatar(nivel, modulo, msg):
    return f"[{nivel}] {modulo} | {msg}"

nivel = input().strip().upper()
modulo = input().strip()
msg = input().rstrip("\n")
print(formatar(nivel, modulo, msg))
```
