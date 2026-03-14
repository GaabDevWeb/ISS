---
title: "Refatorar if/elif para match/case"
slug: "aula-10-11-refatorar-if-para-match"
difficulty: "easy"
concepts: ["match/case", "pattern matching"]
discipline: "python"
learning_goal: "Reescrever cadeia if/elif/else usando match/case."
exercise_type: "refactor"
stage: 6
context: "validação de dados"
test_cases:
  - input: "S"
    output: "Sim"
  - input: "N"
    output: "Não"
---

## Enunciado

Refatore o código abaixo para usar match/case em vez de if/elif. Comportamento: "S" -> "Sim", "N" -> "Não", outro -> "Inválido".

```python
opcao = input().strip()
if opcao == "S":
    print("Sim")
elif opcao == "N":
    print("Não")
else:
    print("Inválido")
```

## Solução

```python
opcao = input().strip()
match opcao:
    case "S":
        print("Sim")
    case "N":
        print("Não")
    case _:
        print("Inválido")
```
