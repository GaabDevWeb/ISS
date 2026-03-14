---
title: "Completar condição — aprovação com faltas"
slug: "aula-10-02-completar-condicao-faltas"
difficulty: "easy"
concepts: ["operadores lógicos and, or", "combinar condições"]
discipline: "python"
learning_goal: "Completar expressão booleana que exige média >= 7 e faltas <= 10."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
expected_output: "Aprovado"
---

## Enunciado

Complete a condição para que o aluno seja aprovado apenas se media >= 7 e faltas <= 10. As variáveis já estão definidas.

```python
media = 8.0
faltas = 5
if media >= 7 _____ faltas <= 10:  # preencha: and
    print("Aprovado")
else:
    print("Reprovado")
```

## Solução

```python
media = 8.0
faltas = 5
if media >= 7 and faltas <= 10:
    print("Aprovado")
else:
    print("Reprovado")
```
