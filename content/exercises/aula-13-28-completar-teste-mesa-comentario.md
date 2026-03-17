---
title: "Completar — comentário com mini teste de mesa"
slug: "aula-13-28-completar-teste-mesa-comentario"
difficulty: "medium"
concepts: ["teste de mesa", "acumulador"]
discipline: "python"
learning_goal: "Completar comentário descrevendo teste de mesa para 3 valores."
exercise_type: "complete_the_code"
stage: 12
context: "validação de dados"
expected_output: "Soma: 60"
---

## Enunciado

Complete o comentário com um mini teste de mesa para as entradas 10, 20, 30: indique os valores de `soma` após cada iteração (1ª: 10, 2ª: 30, 3ª: 60). Depois execute mentalmente e confira que a saída é "Soma: 60".

```python
soma = 0
# Teste de mesa (entradas 10,20,30): iter1 soma=___, iter2 soma=___, iter3 soma=___
for i in range(3):
    soma += int(input())
print(f'Soma: {soma}')
```

## Solução

```python
soma = 0
# Teste de mesa (entradas 10,20,30): iter1 soma=10, iter2 soma=30, iter3 soma=60
for i in range(3):
    soma += int(input())
print(f'Soma: {soma}')
```
