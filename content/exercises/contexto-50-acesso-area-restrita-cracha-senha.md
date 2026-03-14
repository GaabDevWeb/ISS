---
title: "Acesso à área restrita (crachá e senha)"
slug: "contexto-50-acesso-area-restrita-cracha-senha"
difficulty: "medium"
concepts: ["if/else", "and", "strings"]
discipline: "python"
learning_goal: "Liberar acesso apenas se crachá e senha forem os esperados."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "ADM001\nsenha123"
    output: "Acesso liberado"
  - input: "ADM001\nerrada"
    output: "Acesso negado"
---

## Enunciado

A área restrita exige crachá "ADM001" e senha "senha123" (exatamente essas strings). O programa recebe duas linhas (crachá e senha) e exibe "Acesso liberado" se ambos estiverem corretos; "Acesso negado" caso contrário.

**Tarefa**  
Compare as duas entradas com os valores esperados e exiba uma linha.

**Entrada**  
Duas linhas: identificação do crachá e senha.

**Saída**  
`Acesso liberado` ou `Acesso negado`

## Solução

```python
cracha = input().strip()
senha = input().strip()
if cracha == "ADM001" and senha == "senha123":
    print("Acesso liberado")
else:
    print("Acesso negado")
```
