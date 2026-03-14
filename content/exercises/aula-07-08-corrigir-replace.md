---
title: "Corrigir replace para normalizar separador"
slug: "aula-07-08-corrigir-replace"
difficulty: "easy"
concepts: ["métodos de string (replace)"]
discipline: "python"
learning_goal: "Usar replace() para trocar separador em dados."
exercise_type: "fix_bug"
stage: 4
context: "parsing de CSV/arquivos"
expected_output: "a,b,c"
---

## Enunciado

O código deveria exibir "a,b,c" (substituir ponto e vírgula por vírgula). Corrija a chamada replace: a ordem dos argumentos é (antigo, novo).

```python
s = "a;b;c"
print(s.replace(",", ";"))  # bug: trocou ao contrário
```

## Solução

```python
s = "a;b;c"
print(s.replace(";", ","))
```
