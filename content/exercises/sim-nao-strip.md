---
title: "Resposta Sim ou Não com strip e lower"
slug: "sim-nao-strip"
difficulty: "medium"
concepts: "input(), strip(), lower(), comparação de strings"
discipline: "python"
---

## Enunciado

Crie um programa que pergunte ao usuário "Deseja continuar? (sim/não): " e leia a resposta. Padronize a resposta removendo espaços das pontas com `strip()` e convertendo para minúsculas com `lower()`. Se a resposta for "sim", exiba "Continuando..."; caso contrário, exiba "Encerrando."

Assim o programa aceita "Sim", "SIM", " sim " ou "sim" como afirmação.

## Solução

```python
resposta = input("Deseja continuar? (sim/não): ").strip().lower()
if resposta == "sim":
    print("Continuando...")
else:
    print("Encerrando.")
```
