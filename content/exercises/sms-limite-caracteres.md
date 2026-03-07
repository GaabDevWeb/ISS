---
title: "Limite de Caracteres em SMS"
slug: "sms-limite-caracteres"
difficulty: "medium"
concepts: ["len()", "concatenação", "cálculo"]
discipline: "python"
---

## Enunciado

A equipe de Marketing está desenvolvendo campanhas promocionais via SMS. Para evitar custos adicionais, cada SMS deve respeitar um limite de 160 caracteres. O gerente forneceu o texto de uma mensagem candidata para que seu programa verifique se ela atende a essa restrição, considerando prefixo e sufixo padrão que são sempre incluídos.

**Tarefa:** Com a mensagem de campanha `mensagem_candidata = 'Promoção especial! Aproveite até amanhã.'`, o prefixo `prefixo_padrao = 'Voz Digital: '` e o sufixo `sufixo_padrao = ' Acesse nosso site.'`, calcule o comprimento total da mensagem final (prefixo + mensagem_candidata + sufixo). Além disso, determine quantos caracteres a mensagem excede ou falta em relação ao limite de 160 caracteres (diferença = tamanho_total - 160). Guarde em variáveis `tamanho_total` e `diferenca_limite` e exiba os valores ao final.

## Solução

```python
mensagem_candidata = 'Promoção especial! Aproveite até amanhã.'
prefixo_padrao = 'Voz Digital: '
sufixo_padrao = ' Acesse nosso site.'
mensagem_final = prefixo_padrao + mensagem_candidata + sufixo_padrao
tamanho_total = len(mensagem_final)
limite = 160
diferenca_limite = tamanho_total - limite
print("Tamanho total:", tamanho_total)
print("Diferença em relação ao limite (160):", diferenca_limite)
```
