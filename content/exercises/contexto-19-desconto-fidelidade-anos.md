---
title: "Desconto por anos de fidelidade (loja)"
slug: "contexto-19-desconto-fidelidade-anos"
difficulty: "medium"
concepts: ["if/elif/else", "faixas", "formatação"]
discipline: "python"
learning_goal: "Aplicar percentual de desconto por faixa de anos e exibir valor final."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "100.00\n6"
    output: "85.00"
  - input: "100.00\n2"
    output: "95.00"
---

## Enunciado

Uma loja dá desconto pelo tempo de fidelidade: 0–2 anos 5%, 3–5 anos 10%, 6–10 anos 15%, mais de 10 anos 20%. O programa recebe o valor da compra (float) e os anos de fidelidade (int) e exibe o valor final com 2 decimais.

**Tarefa**  
Calcule valor * (1 - taxa) e exiba com duas casas decimais.

**Entrada**  
Duas linhas: valor da compra e anos de fidelidade.

**Saída**  
Número real com duas casas decimais.

## Solução

```python
valor = float(input())
anos = int(input())
if anos <= 2: taxa = 0.05
elif anos <= 5: taxa = 0.10
elif anos <= 10: taxa = 0.15
else: taxa = 0.20
print(f"{valor * (1 - taxa):.2f}")
```
