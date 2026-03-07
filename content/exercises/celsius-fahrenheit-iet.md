---
title: "Celsius para Fahrenheit e Indicador de Estabilidade Térmica"
slug: "celsius-fahrenheit-iet"
difficulty: "medium"
concepts: ["input()", "float()", "fórmulas", "concatenação"]
discipline: "python"
---

## Enunciado

A equipe da ClimaTech opera uma rede de sensores para monitoramento ambiental. Diariamente recebem medições em graus Celsius. Para integrar aos relatórios globais, é essencial converter cada leitura para Fahrenheit e calcular um "Indicador de Estabilidade Térmica" (IET). Fórmulas: F = (Celsius × 9/5) + 32; IET = (Celsius / 4.0) - (Celsius × 0.08) + 1.5.

**Tarefa:** O programa recebe uma única linha com a temperatura em Celsius (float). Produza uma única linha de texto com: valor em Fahrenheit, seguido de "; " (ponto e vírgula e espaço), seguido do valor do IET. Ambos os resultados devem ser convertidos para string e concatenados.

## Solução

```python
celsius = float(input())
fahrenheit = (celsius * 9 / 5) + 32
iet = (celsius / 4.0) - (celsius * 0.08) + 1.5
saida = str(fahrenheit) + "; " + str(iet)
print(saida)
```
