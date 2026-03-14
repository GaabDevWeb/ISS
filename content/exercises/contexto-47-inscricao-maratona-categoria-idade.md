---
title: "Categoria na maratona por idade"
slug: "contexto-47-inscricao-maratona-categoria-idade"
difficulty: "easy"
concepts: ["if/elif/else"]
discipline: "python"
learning_goal: "Classificar corredor em categoria etária."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "25"
    output: "Adulto"
  - input: "70"
    output: "Senior"
---

## Enunciado

A maratona define categorias: até 17 "Juvenil", 18–39 "Adulto", 40–59 "Master", 60 ou mais "Senior". O programa recebe a idade (int) e exibe a categoria.

**Tarefa**  
Exiba exatamente uma das quatro palavras.

**Entrada**  
Uma linha com a idade.

**Saída**  
Juvenil, Adulto, Master ou Senior.

## Solução

```python
idade = int(input())
if idade <= 17: print("Juvenil")
elif idade <= 39: print("Adulto")
elif idade <= 59: print("Master")
else: print("Senior")
```
