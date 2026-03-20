---
title: "Corrigir — soma da matriz com acumulador no lugar errado"
slug: "aula-13-45-corrigir-acumulador-reinicializado"
difficulty: "medium"
concepts: ["acumulador (inicialização e +=)", "loops aninhados (linha e coluna)"]
discipline: "python"
learning_goal: "Não reinicializar acumulador dentro do laço externo quando a soma é global."
exercise_type: "fix_bug"
stage: 9
context: "análise de logs"
expected_output: "soma=10"
---

## Enunciado

A soma dos valores 1+2+3+4 deveria ser 10. Corrija.

```python
for linha in range(2):
    soma = 0
    for col in range(2):
        soma += linha * 2 + col + 1
print(f'soma={soma}')
```

## Solução

```python
soma = 0
for linha in range(2):
    for col in range(2):
        soma += linha * 2 + col + 1
print(f'soma={soma}')
```
