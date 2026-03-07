---
title: "Pontuação Final em Arcana Quest"
slug: "arcana-quest-pontuacao"
difficulty: "hard"
concepts: ["input()", "int()", "//", "%", "fórmula"]
discipline: "python"
---

## Enunciado

A equipe da "Nexus Games" está preparando o lançamento do RPG "Arcana Quest". A pontuação final de um jogador é determinada pela soma das pontuações de três fases (Exploração, Combate, Estratégia), com bônus, dedução e fator de amplificação. Regras: (1) Pontuação base = soma das três fases. (2) Bônus = 2 × Estratégia + (Exploração // 2). (3) Dedução = 3 × (Combate % 10). (4) Fator maestria = (Exploração // 5) + 1. (5) Pontuação final = (base + bônus - dedução) × fator maestria.

**Tarefa:** O programa recebe três entradas (inteiros): pontuação Exploração, Combate e Estratégia. Calcule a pontuação final conforme as regras e exiba uma linha no formato: "Pontuação Final em Arcana Quest: XXX pontos." (XXX é o valor inteiro).

## Solução

```python
exploracao = int(input())
combate = int(input())
estrategia = int(input())
base = exploracao + combate + estrategia
bonus = 2 * estrategia + (exploracao // 2)
deducao = 3 * (combate % 10)
fator = (exploracao // 5) + 1
pontuacao_final = int((base + bonus - deducao) * fator)
print(f"Pontuação Final em Arcana Quest: {pontuacao_final} pontos.")
```
