---
title: "Acesso à portaria (crachá ou visita)"
slug: "contexto-24-acesso-portaria-cracha-visita"
difficulty: "easy"
concepts: ["if/elif/else", "strings"]
discipline: "python"
learning_goal: "Liberar ou registrar acesso conforme tipo (crachá/visita) e documento."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "cracha\n12345"
    output: "Acesso liberado"
  - input: "visita\nJoão Silva"
    output: "Registrar visita e liberar"
---

## Enunciado

A portaria recebe o tipo de acesso ("cracha" ou "visita") e um identificador (número do crachá ou nome do visitante). Se crachá, exibir "Acesso liberado"; se visita, exibir "Registrar visita e liberar". Se outro valor, exibir "Tipo invalido." Comparação insensível a maiúsculas.

**Tarefa**  
Leia duas linhas e exiba a mensagem correspondente.

**Entrada**  
Duas linhas: tipo (cracha/visita) e identificador.

**Saída**  
Uma das três mensagens.

## Solução

```python
tipo = input().strip().lower()
id_val = input().strip()
if tipo == "cracha":
    print("Acesso liberado")
elif tipo == "visita":
    print("Registrar visita e liberar")
else:
    print("Tipo invalido.")
```
