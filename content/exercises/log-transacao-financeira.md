---
title: "Mensagem de Log para Auditoria de Transação"
slug: "log-transacao-financeira"
difficulty: "hard"
concepts: ["input()", "concatenação", "formatação de string"]
discipline: "python"
---

## Enunciado

Em um projeto da TechSolutions, a equipe precisa padronizar mensagens de log para auditoria. O objetivo é combinar identificador da transação, data, hora, tipo, conta origem, conta destino e valor em uma única linha de texto.

**Tarefa:** O programa recebe sete strings, uma por linha: id da transação, data (AAAA-MM-DD), hora (HH:MM:SS), tipo (ex.: "DEB" ou "CRED"), conta origem, conta destino (ou "N/A"), valor com duas casas decimais. A saída deve ser uma única linha no formato: `[LOG: ID] - DATA: data hora | TIPO: tipo {ORIGEM: origem -> DESTINO: destino} VALOR: R$ valor;`

Exemplo de formato esperado (valores ilustrativos): `[LOG: ABC123] - DATA: 2024-01-15 14:30:00 | TIPO: DEB {ORIGEM: 1001 -> DESTINO: 1002} VALOR: R$ 150.00;`

## Solução

```python
id_trans = input()
data = input()
hora = input()
tipo = input()
conta_origem = input()
conta_destino = input()
valor = input()
log = "[LOG: " + id_trans + "] - DATA: " + data + " " + hora + " | TIPO: " + tipo + " {ORIGEM: " + conta_origem + " -> DESTINO: " + conta_destino + "} VALOR: R$ " + valor + ";"
print(log)
```
