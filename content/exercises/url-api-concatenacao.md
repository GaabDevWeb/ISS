---
title: "Construção de URL de API"
slug: "url-api-concatenacao"
difficulty: "easy"
concepts: ["concatenação", "strings", "variáveis"]
discipline: "python"
---

## Enunciado

A equipe de desenvolvimento está criando uma ferramenta interna para padronizar a construção de URLs de API. Eles precisam garantir que todas as requisições sigam um formato específico, combinando o domínio principal com os caminhos de acesso aos recursos.

**Tarefa:** Você receberá o domínio base (por exemplo, `dominio_base = 'api.linkmanager.com'`), um nome para o caminho principal (por exemplo, `caminho = 'clientes'`), um identificador único (por exemplo, `identificador = '456'`) e uma ação (por exemplo, `acao = 'detalhes'`). A URL deve ser: domínio + `/` + caminho + `/` + identificador + `/` + acao. O programa deve exibir a URL completa resultante (ex.: `api.linkmanager.com/clientes/456/detalhes`).

## Solução

```python
dominio_base = 'api.linkmanager.com'
caminho = 'clientes'
identificador = '456'
acao = 'detalhes'
url = dominio_base + '/' + caminho + '/' + identificador + '/' + acao
print(url)
```
