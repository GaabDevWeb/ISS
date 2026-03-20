---
title: "HARD — Remover comentário à direita (#)"
slug: "py-hard-32-implementar-linha-sem-comentario"
difficulty: "hard"
concepts: ["slicing [inicio:fim:passo]", "métodos de string"]
discipline: "python"
learning_goal: "Cortar antes do primeiro `#` fora de string complexa (assume # não aparece dentro de texto)."
exercise_type: "implement_function"
stage: 20
context: "arquivos de configuração"
test_cases:
  - input: ""
    output: "host=1"
---

## Enunciado

`sem_comentario(linha)` retorna parte antes de `#` (se não houver, retorna linha inteira), sem espaços nas pontas.

```python
def sem_comentario(linha):
    pass

print(sem_comentario('  host=1  # dev  '))
```

## Solução

```python
def sem_comentario(linha):
    if '#' in linha:
        linha = linha[: linha.index('#')]
    return linha.strip()

print(sem_comentario('  host=1  # dev  '))
```
