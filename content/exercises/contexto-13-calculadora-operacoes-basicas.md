---
title: "Calculadora básica (soma, subtração, multiplicação, divisão)"
slug: "contexto-13-calculadora-operacoes-basicas"
difficulty: "medium"
concepts: ["if/elif/else", "input()", "evitar divisão por zero"]
discipline: "python"
learning_goal: "Ler dois números e operação e exibir resultado; impedir divisão por 0."
exercise_type: "full_program"
stage: 17
context: "validação de dados"
test_cases:
  - input: "10\n5\nsoma"
    output: "15.0"
  - input: "10\n0\ndivisao"
    output: "Erro: divisao por zero."
---

## Enunciado

Em um sistema de apoio ao aprendizado de matemática, é necessário uma calculadora simples. O programa em Python (Deepnote) recebe dois números reais e uma string com a operação: "soma", "subtracao", "multiplicacao" ou "divisao". Deve calcular e exibir o resultado como número real. Importante: em caso de divisão por zero, exiba "Erro: divisao por zero." em vez de calcular.

**Tarefa**  
Implemente a calculadora com as quatro operações e proteção contra divisão por zero.

**Entrada**  
Três linhas: primeiro número (real), segundo número (real), operação (exatamente uma das quatro palavras acima).

**Saída**  
Uma linha com o resultado numérico ou a mensagem de erro para divisão por zero.

## Solução

```python
a = float(input())
b = float(input())
op = input().strip()
if op == "soma":
    print(a + b)
elif op == "subtracao":
    print(a - b)
elif op == "multiplicacao":
    print(a * b)
elif op == "divisao":
    if b == 0:
        print("Erro: divisao por zero.")
    else:
        print(a / b)
```
