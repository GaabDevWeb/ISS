---
title: Programa — normalizar leitura numérica de CSV
slug: aula-04-novo-06-programa-normalizar-leitura-numérica-de-csv
difficulty: hard
concepts:
- conversão de tipos
- tipagem dinâmica
- tipagem forte
- int, float, bool, string
- operadores aritméticos
- precedência de operadores
discipline: python
learning_goal: 'Praticar: conversão de tipos, tipagem dinâmica, tipagem forte'
exercise_type: full_program
stage: 5
context: parsing de CSV
test_cases:
- input: 'cafe,12.5

    '
  output: produto=cafe preco=12.50
- input: 'cafe,xx

    '
  output: ERRO
---

## Enunciado

Leia uma linha no formato `produto,preco`. Imprima `produto=<nome> preco=<preco>` com 2 casas. Se o preço não for numérico, imprima `ERRO`.

## Solução

```python
linha = input().strip()
partes = linha.split(",")
produto = partes[0].strip()
preco_txt = partes[1].strip() if len(partes) > 1 else ""
try:
    preco = float(preco_txt)
    print(f"produto={produto} preco={preco:.2f}")
except ValueError:
    print("ERRO")
```
