---
title: "Inscrição em evento (vagas e idade mínima)"
slug: "contexto-27-inscricao-evento-vagas-idade"
difficulty: "easy"
concepts: ["if/else", "and"]
discipline: "python"
learning_goal: "Aceitar inscrição se há vaga e idade >= 18."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "5\n20"
    output: "Inscricao realizada"
  - input: "0\n25"
    output: "Inscricao negada"
---

## Enunciado

O evento tem vagas limitadas e é para maiores de 18. O programa recebe quantidade de vagas disponíveis (int) e idade do candidato (int). Se vagas > 0 e idade >= 18, exibir "Inscricao realizada"; senão "Inscricao negada".

**Tarefa**  
Verifique as duas condições e exiba o resultado.

**Entrada**  
Duas linhas: vagas e idade.

**Saída**  
`Inscricao realizada` ou `Inscricao negada`

## Solução

```python
vagas = int(input())
idade = int(input())
if vagas > 0 and idade >= 18:
    print("Inscricao realizada")
else:
    print("Inscricao negada")
```
