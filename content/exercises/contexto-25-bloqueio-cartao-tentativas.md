---
title: "Bloqueio de cartão por tentativas de senha"
slug: "contexto-25-bloqueio-cartao-tentativas"
difficulty: "easy"
concepts: ["if/elif/else", "operadores relacionais"]
discipline: "python"
learning_goal: "Exibir mensagem conforme número de tentativas falhas."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "2"
    output: "Cartao liberado. Tentativas restantes: 1"
  - input: "3"
    output: "Cartao bloqueado. Contate o banco."
---

## Enunciado

O sistema registra quantas vezes o cliente errou a senha (0 a 3). Se 0, exibir "Nenhuma tentativa falha."; se 1 ou 2, "Cartao liberado. Tentativas restantes: X" (X = 3 - tentativas); se 3, "Cartao bloqueado. Contate o banco." O programa recebe o número de tentativas falhas (int).

**Tarefa**  
Exiba a mensagem conforme a quantidade de tentativas.

**Entrada**  
Uma linha com inteiro 0, 1, 2 ou 3.

**Saída**  
Uma das mensagens acima.

## Solução

```python
t = int(input())
if t == 0:
    print("Nenhuma tentativa falha.")
elif t <= 2:
    print(f"Cartao liberado. Tentativas restantes: {3 - t}")
else:
    print("Cartao bloqueado. Contate o banco.")
```
