---
title: "Programa — contar linhas por nível em log"
slug: "aula-13-26-programa-parser-log-nivel"
difficulty: "hard"
concepts: ["enumerate", "acumulador", "condicional", "split"]
discipline: "python"
learning_goal: "Ler N linhas de log no formato 'NIVEL mensagem', contar quantas são INFO e quantas ERROR."
exercise_type: "full_program"
stage: 16
context: "análise de logs"
test_cases:
  - input: "4\nINFO start\nERROR timeout\nINFO retry\nERROR fail"
    output: "INFO: 2\nERROR: 2"
---

## Enunciado

Escreva um programa que lê um inteiro N e N linhas no formato "NIVEL mensagem" (NIVEL é INFO ou ERROR). Conte quantas linhas são INFO e quantas são ERROR e exiba "INFO: X" e "ERROR: Y". Use dois acumuladores (ou um loop com if/elif) e split para pegar a primeira palavra.

## Solução

```python
n = int(input())
info = 0
error = 0
for i in range(n):
    linha = input()
    nivel = linha.split()[0]
    if nivel == 'INFO':
        info += 1
    elif nivel == 'ERROR':
        error += 1
print(f'INFO: {info}')
print(f'ERROR: {error}')
```
