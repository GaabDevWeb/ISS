---
title: "Saldo de Estoque Após Saída"
slug: "estoque-saldo-saida"
difficulty: "easy"
concepts: ["input()", "int()", "subtração", "f-string"]
discipline: "python"
---

## Enunciado

No setor de logística da empresa 'Estoque Rápido', o gerente precisa monitorar a disponibilidade de produtos. As informações de estoque inicial e de vendas do dia serão fornecidas pela equipe. O objetivo é que um programa processe esses valores e apresente o saldo atualizado.

**Tarefa:** Desenvolva um programa que calcule o saldo atual de um item após uma transação de saída. A entrada será composta por duas linhas: a primeira contém um número inteiro com a quantidade inicial (por exemplo, 100); a segunda contém o número de unidades retiradas (por exemplo, 30). A saída deve ser uma linha no formato: 'Após a retirada de [X] itens, o saldo atual é de [Y] unidades.'

## Solução

```python
quantidade_inicial = int(input())
quantidade_retirada = int(input())
quantidade_restante = quantidade_inicial - quantidade_retirada
print(f'Após a retirada de {quantidade_retirada} itens, o saldo atual é de {quantidade_restante} unidades.')
```
