---
title: "Alerta de estoque mínimo (depósito)"
slug: "contexto-29-alerta-estoque-minimo"
difficulty: "easy"
concepts: ["if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Exibir nível de alerta conforme quantidade em estoque."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "5"
    output: "CRITICO - Repor urgente"
  - input: "15"
    output: "Atencao - Abaixo do ideal"
  - input: "50"
    output: "Normal"
---

## Enunciado

O depósito considera: estoque < 10 "CRITICO - Repor urgente"; estoque < 30 "Atencao - Abaixo do ideal"; caso contrário "Normal". O programa recebe a quantidade em estoque (int) e exibe a mensagem.

**Tarefa**  
Classifique e exiba uma única linha.

**Entrada**  
Uma linha com a quantidade (inteiro não negativo).

**Saída**  
Uma das três mensagens.

## Solução

```python
qtd = int(input())
if qtd < 10:
    print("CRITICO - Repor urgente")
elif qtd < 30:
    print("Atencao - Abaixo do ideal")
else:
    print("Normal")
```
