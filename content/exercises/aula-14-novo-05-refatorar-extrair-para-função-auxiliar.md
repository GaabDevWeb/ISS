---
title: Refatorar — extrair para função auxiliar
slug: aula-14-novo-05-refatorar-extrair-para-função-auxiliar
difficulty: medium
concepts:
- def e chamada de função
- parâmetros formais vs argumentos
- argumentos posicionais e nomeados
- return explícito e None implícito
- docstrings, __doc__ e help()
- builtins print, input, int, float, type, len
discipline: python
learning_goal: 'Praticar: def e chamada de função, parâmetros formais vs argumentos,
  argumentos posicionais e nomeados'
exercise_type: refactor
stage: 4
context: parsing de CSV
test_cases:
- input: '3

    '
  output: '3.00'
---

## Enunciado

Refatore para usar uma função `parse_preco(txt)` que retorna float.

## Solução

```python
def parse_preco(txt):
    return float(txt)

txt = input().strip()
print(f"{parse_preco(txt):.2f}")
```
