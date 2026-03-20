---
title: "Implementar — prefixo numerado em linhas de log"
slug: "aula-13-34-implementar-enumerate-prefixo-log"
difficulty: "medium"
concepts: ["enumerate e range(len)", "formatação f-string e .format() na tabuada"]
discipline: "python"
learning_goal: "Usar enumerate para numerar linhas com f-string e juntar em uma string."
exercise_type: "implement_function"
stage: 9
context: "análise de logs"
test_cases:
  - input: ""
    output: "[0] start\n[1] end"
---

## Enunciado

Implemente `formatar_linhas_numeradas(linhas)` que retorna uma string multilinha: cada linha `[i] texto` (índice 0-based). O programa abaixo só imprime o retorno.

```python
def formatar_linhas_numeradas(linhas):
    pass

print(formatar_linhas_numeradas(['start', 'end']))
```

## Solução

```python
def formatar_linhas_numeradas(linhas):
    partes = []
    for i, linha in enumerate(linhas):
        partes.append(f'[{i}] {linha}')
    return '\n'.join(partes)

print(formatar_linhas_numeradas(['start', 'end']))
```
