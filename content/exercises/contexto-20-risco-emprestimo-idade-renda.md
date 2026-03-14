---
title: "Classificação de risco de empréstimo (idade e renda)"
slug: "contexto-20-risco-emprestimo-idade-renda"
difficulty: "medium"
concepts: ["if/elif/else", "and/or"]
discipline: "python"
learning_goal: "Classificar risco com base em faixas de idade e renda."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "35\n8000"
    output: "Risco baixo"
  - input: "22\n3000"
    output: "Risco alto"
---

## Enunciado

Um banco classifica risco: "Risco baixo" se idade entre 25 e 55 e renda >= 5000; "Risco medio" se idade nessa faixa OU renda >= 5000; "Risco alto" caso contrário. Entrada: idade (int) e renda (float). Saída: uma das três strings.

**Tarefa**  
Implemente as três classificações na ordem de prioridade (baixo > medio > alto).

**Entrada**  
Duas linhas: idade e renda.

**Saída**  
`Risco baixo`, `Risco medio` ou `Risco alto`

## Solução

```python
idade = int(input())
renda = float(input())
if 25 <= idade <= 55 and renda >= 5000:
    print("Risco baixo")
elif (25 <= idade <= 55) or renda >= 5000:
    print("Risco medio")
else:
    print("Risco alto")
```
