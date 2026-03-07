---
title: "Timestamp e Nível de Log"
slug: "timestamp-log-simples"
difficulty: "easy"
concepts: ["concatenação", "variáveis", "strings"]
discipline: "python"
---

## Enunciado

O time de DevOps padroniza entradas de log no formato: data, hora e nível (ex.: INFO, ERRO). Para testes, os valores são fixos no código. O programa deve montar uma única linha no formato: "[DATA HORA] NIVEL: mensagem".

**Tarefa:** Defina `data = '2024-05-10'`, `hora = '09:15:00'`, `nivel = 'INFO'` e `mensagem = 'Sistema iniciado'`. Concatene em uma variável `linha_log` no formato `[data hora] NIVEL: mensagem` e exiba com `print()`.

## Solução

```python
data = '2024-05-10'
hora = '09:15:00'
nivel = 'INFO'
mensagem = 'Sistema iniciado'
linha_log = '[' + data + ' ' + hora + '] ' + nivel + ': ' + mensagem
print(linha_log)
```
