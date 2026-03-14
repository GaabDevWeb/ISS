---
title: "Implementar formatação com .format()"
slug: "aula-08-04-implementar-format-percent"
difficulty: "easy"
concepts: ["método format() de str", "interpolação"]
discipline: "python"
learning_goal: "Usar .format() para inserir valor em mensagem."
exercise_type: "implement_function"
stage: 4
context: "logs"
expected_output: "Erro na linha 10"
---

## Enunciado

Implemente uma linha que exiba "Erro na linha 10" usando o método .format() da string, com variável `linha = 10`. Use "Erro na linha {}".format(linha) ou equivalente.

## Solução

```python
linha = 10
print("Erro na linha {}".format(linha))
```
