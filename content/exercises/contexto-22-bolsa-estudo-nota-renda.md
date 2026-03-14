---
title: "Elegibilidade para bolsa de estudo (nota e renda)"
slug: "contexto-22-bolsa-estudo-nota-renda"
difficulty: "medium"
concepts: ["if/else", "and", "operadores relacionais"]
discipline: "python"
learning_goal: "Aprovar bolsa se nota >= 7 e renda per capita <= 1500."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "8.0\n1200"
    output: "Bolsa concedida"
  - input: "8.0\n2000"
    output: "Bolsa nao concedida"
---

## Enunciado

A instituição concede bolsa se a nota do aluno for >= 7 e a renda per capita (float) for <= 1500. O programa recebe nota e renda e exibe "Bolsa concedida" ou "Bolsa nao concedida".

**Tarefa**  
Implemente a verificação com as duas condições.

**Entrada**  
Duas linhas: nota (float) e renda per capita (float).

**Saída**  
`Bolsa concedida` ou `Bolsa nao concedida`

## Solução

```python
nota = float(input())
renda = float(input())
if nota >= 7 and renda <= 1500:
    print("Bolsa concedida")
else:
    print("Bolsa nao concedida")
```
