---
title: "Pontuação BattleQuest e status Jogador Elite"
slug: "contexto-10-pontuacao-battlequest-elite"
difficulty: "hard"
concepts: ["if/elif/else por faixas", "acumulador de pontos", "múltiplas regras"]
discipline: "python"
learning_goal: "Calcular pontuação por componentes e exibir total e mensagem condicional."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "25\n2\n3\n10"
    output: "70\nJogador Elite! Parabens!"
  - input: "5\n0\n12\n20"
    output: "-10"
---

## Enunciado

No jogo BattleQuest a pontuação final é a soma de: (1) Inimigos: <10 → +10, 10–29 → +30, ≥30 → +50; (2) Objetivos: 0 → 0, 1–2 → +25, ≥3 → +60; (3) Mortes: <5 → 0, 5–10 → -10, >10 → -30; (4) Tempo (min): <5 → +25, 5–14 → +15, ≥15 → +5. Se a pontuação final for maior que 100, o jogador é "Jogador Elite". O programa em Python (Deepnote) lê os quatro valores (inimigos, objetivos, mortes, tempo) e exibe a pontuação final; na linha seguinte, se for Elite, exibe "Jogador Elite! Parabens!".

**Tarefa**  
Calcular a pontuação pelas regras acima e informar o total e, quando aplicável, a mensagem de Elite.

**Entrada**  
Quatro linhas: inteiros não negativos (inimigos derrotados, objetivos conquistados, mortes sofridas, tempo em minutos).

**Saída**  
Primeira linha: pontuação final (inteiro). Segunda linha (apenas se pontuação > 100): `Jogador Elite! Parabens!`

## Solução

```python
inimigos = int(input())
objetivos = int(input())
mortes = int(input())
tempo = int(input())
p = 0
if inimigos < 10: p += 10
elif inimigos <= 29: p += 30
else: p += 50
if objetivos == 0: p += 0
elif objetivos <= 2: p += 25
else: p += 60
if mortes < 5: p += 0
elif mortes <= 10: p -= 10
else: p -= 30
if tempo < 5: p += 25
elif tempo <= 14: p += 15
else: p += 5
print(p)
if p > 100:
    print("Jogador Elite! Parabens!")
```
