---
title: "Valor da reserva de hotel (tipo de quarto e dias)"
slug: "contexto-36-reserva-hotel-tipo-quarto-dias"
difficulty: "medium"
concepts: ["if/elif/else", "cálculo", "strings"]
discipline: "python"
learning_goal: "Calcular total da hospedagem por tipo de quarto e número de noites."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "standard\n3"
    output: "450.00"
  - input: "luxo\n2"
    output: "600.00"
---

## Enunciado

O hotel cobra por noite: standard R$ 150, luxo R$ 300, suíte R$ 500. O programa recebe o tipo de quarto (uma palavra em minúsculas) e o número de dias de hospedagem (int) e exibe o valor total com 2 decimais.

**Tarefa**  
Multiplique diária pelo número de dias e exiba formatado.

**Entrada**  
Duas linhas: tipo (standard, luxo ou suíte) e dias.

**Saída**  
Valor total com duas casas decimais.

## Solução

```python
tipo = input().strip().lower()
dias = int(input())
if tipo == "standard": diaria = 150
elif tipo == "luxo": diaria = 300
else: diaria = 500
print(f"{dias * diaria:.2f}")
```
