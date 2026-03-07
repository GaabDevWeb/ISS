---
title: "Telemetria Aeroespacial e Autonomia de Voo"
slug: "telemetria-drone-energia"
difficulty: "hard"
concepts: ["conversão de unidades", "float", "porcentagem"]
discipline: "python"
---

## Enunciado

Um drone de monitoramento ambiental realizou dois voos de mapeamento: um com duração de 3.77 horas e outro de 214 minutos. O sistema de telemetria de bateria processa o consumo de energia exclusivamente em segundos. Para calcular a energia total que a bateria deve ter, considere que cada segundo do drone corresponde a 2,7 joules. O impacto esperado é o cálculo preciso da energia necessária para evitar a perda do equipamento durante o pouso, adicionando 15% de margem de segurança.

**Tarefa:** A partir do tempo de ambos os voos, converta o total integralmente para segundos, calcule quanto de energia foi gasto nos voos (segundos × 2.7) e, em seguida, considere a margem de segurança de 15% (multiplique por 1.15). Armazene o resultado final em uma variável apropriada e exiba no terminal.

## Solução

```python
voo1_horas = 3.77
voo2_minutos = 214
voo1_segundos = voo1_horas * 3600
voo2_segundos = voo2_minutos * 60
total_segundos = voo1_segundos + voo2_segundos
energia_joules = total_segundos * 2.7
energia_com_margem = energia_joules * 1.15
print(energia_com_margem)
```
