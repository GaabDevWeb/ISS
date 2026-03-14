---
title: "Corrigir operador lógico (and vs or)"
slug: "aula-10-03-corrigir-operador-logico"
difficulty: "easy"
concepts: ["operadores lógicos and, or"]
discipline: "python"
learning_goal: "Corrigir uso de or quando se exige que duas condições sejam verdadeiras."
exercise_type: "fix_bug"
stage: 3
context: "validação de entrada"
expected_output: "Válido"
---

## Enunciado

O código deveria exibir "Válido" apenas quando idade >= 18 e tem_cartao é True. Corrija o operador: use and em vez de or.

```python
idade = 20
tem_cartao = True
if idade >= 18 or tem_cartao:
    print("Válido")
else:
    print("Inválido")
```

Com or, mesmo com idade < 18 daria "Válido" se tem_cartao for True. O enunciado pede que ambos sejam verdadeiros.

## Solução

```python
idade = 20
tem_cartao = True
if idade >= 18 and tem_cartao:
    print("Válido")
else:
    print("Inválido")
```
