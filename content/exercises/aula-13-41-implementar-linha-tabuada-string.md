---
title: "Implementar — uma linha da tabuada como string"
slug: "aula-13-41-implementar-linha-tabuada-string"
difficulty: "medium"
concepts: ["tabuada com range(11)", "concatenação por linha"]
discipline: "python"
learning_goal: "Montar produtos separados por espaço com join."
exercise_type: "implement_function"
stage: 7
context: "processamento de texto"
test_cases:
  - input: ""
    output: "5 10 15 20"
---

## Enunciado

`linha_tabuada(multiplicador, inicio, fim)` retorna produtos `multiplicador*i` para i de inicio a fim inclusive, separados por espaço.

```python
def linha_tabuada(multiplicador, inicio, fim):
    pass

print(linha_tabuada(5, 1, 4))
```

## Solução

```python
def linha_tabuada(multiplicador, inicio, fim):
    partes = []
    for i in range(inicio, fim + 1):
        partes.append(str(multiplicador * i))
    return ' '.join(partes)

print(linha_tabuada(5, 1, 4))
```
