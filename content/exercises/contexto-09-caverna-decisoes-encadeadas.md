---
title: "Caverna dos Caminhos Incertos – decisões encadeadas"
slug: "contexto-09-caverna-decisoes-encadeadas"
difficulty: "hard"
concepts: ["if/elif/else aninhados", "input condicional", "fluxo de decisão"]
discipline: "python"
learning_goal: "Solicitar entradas adicionais conforme decisão e exibir resultado."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "Esquerda\n85"
    output: "Tesouro Encontrado"
  - input: "Direita\nSim\n15"
    output: "Caminho Seguro"
---

## Enunciado

No jogo "Caverna dos Caminhos Incertos", o jogador escolhe Esquerda ou Direita. Se Esquerda, informa nível de coragem (0–100): se >= 80 resulta em "Tesouro Encontrado"; senão lê vida restante (0–100): se >= 30 "Fuga Bem-Sucedida", senão "Derrota na Caverna". Se Direita, informa se tem tocha (Sim/Nao): se Nao "Perdido na Escuridao"; se Sim lê tempo da tocha em minutos: se > 10 "Caminho Seguro", senão "Avanco Arriscado". Implemente em Python (Deepnote) esse fluxo e exiba apenas a mensagem final.

**Tarefa**  
Ler a primeira decisão e, conforme o caso, ler entradas adicionais e imprimir o resultado correspondente.

**Entrada**  
Conforme o fluxo: caminho (Esquerda/Direita); depois coragem ou tocha; quando aplicável, vida ou tempo da tocha. Valores dentro dos esperados.

**Saída**  
Uma linha com exatamente uma das mensagens: Tesouro Encontrado | Fuga Bem-Sucedida | Derrota na Caverna | Perdido na Escuridao | Caminho Seguro | Avanco Arriscado.

## Solução

```python
caminho = input().strip()
if caminho == "Esquerda":
    coragem = int(input())
    if coragem >= 80:
        print("Tesouro Encontrado")
    else:
        vida = int(input())
        if vida >= 30:
            print("Fuga Bem-Sucedida")
        else:
            print("Derrota na Caverna")
else:
    tocha = input().strip()
    if tocha == "Nao":
        print("Perdido na Escuridao")
    else:
        tempo = int(input())
        if tempo > 10:
            print("Caminho Seguro")
        else:
            print("Avanco Arriscado")
```
