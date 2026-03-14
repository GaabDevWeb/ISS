---
title: "Avaliação de atendimento (nota e palavra-chave)"
slug: "contexto-40-avaliacao-atendimento-nota-palavras"
difficulty: "medium"
concepts: ["if/elif", "in", "strings"]
discipline: "python"
learning_goal: "Classificar atendimento por nota e por termos no comentário."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "9\nOtimo servico"
    output: "Excelente"
  - input: "6\nDemorou mas resolveu"
    output: "Regular"
---

## Enunciado

O NPS é calculado assim: nota 9 ou 10 → "Excelente"; 7 ou 8 → "Bom"; 5 ou 6 → "Regular"; abaixo de 5 → "Ruim". Porém, se o comentário (segunda linha) contiver a palavra "demora" ou "demorou", a classificação máxima é "Regular" (rebaixar Excelente e Bom para Regular). O programa recebe nota (int de 0 a 10) e comentário (string) e exibe a classificação final. Comparação insensível a maiúsculas.

**Tarefa**  
Calcule a classificação pela nota e, se houver palavra de demora, rebaixe para no máximo Regular.

**Entrada**  
Duas linhas: nota e comentário.

**Saída**  
Uma das quatro palavras: Excelente, Bom, Regular, Ruim.

## Solução

```python
nota = int(input())
coment = input().strip().lower()
if nota >= 9: cat = "Excelente"
elif nota >= 7: cat = "Bom"
elif nota >= 5: cat = "Regular"
else: cat = "Ruim"
if ("demora" in coment or "demorou" in coment) and cat in ("Excelente", "Bom"):
    cat = "Regular"
print(cat)
```
