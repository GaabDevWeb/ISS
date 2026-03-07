---
title: "Sincronização de Turnos e Manutenção Preventiva"
slug: "ciclos-turnos-modulo"
difficulty: "medium"
concepts: ["%", "//", "variáveis"]
discipline: "python"
---

## Enunciado

Uma planta petroquímica opera em ciclos ininterruptos de produção que duram 8 dias. Após um período de 125 dias de operação contínua, o engenheiro de manutenção precisa identificar em qual estágio do ciclo atual (de 0 a 7) a planta se encontra para agendar uma parada técnica, que deve ser feita apenas no fim do ciclo. O impacto esperado é a precisão no cronograma de manutenção preditiva.

**Tarefa:** Considerando o total de 125 dias decorridos e a periodicidade de 8 dias, escreva um programa que determine a fase atual da operação dentro do ciclo (resto da divisão de 125 por 8) e com quantos dias decorridos ao todo poderemos ter a parada técnica (próximo múltiplo de 8 a partir de 125). Exiba com duas variáveis o valor resultante que indica o dia atual do ciclo e a quantidade total de dias decorridos até a parada.

## Solução

```python
dias_decorridos = 125
periodicidade = 8
fase_atual = dias_decorridos % periodicidade
ciclos_completos = (dias_decorridos // periodicidade) + 1
dias_ate_parada = ciclos_completos * periodicidade
print(fase_atual)
print(dias_ate_parada)
```
