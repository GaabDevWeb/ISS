---
title: Programa — formatar log simples
slug: aula-06-novo-06-programa-formatar-log-simples
difficulty: hard
concepts:
- caracteres de escape em strings
- quebra de linha com \n
- tabulação com \t
- raw strings
- concatenação de strings
- repetição de strings
discipline: python
learning_goal: 'Praticar: caracteres de escape em strings, quebra de linha com \n,
  tabulação com \t'
exercise_type: full_program
stage: 5
context: análise de logs
test_cases:
- input: 'INFO

    subiu

    '
  output: "[INFO]\tsubiu"
---

## Enunciado

Leia `nivel` e `msg` (duas linhas). Imprima um log no formato `[{nivel}]\t{msg}`.

## Solução

```python
nivel = input().strip()
msg = input().rstrip("\n")
print(f"[{nivel}]\t{msg}")
```
