---
title: "Corrigir ordem dos offsets de revisão"
slug: "aula-01-08-corrigir-ordem-revisao"
difficulty: "easy"
concepts: ["curva do esquecimento", "revisões espaçadas"]
discipline: "python"
learning_goal: "Corrigir bug na exibição dos dias de revisão espaçada."
exercise_type: "fix_bug"
stage: 4
context: "configuração"
expected_output: |
  Revisão 1: 1 dias
  Revisão 2: 3 dias
  Revisão 3: 7 dias
---

## Enunciado

O código abaixo deveria imprimir os offsets típicos de revisão (1, 3 e 7 dias). Há um erro: a segunda linha usa a variável errada. Corrija.

```python
offset1 = 1
offset2 = 3
offset3 = 7
print("Revisão 1:", offset1, "dias")
print("Revisão 2:", offset1, "dias")  # bug aqui
print("Revisão 3:", offset3, "dias")
```

## Solução

```python
offset1 = 1
offset2 = 3
offset3 = 7
print("Revisão 1:", offset1, "dias")
print("Revisão 2:", offset2, "dias")
print("Revisão 3:", offset3, "dias")
```
