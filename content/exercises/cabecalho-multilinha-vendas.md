---
title: "Cabeçalho Multilinha para Módulo"
slug: "cabecalho-multilinha-vendas"
difficulty: "easy"
concepts: ["docstring", "string multilinha", "variáveis"]
discipline: "python"
---

## Enunciado

A equipe de desenvolvimento da empresa TechSolutions está constantemente aprimorando seus softwares. Para garantir a clareza e a padronização, é fundamental que todos os arquivos de código recebam um cabeçalho descritivo no início. Esse cabeçalho deve ser organizado como um bloco de texto multilinha, facilitando sua leitura e manutenção ao longo do tempo.

**Tarefa:** Elabore um bloco de texto que servirá como cabeçalho do arquivo, contendo exatamente as seguintes informações, cada uma em sua própria linha. Guarde esse bloco em uma variável (por exemplo, `cabecalho`):

- Nome do módulo: Módulo de Relatórios
- Data de criação: 22/04/2024
- Descrição: Responsável pela geração e exportação de relatórios gerenciais.

O cabeçalho deve ser armazenado em uma única variável string, preservando as quebras de linha entre as informações. Ao final, exiba o conteúdo da variável com `print()`.

## Solução

```python
cabecalho = """Nome do módulo: Módulo de Relatórios
Data de criação: 22/04/2024
Descrição: Responsável pela geração e exportação de relatórios gerenciais."""
print(cabecalho)
```
