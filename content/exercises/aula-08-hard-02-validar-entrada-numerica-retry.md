---
title: "Validação de entrada numérica com mensagem de erro formatada"
slug: "aula-08-hard-02-validar-entrada-numerica-retry"
difficulty: "hard"
concepts: ["input()", "conversão de tipos", "TypeError e ValueError", "f-strings"]
discipline: "python"
learning_goal: "Ler valor numérico com try/except e exibir erro formatado com o valor lido."
exercise_type: "full_program"
stage: 17
context: "validação de entrada"
test_cases:
  - input: "3.14"
    output: "OK: 3.14"
  - input: "abc"
    output: "Erro: 'abc' não é um número válido."
---

## Enunciado

Escreva um programa que leia uma linha. Se for um float válido, exiba "OK: " seguido do valor com 2 decimais. Se der ValueError, exiba "Erro: 'VALOR_LIDO' não é um número válido." (use f-string para incluir a string lida entre aspas). Leia apenas uma vez.

## Solução

```python
linha = input()
try:
    valor = float(linha)
    print(f"OK: {valor:.2f}")
except ValueError:
    print(f"Erro: '{linha}' não é um número válido.")
```
