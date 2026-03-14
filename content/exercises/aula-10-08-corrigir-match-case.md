---
title: "Corrigir match/case — case padrão"
slug: "aula-10-08-corrigir-match-case"
difficulty: "easy"
concepts: ["match/case", "case _"]
discipline: "python"
learning_goal: "Garantir que case _ exista para valores inesperados."
exercise_type: "fix_bug"
stage: 4
context: "validação de dados"
test_cases:
  - input: "0"
    output: "desconhecido"
---

## Enunciado

O código usa match para status 1 e 2. Quando o valor for 0 ou outro, deve exibir "desconhecido". Corrija adicionando case _ (case padrão).

```python
status = int(input())
match status:
    case 1:
        print("ativo")
    case 2:
        print("inativo")
# falta case _ para outros valores
```

## Solução

```python
status = int(input())
match status:
    case 1:
        print("ativo")
    case 2:
        print("inativo")
    case _:
        print("desconhecido")
```
