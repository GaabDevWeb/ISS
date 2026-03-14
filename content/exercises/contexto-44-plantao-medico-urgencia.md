---
title: "Encaminhamento no plantão (nível de urgência)"
slug: "contexto-44-plantao-medico-urgencia"
difficulty: "medium"
concepts: ["if/elif/else", "strings"]
discipline: "python"
learning_goal: "Definir tempo de espera e mensagem por código de urgência."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "vermelho"
    output: "Atendimento imediato"
  - input: "amarelo"
    output: "Ate 30 minutos"
---

## Enunciado

No plantão, o triador informa a cor da urgência: vermelho → "Atendimento imediato", amarelo → "Ate 30 minutos", verde → "Ate 2 horas", azul → "Ate 4 horas". O programa recebe a cor (minúsculas) e exibe a mensagem. Outros valores → "Consulte a recepcao".

**Tarefa**  
Exiba a mensagem correspondente à cor.

**Entrada**  
Uma linha com a cor.

**Saída**  
Uma das cinco mensagens.

## Solução

```python
cor = input().strip().lower()
if cor == "vermelho": print("Atendimento imediato")
elif cor == "amarelo": print("Ate 30 minutos")
elif cor == "verde": print("Ate 2 horas")
elif cor == "azul": print("Ate 4 horas")
else: print("Consulte a recepcao")
```
