---
title: "Conceito e aprovação (nota e frequência)"
slug: "contexto-49-sistema-notas-conceito-aprovacao"
difficulty: "medium"
concepts: ["if/elif/else", "and"]
discipline: "python"
learning_goal: "Atribuir conceito por nota e decidir aprovado/reprovado por nota e frequência."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "8.5\n90"
    output: "B\nAprovado"
  - input: "5.0\n85"
    output: "C\nReprovado"
---

## Enunciado

A disciplina usa conceitos: nota >= 9 → A, >= 7 → B, >= 5 → C, < 5 → D. O aluno está aprovado se conceito não for D e frequência >= 75%. O programa recebe nota (float) e frequência (int, 0–100) e exibe na primeira linha o conceito (A, B, C ou D) e na segunda "Aprovado" ou "Reprovado".

**Tarefa**  
Defina o conceito pela nota e aprovado por conceito != D e frequência >= 75.

**Entrada**  
Duas linhas: nota e frequência.

**Saída**  
Duas linhas: conceito e Aprovado/Reprovado.

## Solução

```python
nota = float(input())
freq = int(input())
if nota >= 9: conc = "A"
elif nota >= 7: conc = "B"
elif nota >= 5: conc = "C"
else: conc = "D"
print(conc)
if conc != "D" and freq >= 75:
    print("Aprovado")
else:
    print("Reprovado")
```
