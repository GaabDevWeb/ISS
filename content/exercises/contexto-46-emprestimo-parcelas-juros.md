---
title: "Aprovação de empréstimo (parcelas e taxa de juros)"
slug: "contexto-46-emprestimo-parcelas-juros"
difficulty: "medium"
concepts: ["if/elif/else", "cálculo simples"]
discipline: "python"
learning_goal: "Calcular parcela e aprovar ou negar por valor da parcela."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "10000\n12\n2.5"
    output: "Aprovado. Parcela: R$ 975.00"
  - input: "50000\n12\n1.0"
    output: "Reprovado"
---

## Enunciado

O banco aprova o empréstimo se a parcela (valor * (1 + taxa/100) / n_parcelas) for <= 30% da renda. O programa recebe valor do empréstimo (float), número de parcelas (int), taxa de juros ao mês (float) e renda (float). Exiba "Aprovado. Parcela: R$ X.XX" (parcela com 2 decimais) ou "Reprovado". Considere que a parcela é (valor * (1 + taxa/100)) / n_parcelas.

**Tarefa**  
Calcule a parcela e compare com 0.3 * renda.

**Entrada**  
Quatro linhas: valor, parcelas, taxa, renda.

**Saída**  
Uma linha com Aprovado e valor da parcela ou Reprovado.

## Solução

```python
valor = float(input())
n = int(input())
taxa = float(input())
renda = float(input())
parcela = (valor * (1 + taxa/100)) / n
if parcela <= 0.3 * renda:
    print(f"Aprovado. Parcela: R$ {parcela:.2f}")
else:
    print("Reprovado")
```
