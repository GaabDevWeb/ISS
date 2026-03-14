---
title: "Tipo de contratação (CLT ou estágio por experiência)"
slug: "contexto-38-contratacao-clt-estagio-experiencia"
difficulty: "easy"
concepts: ["if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Definir tipo de contrato por anos de experiência."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "2"
    output: "Estagio"
  - input: "5"
    output: "CLT"
---

## Enunciado

A empresa contrata por CLT quem tem 3 ou mais anos de experiência; caso contrário, oferece Estagio. O programa recebe os anos de experiência (int) e exibe "CLT" ou "Estagio".

**Tarefa**  
Exiba uma única linha conforme a regra.

**Entrada**  
Uma linha com anos de experiência (inteiro não negativo).

**Saída**  
`CLT` ou `Estagio`

## Solução

```python
exp = int(input())
if exp >= 3:
    print("CLT")
else:
    print("Estagio")
```
