---
title: "Situação do aluno por nota mínima (curso técnico)"
slug: "contexto-02-situacao-aluno-nota-minima"
difficulty: "easy"
concepts: ["if/else", "input()", "operadores relacionais"]
discipline: "python"
learning_goal: "Classificar aprovação com base em nota e nota mínima fornecidas."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "70\n60"
    output: "APROVADO"
  - input: "55\n60"
    output: "REPROVADO"
---

## Enunciado

Em um curso técnico, a coordenação definiu que cada disciplina pode ter uma nota mínima própria para aprovação. O sistema de gestão acadêmica recebe a nota final do aluno e a nota mínima da disciplina. Seu programa em Python, executado no Deepnote, deve indicar se o aluno está APROVADO ou REPROVADO nessa disciplina.

**Tarefa**  
Desenvolva um programa que compare a nota final do aluno com a nota mínima da disciplina e exiba a situação correspondente.

**Entrada**  
Duas linhas: a primeira com um número inteiro (0 a 100) representando a nota final do aluno; a segunda com um número inteiro (0 a 100) representando a nota mínima para aprovação na disciplina.

**Saída**  
- Se a nota final for maior ou igual à nota mínima, exiba: `APROVADO`
- Caso contrário, exiba: `REPROVADO`

## Solução

```python
nota_final = int(input())
nota_minima = int(input())
if nota_final >= nota_minima:
    print("APROVADO")
else:
    print("REPROVADO")
```
