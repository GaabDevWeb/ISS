---
title: "Ler N linhas de log e exibir nível e mensagem"
slug: "aula-11-hard-06-log-n-linhas-nivel-msg"
difficulty: "hard"
concepts: ["for", "range()", "split", "iteração"]
discipline: "python"
learning_goal: "Processar N linhas no formato NIVEL:mensagem e exibir par formatado."
exercise_type: "full_program"
stage: 17
context: "logs"
test_cases:
  - input: "2\nINFO:conexão aberta\nERRO:timeout"
    output: "INFO -> conexão aberta\nERRO -> timeout"
---

## Enunciado

Escreva um programa que leia N (int) e depois N linhas no formato "NIVEL:mensagem" (uma única ocorrência de ":"). Para cada linha, separe com split(":", 1) e exiba "NIVEL -> mensagem". Use for _ in range(N):.

## Solução

```python
n = int(input())
for _ in range(n):
    linha = input()
    partes = linha.split(":", 1)
    nivel = partes[0]
    msg = partes[1]
    print(f"{nivel} -> {msg}")
```
