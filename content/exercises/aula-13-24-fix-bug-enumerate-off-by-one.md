---
title: "Corrigir — índice 1-based com enumerate"
slug: "aula-13-24-fix-bug-enumerate-off-by-one"
difficulty: "easy"
concepts: ["enumerate", "índice"]
discipline: "python"
learning_goal: "Corrigir exibição de posição 1-based usando i+1 no enumerate."
exercise_type: "fix_bug"
stage: 11
context: "processamento de texto"
expected_output: "Posicao 1: a\nPosicao 2: b\nPosicao 3: c"
---

## Enunciado

O código deveria exibir "Posicao 1: a", "Posicao 2: b", "Posicao 3: c". O bug é que está usando o índice 0-based. Corrija para exibir posição começando em 1.

```python
letras = ['a', 'b', 'c']
for i, letra in enumerate(letras):
    print(f'Posicao {i}: {letra}')
```

## Solução

```python
letras = ['a', 'b', 'c']
for i, letra in enumerate(letras):
    print(f'Posicao {i + 1}: {letra}')
```
