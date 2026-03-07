---
title: "Fluxo IPO: Entrada, Processamento e Saída"
slug: "fluxo-ipo-estoque"
difficulty: "easy"
concepts: ["variáveis", "processamento", "IPO"]
discipline: "python"
---

## Enunciado

Uma equipe de logística precisa de um pequeno utilitário para registrar dados de estoque. O planejamento exige que o código siga uma estrutura organizada de entrada, processamento e saída (IPO). Para este teste, os dados de entrada são o peso de uma caixa (75 kg) e a quantidade (12 unidades). O impacto esperado é a facilidade de manutenção do código através de um fluxo lógico claro.

**Tarefa:** Crie um programa que siga o fluxo IPO:

- **Entrada:** Defina as variáveis `peso_unidade = 75` e `quantidade = 12`.
- **Processamento:** Crie a variável `peso_total` que multiplica o peso pela quantidade.
- **Saída:** Exiba o valor armazenado em `peso_total` usando o comando `print()`.

## Solução

```python
peso_unidade = 75
quantidade = 12
peso_total = peso_unidade * quantidade
print(peso_total)
```
