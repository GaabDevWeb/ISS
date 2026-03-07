---
title: "Mensagem e Inversão de Capitalização"
slug: "mensagem-swapcase"
difficulty: "easy"
concepts: ["input()", "swapcase()", "print()"]
discipline: "python"
---

## Enunciado

No contexto de uma disciplina de Introdução à Programação com Python, um grupo de educadores busca ferramentas interativas para apoiar o aprendizado. Eles desejam criar um programa simples que capture uma mensagem digitada pelo aluno, apresente a mensagem original como confirmação de recebimento e também exiba uma versão da mensagem com a capitalização das letras invertida (maiúsculas viram minúsculas e vice-versa), reforçando o entendimento sobre manipulação de strings.

**Tarefa:** Desenvolva um programa que interaja com o usuário através da captura de uma única informação textual, utilizando `mensagem = input()` para ler a entrada. A saída deve ter duas linhas: uma indicando que a mensagem foi recebida com sucesso seguida do texto original, e uma segunda linha exibindo a mensagem com `swapcase()`.

## Solução

```python
mensagem = input("Digite uma mensagem: ")
print("Mensagem recebida:", mensagem)
print("Invertida:", mensagem.swapcase())
```
