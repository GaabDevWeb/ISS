---
title: "Formatação de Nomes para Crachá"
slug: "cracha-formatacao-nomes"
difficulty: "medium"
concepts: ["upper()", "capitalize()", "concatenação"]
discipline: "python"
---

## Enunciado

O departamento de RH está organizando a emissão de crachás para os novos colaboradores. Para que os crachás tenham uma aparência padronizada, é essencial que todos os nomes sejam formatados de maneira específica. O nome completo e uma versão simplificada para o crachá são recebidos diretamente do formulário de admissão.

**Tarefa:** O programa deve receber duas informações de texto: o nome completo para o cadastro (por exemplo, `nome_completo = 'maria santos oliveira'`) e um nome simplificado para o crachá (por exemplo, `nome_cracha = 'maria'`). O nome completo deve ser formatado em letras maiúsculas para o sistema interno. O nome do crachá deve ter apenas a primeira letra maiúscula. Além disso, crie uma string de identificação que seja a combinação do nome do crachá formatado, seguido de três hífens, e então o nome completo formatado. Exiba as três versões padronizadas.

## Solução

```python
nome_completo = 'maria santos oliveira'
nome_cracha = 'maria'
nome_completo_sistema = nome_completo.upper()
nome_cracha_formatado = nome_cracha.capitalize()
identificacao = nome_cracha_formatado + '---' + nome_completo_sistema
print(nome_completo_sistema)
print(nome_cracha_formatado)
print(identificacao)
```
