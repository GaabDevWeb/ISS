---
title: "Saída estilo planilha com colunas numéricas formatadas"
slug: "aula-08-hard-07-planilha-csv-saida-formatada"
difficulty: "hard"
concepts: ["f-strings", ":.2f", "input()", "formatação de casas decimais"]
discipline: "python"
learning_goal: "Ler linhas CSV (nome;valor) e exibir tabela com valores formatados."
exercise_type: "full_program"
stage: 17
context: "parsing de CSV/arquivos"
test_cases:
  - input: "3\nItem A;10.5\nItem B;20.75\nItem C;3"
    output: "Item A   10.50\nItem B   20.75\nItem C    3.00"
---

## Enunciado

Escreva um programa que leia N (int) e depois N linhas no formato "NOME;VALOR" (nome e valor separados por ponto e vírgula). Para cada linha, exiba "NOME   VALOR" com valor com 2 decimais e nome em 8 caracteres à esquerda. Use split(';') para separar e f-strings para formatar. Use for e range(N).

## Solução

```python
n = int(input())
for _ in range(n):
    linha = input()
    partes = linha.split(";")
    nome = partes[0]
    valor = float(partes[1])
    print(f"{nome:<8}{valor:.2f}")
```
