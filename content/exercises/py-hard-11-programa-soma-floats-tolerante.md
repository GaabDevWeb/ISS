---
title: "HARD — Somar tokens numéricos (try/except)"
slug: "py-hard-11-programa-soma-floats-tolerante"
difficulty: "hard"
concepts: ["ValueError", "conversão de tipos", "try: temperatura = float(leitura) except ValueError"]
discipline: "python"
learning_goal: "Ignorar tokens inválidos com try/except."
exercise_type: "full_program"
stage: 20
context: "parsing de CSV/arquivos"
test_cases:
  - input: "1 x 2.5 3"
    output: "6.5"
---

## Enunciado

Leia linha com tokens separados por espaço. Some os que `float(t)` aceitar; ignore resto. Imprima soma com uma casa (`{s:.1f}`).

## Solução

```python
s = 0.0
for t in input().split():
    try:
        s += float(t)
    except ValueError:
        pass
print(f'{s:.1f}')
```
