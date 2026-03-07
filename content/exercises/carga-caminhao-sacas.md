---
title: "Otimização de Carga e Estabilidade de Frete"
slug: "carga-caminhao-sacas"
difficulty: "medium"
concepts: ["//", "%", "variáveis", "porcentagem"]
discipline: "python"
---

## Enunciado

Um operador logístico trabalha com o transporte de insumos industriais em caminhões de pequeno porte. Cada saca de polímero pesa exatamente 65 kg, e o veículo possui um limite de carga útil de 550 kg. O impacto esperado é garantir que o caminhão nunca ultrapasse sua capacidade máxima, transportando apenas unidades inteiras para evitar o deslocamento perigoso da carga durante o trajeto.

**Tarefa:** Com base na capacidade de 550 kg e no peso unitário de 65 kg, desenvolva um código que calcule o número máximo de sacas que podem ser embarcadas em um caminhão sem exceder o limite, bem como a porcentagem de ocupação do peso do caminhão. O resultado deve ser armazenado em uma variável que represente a quantidade de sacas, e outra com a porcentagem (em relação à capacidade máxima), ambas exibidas no console.

## Solução

```python
capacidade_kg = 550
peso_saca = 65
max_sacas = capacidade_kg // peso_saca
peso_real = max_sacas * peso_saca
porcentagem_ocupacao = (peso_real / capacidade_kg) * 100
print(max_sacas)
print(porcentagem_ocupacao)
```
