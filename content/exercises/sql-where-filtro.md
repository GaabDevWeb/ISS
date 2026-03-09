---
title: "Filtrar com WHERE"
slug: "sql-where-filtro"
difficulty: "medium"
concepts: "SELECT, WHERE, SQL, filtro"
discipline: "visualizacao-sql"
language: "sql"
---

## Enunciado

Escreva uma consulta SQL que retorne as colunas `nome` e `email` da tabela `usuarios` apenas para os registros em que a coluna `ativo` seja igual a 1.

## Solução

```sql
SELECT nome, email
FROM usuarios
WHERE ativo = 1;
```
