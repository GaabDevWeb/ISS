---
title: "Corrigir bug — ValueError em desestruturação de múltiplos retornos"
slug: "aula-15-19-fix-bug-unpacking-valueerror"
difficulty: "medium"
concepts: ["múltiplos retornos", "tuple unpacking"]
discipline: "python"
learning_goal: "Corrigir ValueError causado por contagem incorreta de variáveis em tuple unpacking."
exercise_type: "fix_bug"
stage: 4
context: "dados de monitoramento"
test_cases:
  - input: ""
    output: "srv-01: CPU 95.2% | Alerta: True"
---

## Enunciado

O código abaixo levanta `ValueError: too many values to unpack`. **Corrija** adicionando a variável faltante:

```python
def status_servidor(nome: str, cpu: float, memoria: float):
    alerta = cpu > 90 or memoria > 85
    return nome, cpu, memoria, alerta

nome, cpu, alerta = status_servidor("srv-01", 95.2, 72.1)
print(f"{nome}: CPU {cpu}% | Alerta: {alerta}")
```

## Solução

```python
def status_servidor(nome: str, cpu: float, memoria: float):
    alerta = cpu > 90 or memoria > 85
    return nome, cpu, memoria, alerta

nome, cpu, memoria, alerta = status_servidor("srv-01", 95.2, 72.1)
print(f"{nome}: CPU {cpu}% | Alerta: {alerta}")
```
