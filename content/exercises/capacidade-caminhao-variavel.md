---
title: "Máximo de Unidades por Carga (Caminhão)"
slug: "capacidade-caminhao-variavel"
difficulty: "medium"
concepts: ["//", "input()", "int()", "variáveis"]
discipline: "python"
---

## Enunciado

Um operador logístico precisa de um programa genérico que, dadas a capacidade máxima do caminhão em kg e o peso unitário da carga em kg, calcule quantas unidades inteiras cabem sem exceder o limite. Os valores serão informados pelo usuário.

**Tarefa:** O programa deve ler dois inteiros: capacidade do caminhão (ex.: 500) e peso por unidade (ex.: 40). Calcule o número máximo de unidades (divisão inteira `//`) e exiba a mensagem: "Cabem no máximo X unidades." (X é o resultado).

## Solução

```python
capacidade = int(input("Capacidade (kg): "))
peso_unidade = int(input("Peso por unidade (kg): "))
max_unidades = capacidade // peso_unidade
print(f"Cabem no máximo {max_unidades} unidades.")
```
