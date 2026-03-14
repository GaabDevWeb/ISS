---
title: "Programa — decompor tarefa em passos"
slug: "aula-02-07-programa-decompor-tarefas"
difficulty: "medium"
concepts: ["decompor problemas em algoritmos", "pensamento computacional"]
discipline: "python"
learning_goal: "Ler descrição de três passos e exibi-los numerados como algoritmo."
exercise_type: "full_program"
stage: 11
context: "automação"
test_cases:
  - input: "Conectar API\nEnviar dados\nVerificar resposta"
    output: "1. Conectar API\n2. Enviar dados\n3. Verificar resposta"
---

## Enunciado

Escreva um programa que leia três linhas (três passos de um processo) e exiba cada uma precedida de número: "1. PASSO1", "2. PASSO2", "3. PASSO3".

## Solução

```python
p1 = input()
p2 = input()
p3 = input()
print("1.", p1)
print("2.", p2)
print("3.", p3)
```
