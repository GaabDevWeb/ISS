---
title: "Classificação de força de senha (Segurança de TI)"
slug: "contexto-11-forca-senha-criterios-seguranca"
difficulty: "medium"
concepts: ["if/else", "len", "in", "contagem de critérios"]
discipline: "python"
learning_goal: "Avaliar senha por múltiplos critérios e classificar Segura/Fraca."
exercise_type: "full_program"
stage: 17
context: "validação de entrada"
test_cases:
  - input: "MinhaS3nha!"
    output: "Segura"
  - input: "abc"
    output: "Fraca"
---

## Enunciado

Uma empresa de software precisa classificar a força das senhas dos clientes. O programa em Python (Deepnote) recebe uma string (a senha) e deve exibir "Segura" se a senha atender a pelo menos dois dos critérios: (1) comprimento >= 8 caracteres, (2) conter ao menos um dos caracteres '!', '@' ou '#', (3) conter ao menos um algarismo. Caso contrário, exibir "Fraca".

**Tarefa**  
Implemente a avaliação dos três critérios e a classificação com base em pelo menos dois atendidos.

**Entrada**  
Uma única linha com a string da senha (qualquer combinação de caracteres).

**Saída**  
Uma linha: `Segura` ou `Fraca`.

## Solução

```python
senha = input()
c1 = len(senha) >= 8
c2 = any(c in senha for c in "!@#")
c3 = any(c.isdigit() for c in senha)
if c1 + c2 + c3 >= 2:
    print("Segura")
else:
    print("Fraca")
```
