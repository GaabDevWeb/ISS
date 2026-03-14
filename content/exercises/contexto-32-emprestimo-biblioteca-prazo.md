---
title: "Prazo de devolução na biblioteca (tipo de usuário)"
slug: "contexto-32-emprestimo-biblioteca-prazo"
difficulty: "easy"
concepts: ["if/elif/else", "match ou if"]
discipline: "python"
learning_goal: "Exibir dias de prazo conforme tipo (aluno, professor, comunidade)."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "aluno"
    output: "14 dias"
  - input: "professor"
    output: "30 dias"
---

## Enunciado

A biblioteca define prazo: aluno 14 dias, professor 30 dias, comunidade 7 dias. O programa recebe o tipo (string) e exibe "X dias" com o prazo correspondente. Se o tipo for inválido, exiba "Tipo invalido."

**Tarefa**  
Use if/elif/else ou match/case e exiba uma única linha.

**Entrada**  
Uma linha com o tipo (aluno, professor ou comunidade). Pode ser em minúsculas.

**Saída**  
"14 dias", "30 dias", "7 dias" ou "Tipo invalido."

## Solução

```python
tipo = input().strip().lower()
if tipo == "aluno":
    print("14 dias")
elif tipo == "professor":
    print("30 dias")
elif tipo == "comunidade":
    print("7 dias")
else:
    print("Tipo invalido.")
```
