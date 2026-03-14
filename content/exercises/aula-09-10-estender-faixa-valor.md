---
title: "Estender — adicionar faixa de valor (elif)"
slug: "aula-09-10-estender-faixa-valor"
difficulty: "medium"
concepts: ["if/elif/else", "regras de negócio"]
discipline: "python"
learning_goal: "Estender condicional com nova faixa (ex.: valor entre 0 e 100)."
exercise_type: "extend_code"
stage: 8
context: "validação de dados"
test_cases:
  - input: "50"
    output: "Válido"
  - input: "150"
    output: "Alto"
---

## Enunciado

O código abaixo exibe "Alto" se valor > 100. Estenda para: se valor estiver entre 0 e 100 (inclusive), exiba "Válido"; se valor > 100, "Alto"; senão "Inválido". Leia valor como int.

```python
valor = int(input())
if valor > 100:
    print("Alto")
# adicione elif e else
```

## Solução

```python
valor = int(input())
if 0 <= valor <= 100:
    print("Válido")
elif valor > 100:
    print("Alto")
else:
    print("Inválido")
```
