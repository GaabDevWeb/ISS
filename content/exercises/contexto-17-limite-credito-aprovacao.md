---
title: "Aprovação de limite de crédito (renda e score)"
slug: "contexto-17-limite-credito-aprovacao"
difficulty: "easy"
concepts: ["if/else", "and", "float", "int"]
discipline: "python"
learning_goal: "Aprovar ou negar com base em renda e score mínimos."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "5000\n700"
    output: "Aprovado"
  - input: "2000\n500"
    output: "Negado"
---

## Enunciado

Um banco aprova limite de crédito para quem tem renda mensal >= 3000 e score >= 600. O programa em Python (Deepnote) recebe renda (float) e score (int) e exibe "Aprovado" ou "Negado".

**Tarefa**  
Implemente a verificação e exiba uma única linha.

**Entrada**  
Duas linhas: renda (real) e score (inteiro).

**Saída**  
`Aprovado` ou `Negado`

## Solução

```python
renda = float(input())
score = int(input())
if renda >= 3000 and score >= 600:
    print("Aprovado")
else:
    print("Negado")
```
