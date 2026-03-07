---
title: "Escape e separador com multiplicação"
slug: "escape-separador"
difficulty: "easy"
concepts: "escape \\n e \\t, multiplicação de strings"
discipline: "python"
---

## Enunciado

Crie um programa que exiba duas linhas de texto usando o caractere de escape `\n` (quebra de linha): na primeira linha escreva "Nome:" seguido de tabulação `\t` e depois "João"; na segunda "Idade:" seguido de tabulação e "25".

Em seguida, exiba uma linha separadora formada por 30 hífens usando multiplicação de string (ex.: `30 * '-'`).

## Solução

```python
print("Nome:\tJoão")
print("Idade:\t25")
print(30 * '-')
```
