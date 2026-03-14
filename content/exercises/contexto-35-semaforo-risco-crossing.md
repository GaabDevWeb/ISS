---
title: "Nível de risco no cruzamento (semaforo e velocidade)"
slug: "contexto-35-semaforo-risco-crossing"
difficulty: "medium"
concepts: ["if/elif/else", "and"]
discipline: "python"
learning_goal: "Classificar risco: semáforo (verde/amarelo/vermelho) e velocidade."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "vermelho\n60"
    output: "Risco alto"
  - input: "verde\n30"
    output: "Risco baixo"
---

## Enunciado

O sistema avalia risco no cruzamento: "Risco alto" se semáforo vermelho ou (amarelo e velocidade > 40); "Risco medio" se amarelo e velocidade <= 40; "Risco baixo" se verde. O programa recebe a cor do semáforo (verde, amarelo ou vermelho) e a velocidade em km/h (int). Exiba exatamente uma das três mensagens. Entradas em minúsculas.

**Tarefa**  
Implemente a lógica e exiba uma linha.

**Entrada**  
Duas linhas: cor do semáforo e velocidade.

**Saída**  
`Risco alto`, `Risco medio` ou `Risco baixo`

## Solução

```python
cor = input().strip().lower()
vel = int(input())
if cor == "vermelho" or (cor == "amarelo" and vel > 40):
    print("Risco alto")
elif cor == "amarelo":
    print("Risco medio")
else:
    print("Risco baixo")
```
