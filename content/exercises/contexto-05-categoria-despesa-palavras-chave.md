---
title: "Categorização de despesa por palavras-chave (orçamento pessoal)"
slug: "contexto-05-categoria-despesa-palavras-chave"
difficulty: "medium"
concepts: ["if/elif/else", "in", "lower", "strings"]
discipline: "python"
learning_goal: "Classificar texto por termos e exibir categoria e valor formatado."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "Supermercado semana\n250.00"
    output: "Essencial - 250.00"
  - input: "Aplicação em fundos\n1000.00"
    output: "Investimento - 1000.00"
  - input: "Cinema e pipoca\n45.50"
    output: "Lazer e Outros - 45.50"
---

## Enunciado

Maria está organizando suas finanças e registra cada despesa com uma descrição e um valor. Ela quer que o sistema classifique automaticamente em "Essencial", "Investimento" ou "Lazer e Outros" com base em termos na descrição (comparação insensível a maiúsculas/minúsculas). Se houver termos de mais de uma categoria, use a prioridade: Essencial > Investimento > Lazer e Outros. O programa será em Python (Deepnote).

**Tarefa**  
Desenvolva um programa que leia a descrição e o valor, e exiba a categoria seguida de hífen e do valor (com duas casas decimais).

**Entrada**  
Duas linhas: primeira com a descrição da despesa; segunda com o valor (número real).

**Saída**  
Uma linha no formato: `CATEGORIA - VALOR` (valor com 2 decimais).

**Regras de prioridade**  
- Essencial: descrição contém algum de: 'aluguel', 'moradia', 'supermercado', 'alimentacao', 'agua', 'luz', 'internet'.  
- Investimento: senão, contém algum de: 'acoes', 'fundos', 'previdencia', 'bolsa'.  
- Lazer e Outros: demais casos.

## Solução

```python
desc = input().lower()
valor = float(input())
if any(t in desc for t in ['aluguel', 'moradia', 'supermercado', 'alimentacao', 'agua', 'luz', 'internet']):
    cat = "Essencial"
elif any(t in desc for t in ['acoes', 'fundos', 'previdencia', 'bolsa']):
    cat = "Investimento"
else:
    cat = "Lazer e Outros"
print(f"{cat} - {valor:.2f}")
```
