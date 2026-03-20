---
title: "Programa — somar dois inteiros de uma linha"
slug: "aula-14-25-programa-soma-linha-csv"
difficulty: "medium"
concepts: ["def e chamada de função", "builtins int"]
discipline: "python"
learning_goal: "Ler linha, converter e delegar soma a função."
exercise_type: "full_program"
stage: 11
context: "parsing de CSV/arquivos"
test_cases:
  - input: "8 13"
    output: "21"
---

## Enunciado

Implemente `somar(a,b)` que retorna a+b. Leia uma linha com dois inteiros separados por espaço (use split), converta e imprima somar(x,y).

## Solução

```python
def somar(a, b):
    return a + b

p, q = input().split()
print(somar(int(p), int(q)))
```
