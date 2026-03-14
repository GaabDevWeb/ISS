---
title: "Corrigir uso de divisão inteira e resto"
slug: "aula-04-03-corrigir-divisao-inteira"
difficulty: "easy"
concepts: ["operadores aritméticos", "divisão inteira", "módulo"]
discipline: "python"
learning_goal: "Corrigir operador para obter divisão inteira (//) e resto (%) quando necessário."
exercise_type: "fix_bug"
stage: 3
context: "validação de dados"
expected_output: |
  2
  1
---

## Enunciado

O código deveria exibir o quociente inteiro e o resto da divisão de 7 por 3 (2 e 1). Corrija os operadores: use `//` para quociente inteiro e `%` para resto.

```python
a = 7
b = 3
quociente = a / b   # bug: deve ser divisão inteira
resto = a / b       # bug: deve ser módulo
print(int(quociente))
print(int(resto))
```

## Solução

```python
a = 7
b = 3
quociente = a // b
resto = a % b
print(quociente)
print(resto)
```
