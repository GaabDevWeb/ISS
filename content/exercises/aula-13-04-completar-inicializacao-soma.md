---
title: "Completar — inicialização do acumulador"
slug: "aula-13-04-completar-inicializacao-soma"
difficulty: "easy"
concepts: ["acumulador", "inicialização"]
discipline: "python"
learning_goal: "Completar o código inicializando o acumulador antes do loop."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
test_cases:
  - input: "10\n20\n30"
    output: "Soma: 60"
---

## Enunciado

Complete o código para que ele some três números lidos do usuário e imprima "Soma: X". Falta a linha que inicializa o acumulador (use 0 para soma).

```python
# Complete: inicialize o acumulador antes do for
for i in range(3):
    n = int(input())
    soma += n
print(f'Soma: {soma}')
```

## Solução

```python
soma = 0
for i in range(3):
    n = int(input())
    soma += n
print(f'Soma: {soma}')
```
