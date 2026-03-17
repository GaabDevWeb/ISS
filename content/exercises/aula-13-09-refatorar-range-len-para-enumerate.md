---
title: "Refatorar — range(len) para enumerate"
slug: "aula-13-09-refatorar-range-len-para-enumerate"
difficulty: "easy"
concepts: ["enumerate", "range(len)"]
discipline: "python"
learning_goal: "Reescrever loop com range(len(lista)) usando enumerate()."
exercise_type: "refactor"
stage: 3
context: "processamento de texto"
expected_output: "0: maca\n1: uva\n2: laranja"
---

## Enunciado

Refatore o código abaixo para usar `enumerate()` em vez de `range(len(nomes))` e acesso por índice. A saída deve permanecer no formato "índice: nome".

```python
nomes = ['maca', 'uva', 'laranja']
for i in range(len(nomes)):
    print(f'{i}: {nomes[i]}')
```

## Solução

```python
nomes = ['maca', 'uva', 'laranja']
for i, nome in enumerate(nomes):
    print(f'{i}: {nome}')
```
