---
title: "Elegibilidade para entrevista (RH – experiência ou escolaridade e Python)"
slug: "contexto-08-elegibilidade-candidato-rh-or-escolaridade"
difficulty: "medium"
concepts: ["if/else", "operadores lógicos or/and", "strings"]
discipline: "python"
learning_goal: "Combinar regras de elegibilidade com múltiplas condições."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "10\nPós-graduação\nAvançado"
    output: "Candidato Elegível"
  - input: "3\nGraduação\nBásico"
    output: "Candidato Não Elegível"
  - input: "2\nGraduação Infnet\nIntermediário"
    output: "Candidato Elegível"
---

## Enunciado

O RH da TechSolutions considera elegível para a fase de entrevistas quem tem pelo menos 8 anos de experiência OU (escolaridade pelo menos "Pós-graduação" E nível em Python "Avançado"). Desafio adicional: se a palavra "Infnet" aparecer na escolaridade ou no nível em Python, o candidato também é elegível. O programa em Python (Deepnote) recebe anos de experiência, escolaridade e nível em Python e deve exibir "Candidato Elegível" ou "Candidato Não Elegível".

**Tarefa**  
Implemente a lógica de elegibilidade descrita.

**Entrada**  
Três linhas: inteiro (anos de experiência); string (escolaridade: "Graduação", "Pós-graduação" ou "Mestrado"); string (nível em Python: "Básico", "Intermediário" ou "Avançado").

**Saída**  
Uma linha: `Candidato Elegível` ou `Candidato Não Elegível`.

## Solução

```python
exp = int(input())
esc = input()
py = input()
elegivel = exp >= 8
elegivel = elegivel or (("Pós-graduação" in esc or "Mestrado" in esc) and "Avançado" in py)
elegivel = elegivel or "Infnet" in esc or "Infnet" in py
if elegivel:
    print("Candidato Elegível")
else:
    print("Candidato Não Elegível")
```
