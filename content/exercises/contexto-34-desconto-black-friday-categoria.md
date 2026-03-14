---
title: "Desconto Black Friday por categoria de produto"
slug: "contexto-34-desconto-black-friday-categoria"
difficulty: "medium"
concepts: ["if/elif/else", "strings", "cálculo percentual"]
discipline: "python"
learning_goal: "Aplicar desconto por categoria e exibir valor final."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "eletronico\n1000.00"
    output: "800.00"
  - input: "vestuario\n200.00"
    output: "160.00"
---

## Enunciado

Na Black Friday: eletronico 20%, vestuario 20%, livros 15%, outros 10%. O programa recebe a categoria (uma palavra, minúscula) e o valor original (float) e exibe o valor com desconto aplicado, com 2 decimais.

**Tarefa**  
Calcule valor * (1 - taxa) conforme categoria.

**Entrada**  
Duas linhas: categoria e valor.

**Saída**  
Número com duas casas decimais.

## Solução

```python
cat = input().strip().lower()
valor = float(input())
if cat == "eletronico" or cat == "vestuario":
    taxa = 0.20
elif cat == "livros":
    taxa = 0.15
else:
    taxa = 0.10
print(f"{valor * (1 - taxa):.2f}")
```
