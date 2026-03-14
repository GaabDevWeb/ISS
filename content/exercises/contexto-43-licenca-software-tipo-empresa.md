---
title: "Tipo de licença de software (tamanho da empresa)"
slug: "contexto-43-licenca-software-tipo-empresa"
difficulty: "easy"
concepts: ["if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Recomendar tipo de licença por número de funcionários."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "15"
    output: "Licenca Basica"
  - input: "150"
    output: "Licenca Corporativa"
---

## Enunciado

A empresa de software vende: até 20 funcionários → Licenca Basica; 21 a 100 → Licenca Profissional; mais de 100 → Licenca Corporativa. O programa recebe o número de funcionários (int) e exibe o tipo de licença recomendado.

**Tarefa**  
Exiba exatamente uma das três strings acima.

**Entrada**  
Uma linha com o número de funcionários.

**Saída**  
Uma das três mensagens.

## Solução

```python
n = int(input())
if n <= 20:
    print("Licenca Basica")
elif n <= 100:
    print("Licenca Profissional")
else:
    print("Licenca Corporativa")
```
