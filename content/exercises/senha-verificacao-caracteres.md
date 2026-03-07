---
title: "Verificação de Caracteres em Senha"
slug: "senha-verificacao-caracteres"
difficulty: "medium"
concepts: ["operador in", "islower()", "isupper()"]
discipline: "python"
---

## Enunciado

A empresa SecureNet está implementando políticas que exigem a inclusão de caracteres especiais em todas as senhas, além de critérios relacionados ao uso de letras maiúsculas e minúsculas. Você foi encarregado de desenvolver um programa para verificar a conformidade das senhas.

**Tarefa:** Considerando uma senha inserida pelo usuário por meio de `input()` (por exemplo, `Infnet123!@#`), o programa deve: (1) Verificar a presença do caractere `@`, do símbolo `!` e do caractere `#` na senha, utilizando o operador `in`. (2) Verificar se a senha está composta apenas por letras minúsculas com `islower()`. (3) Verificar se a senha está composta apenas por letras maiúsculas com `isupper()`. Para cada verificação, armazene o resultado em variáveis distintas (True ou False) e exiba cada uma delas devidamente sinalizadas.

## Solução

```python
senha = input("Digite a senha: ")
tem_arroba = '@' in senha
tem_exclamacao = '!' in senha
tem_cerquilha = '#' in senha
apenas_minusculas = senha.islower()
apenas_maiusculas = senha.isupper()
print("Tem @:", tem_arroba)
print("Tem !:", tem_exclamacao)
print("Tem #:", tem_cerquilha)
print("Apenas minúsculas:", apenas_minusculas)
print("Apenas maiúsculas:", apenas_maiusculas)
```
