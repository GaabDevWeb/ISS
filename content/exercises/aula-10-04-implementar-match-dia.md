---
title: "Implementar match/case para dia da semana"
slug: "aula-10-04-implementar-match-dia"
difficulty: "easy"
concepts: ["match/case", "pattern matching estrutural"]
discipline: "python"
learning_goal: "Usar match/case para mapear número (1-7) para nome do dia."
exercise_type: "implement_function"
stage: 4
context: "validação de dados"
test_cases:
  - input: "1"
    output: "domingo"
  - input: "5"
    output: "quinta"
---

## Enunciado

Implemente um programa que leia um inteiro de 1 a 7 (dia da semana) e exiba o nome: 1=domingo, 2=segunda, 3=terça, 4=quarta, 5=quinta, 6=sexta, 7=sábado. Use match/case com case _ para qualquer outro valor exibir "inválido".

## Solução

```python
dia = int(input())
match dia:
    case 1:
        print("domingo")
    case 2:
        print("segunda")
    case 3:
        print("terça")
    case 4:
        print("quarta")
    case 5:
        print("quinta")
    case 6:
        print("sexta")
    case 7:
        print("sábado")
    case _:
        print("inválido")
```
