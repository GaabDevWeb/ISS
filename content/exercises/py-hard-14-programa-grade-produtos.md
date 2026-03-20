---
title: "HARD — Grade N×M alinhada"
slug: "py-hard-14-programa-grade-produtos"
difficulty: "hard"
concepts: ["loops aninhados (linha e coluna)", "formatação f-string e .format() na tabuada"]
discipline: "python"
learning_goal: "Cabeçalho + células com largura fixa."
exercise_type: "full_program"
stage: 20
context: "monitoramento"
test_cases:
  - input: "2\n3"
    output: "   1  2  3\n1  1  2  3\n2  2  4  6"
---

## Enunciado

Leia N e M (inteiros >0). Primeira linha: espaço inicial + colunas 1..M com largura 3. Linhas i=1..N: i + produtos i*j (j=1..M) largura 3 cada.

## Solução

```python
n = int(input())
m = int(input())
linha = ' '
for j in range(1, m + 1):
    linha += f'{j:>3}'
print(linha)
for i in range(1, n + 1):
    linha = f'{i}'
    for j in range(1, m + 1):
        linha += f'{i * j:>3}'
    print(linha)
```
