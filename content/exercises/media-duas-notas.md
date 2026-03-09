---
title: "Média de Duas Notas"
slug: "media-duas-notas"
difficulty: "easy"
concepts: ["variáveis", "média", "divisão", "float"]
discipline: "python"
hint: "Média aritmética = (nota1 + nota2) / 2. Use f-string com :.1f para exibir com uma casa decimal."
---

## Enunciado

O coordenador pedagógico precisa calcular a média aritmética de duas notas de um aluno para relatório parcial. As notas são 7.5 e 8.0. O programa deve armazenar as duas notas, calcular a média (soma dividida por 2) e exibir o resultado com uma casa decimal.

**Tarefa:** Defina `nota1 = 7.5` e `nota2 = 8.0`. Calcule a variável `media` e exiba usando `print()` (pode usar f-string com `:.1f`).

## Solução

```python
nota1 = 7.5
nota2 = 8.0
media = (nota1 + nota2) / 2
print(f"Média: {media:.1f}")
```
