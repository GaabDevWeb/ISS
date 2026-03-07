---
title: "Porcentagem de Vogais na Mensagem"
slug: "porcentagem-vogais"
difficulty: "medium"
concepts: ["input()", "lower()", "in", "len()", "contagem"]
discipline: "python"
---

## Enunciado

Uma equipe de comunicação está analisando a qualidade textual das mensagens de campanhas. Um dos indicadores é a porcentagem de vogais em relação ao total de caracteres da mensagem (incluindo espaços e pontuação). Considere todas as vogais, maiúsculas ou minúsculas.

**Tarefa:** Desenvolva um programa que calcule a porcentagem de vogais em uma mensagem inserida pelo usuário. O texto é lido com `mensagem = input()`. Conte quantos caracteres são vogais (a, e, i, o, u) usando o método `count()` para cada vogal na mensagem em minúsculas. A porcentagem = (quantidade de vogais / total de caracteres) × 100. Exiba uma única linha com a porcentagem (use f-string com formatação adequada).

## Solução

```python
mensagem = input()
mensagem_lower = mensagem.lower()
qtd_vogais = mensagem_lower.count('a') + mensagem_lower.count('e') + mensagem_lower.count('i') + mensagem_lower.count('o') + mensagem_lower.count('u')
total = len(mensagem)
porcentagem = (qtd_vogais / total * 100) if total > 0 else 0
print(f"Porcentagem de vogais: {porcentagem:.1f}%")
```
