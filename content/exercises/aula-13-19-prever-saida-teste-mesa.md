---
title: "Prever saída — teste de mesa com três iterações"
slug: "aula-13-19-prever-saida-teste-mesa"
difficulty: "easy"
concepts: ["teste de mesa", "acumulador", "+="]
discipline: "python"
learning_goal: "Fazer teste de mesa para prever soma após três leituras."
exercise_type: "predict_output"
stage: 6
context: "validação de dados"
expected_output: "Soma: 60"
---

## Enunciado

Faça um teste de mesa: quais são os valores de `soma` após cada iteração (entradas 10, 20, 30)? Qual a saída do programa?

```python
soma = 0
for i in range(3):
    x = int(input())  # 10, 20, 30
    soma += x
print(f'Soma: {soma}')
```

## Solução

Teste de mesa: 1ª iteração x=10, soma=10; 2ª x=20, soma=30; 3ª x=30, soma=60. Saída:

```
Soma: 60
```
