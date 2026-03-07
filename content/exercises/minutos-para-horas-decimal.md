---
title: "Auditoria de Desempenho e Eficiência de Ativos"
slug: "minutos-para-horas-decimal"
difficulty: "easy"
concepts: ["conversão", "divisão", "float"]
discipline: "python"
---

## Enunciado

O gestor de um parque industrial monitora o tempo de uso de braços robóticos em minutos para calcular o custo de depreciação. Um equipamento registrou 345 minutos de atividade. Para o dashboard da diretoria, o dado precisa ser convertido para horas em formato decimal. O impacto esperado é a padronização dos indicadores de desempenho (KPIs) para análise de ROI.

**Tarefa:** Crie um sistema que receba o registro de 345 minutos e realize a transformação para a grandeza de horas decimais (minutos / 60). O resultado deve refletir a fração exata do tempo de uso para que o custo por hora seja aplicado posteriormente. Exiba o valor convertido.

## Solução

```python
minutos = 345
horas_decimal = minutos / 60
print(horas_decimal)
```
