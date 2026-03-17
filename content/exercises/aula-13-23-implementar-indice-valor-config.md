---
title: "Implementar — listar chaves de configuração com índice"
slug: "aula-13-23-implementar-indice-valor-config"
difficulty: "medium"
concepts: ["enumerate", "processamento de texto"]
discipline: "python"
learning_goal: "Listar itens de configuração no formato 'N. chave=valor' usando enumerate."
exercise_type: "implement_function"
stage: 11
context: "arquivos de configuração"
expected_output: "1. host=localhost\n2. port=8080\n3. debug=true"
---

## Enunciado

Implemente a função `listar_config(itens: list)` que recebe uma lista de strings no formato "chave=valor" e imprime cada uma como "N. chave=valor", com N começando em 1. Use `enumerate(itens)` e no print use `i+1` para o número.

## Solução

```python
def listar_config(itens: list) -> None:
    for i, item in enumerate(itens):
        print(f'{i + 1}. {item}')

listar_config(['host=localhost', 'port=8080', 'debug=true'])
```
