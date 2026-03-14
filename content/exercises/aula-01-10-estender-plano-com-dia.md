---
title: "Estender plano de revisão com dia da semana"
slug: "aula-01-10-estender-plano-com-dia"
difficulty: "medium"
concepts: ["programação como ferramenta", "pensamento computacional"]
discipline: "python"
learning_goal: "Estender código existente para incluir dia da semana no plano de revisão."
exercise_type: "extend_code"
stage: 8
context: "configuração"
test_cases:
  - input: "segunda\nVariáveis"
    output: "segunda: Revisar Variáveis"
---

## Enunciado

O código abaixo exibe apenas o nome do tópico. Estenda-o para ler também o dia da semana (uma string) e exibir no formato: `DIA: Revisar TOPICO`. Mantenha a leitura do tópico.

```python
topico = input()
print("Revisar", topico)
```

## Solução

```python
dia = input()
topico = input()
print(dia + ":", "Revisar", topico)
```
