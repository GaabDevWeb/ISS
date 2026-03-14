---
title: "Aptidão para atividade física (idade e IMC)"
slug: "contexto-37-aptidao-fisica-idade-imc"
difficulty: "medium"
concepts: ["if/elif/else", "faixas", "and/or"]
discipline: "python"
learning_goal: "Liberar ou recomendar avaliação com base em idade e IMC."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "35\n22.0"
    output: "Liberado para atividade"
  - input: "70\n28.0"
    output: "Recomendada avaliacao medica"
---

## Enunciado

A academia libera para atividade se idade < 60 e IMC entre 18.5 e 24.9; recomenda avaliação médica se idade >= 60 ou IMC fora dessa faixa. O programa recebe idade (int) e IMC (float) e exibe "Liberado para atividade" ou "Recomendada avaliacao medica".

**Tarefa**  
Implemente as duas condições e exiba uma linha.

**Entrada**  
Duas linhas: idade e IMC.

**Saída**  
Uma das duas mensagens.

## Solução

```python
idade = int(input())
imc = float(input())
if idade < 60 and 18.5 <= imc <= 24.9:
    print("Liberado para atividade")
else:
    print("Recomendada avaliacao medica")
```
